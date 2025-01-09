/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useState, useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  checkNullString,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {InventoryHeader, InventoryLineCard} from '../../components';
import {fetchInventoryLines} from '../../features/inventoryLineSlice';
import Inventory from '../../types/inventory';
import {showLine} from '../../utils/line-navigation';
import {displayLine} from '../../utils/displayers';

const scanKey = 'trackingNumber-or-product_inventory-line-list';

const InventoryLineListScreen = ({route, navigation}) => {
  const inventory = route.params.inventory;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {loadingInventoryLines, moreLoading, isListEnd, inventoryLineList} =
    useSelector(state => state.inventoryLine);

  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleShowLine = (
    item,
    skipVerification = !mobileSettings?.isVerifyInventoryLineEnabled,
  ) => {
    showLine({
      item: {name: 'inventory', data: inventory},
      itemLine: {name: 'inventoryLine', data: item},
      lineDetailsScreen: 'InventoryLineDetailsScreen',
      selectTrackingScreen: 'InventorySelectTrackingScreen',
      selectProductScreen: 'InventorySelectProductScreen',
      detailStatus: Inventory.status.Validated,
      skipVerification,
      navigation,
    });
  };

  const handleLineSearch = item => {
    handleShowLine(item, true);
  };

  const fetchInventoryLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (!checkNullString(searchValue)) {
        setFilter(searchValue);
        dispatch(
          fetchInventoryLines({
            inventoryId: inventory?.id,
            searchValue: searchValue,
            page: 0,
          }),
        );
      } else {
        dispatch(
          fetchInventoryLines({
            inventoryId: inventory?.id,
            page: page,
          }),
        );
      }
    },
    [dispatch, inventory?.id],
  );

  const filterLinesAPI = useCallback(
    ({searchValue}) => fetchInventoryLinesAPI({searchValue}),
    [fetchInventoryLinesAPI],
  );

  const scrollLinesAPI = useCallback(
    page => fetchInventoryLinesAPI({page}),
    [fetchInventoryLinesAPI],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === 'doneStatus') {
            return item.realQty === item.currentQty;
          } else if (selectedStatus[0].key === 'diffStatus') {
            return item.realQty != null && item.realQty !== item.currentQty;
          } else if (selectedStatus[0].key === 'unDoneStatus') {
            return item.realQty == null;
          } else {
            return item;
          }
        });
      } else {
        return list;
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnStatus(inventoryLineList),
    [filterOnStatus, inventoryLineList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <InventoryHeader
            reference={inventory.inventorySeq}
            status={inventory.statusSelect}
            date={
              inventory.statusSelect === Inventory.status.Planned
                ? inventory.plannedStartDateT
                : inventory.plannedEndDateT
            }
            stockLocation={inventory.stockLocation?.name}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            marginHorizontal={3}
            width={Dimensions.get('window').width * 0.3}
            selectionItems={[
              {
                title: I18n.t('Stock_Complete'),
                color: Colors.primaryColor,
                key: 'doneStatus',
              },
              {
                title: I18n.t('Stock_Difference'),
                color: Colors.cautionColor,
                key: 'diffStatus',
              },
              {
                title: I18n.t('Stock_NotDone'),
                color: Colors.secondaryColor,
                key: 'unDoneStatus',
              },
            ]}
          />
        }>
        <ScannerAutocompleteSearch
          objectList={filteredList}
          onChangeValue={handleLineSearch}
          fetchData={filterLinesAPI}
          displayValue={displayLine}
          scanKeySearch={scanKey}
          placeholder={I18n.t('Stock_SearchLine')}
          isFocus={true}
          oneFilter={true}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingInventoryLines}
        data={filteredList}
        renderItem={({item}) => (
          <InventoryLineCard
            style={styles.item}
            productName={item.product?.fullName}
            currentQty={item.currentQty}
            realQty={item.realQty}
            unit={item.unit?.name}
            locker={item.rack}
            trackingNumber={item.trackingNumber}
            onPress={() => handleShowLine(item)}
          />
        )}
        fetchData={scrollLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={filter != null && filter !== ''}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
  },
});

export default InventoryLineListScreen;
