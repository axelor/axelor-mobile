/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {InventoryHeader, InventoryLineCard} from '../../components';
import {fetchInventoryLines} from '../../features/inventoryLineSlice';
import Inventory from '../../types/inventory';
import {showLine} from '../../utils/line-navigation';

const InventoryLineListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const inventory = route.params.inventory;
  const {loadingInventoryLines, moreLoading, isListEnd, inventoryLineList} =
    useSelector(state => state.inventoryLine);
  const [filteredList, setFilteredList] = useState(inventoryLineList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const dispatch = useDispatch();

  const handleShowLine = item => {
    showLine({
      item: {name: 'inventory', data: inventory},
      itemLine: {name: 'inventoryLine', data: item},
      lineDetailsScreen: 'InventoryLineDetailsScreen',
      selectTrackingScreen: 'InventorySelectTrackingScreen',
      selectProductScreen: 'InventorySelectProductScreen',
      detailStatus: Inventory.status.Validated,
      navigation,
    });
  };

  const fetchInventoryLinesAPI = useCallback(
    page => {
      dispatch(
        fetchInventoryLines({
          inventoryId: inventory?.id,
          page: page,
        }),
      );
    },
    [inventory, dispatch],
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

  useEffect(() => {
    setFilteredList(filterOnStatus(inventoryLineList));
  }, [inventoryLineList, filterOnStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
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
        }
      />
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
        fetchData={fetchInventoryLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
  },
  moveCard: {
    marginVertical: 10,
  },
  detailsCard: {
    marginHorizontal: 16,
    marginBottom: 5,
  },
});

export default InventoryLineListScreen;
