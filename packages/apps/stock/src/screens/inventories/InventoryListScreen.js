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

import React, {useCallback, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  AutoCompleteSearch,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {InventoryCard, StockLocationSearchBar} from '../../components';
import {searchInventories} from '../../features/inventorySlice';
import {displayInventorySeq} from '../../utils/displayers';
import Inventory from '../../types/inventory';

const stockLocationScanKey = 'stock-location_inventory-list';

const InventoryListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingList, moreLoading, isListEnd, inventoryList} = useSelector(
    state => state.inventory,
  );

  const [stockLocation, setStockLocation] = useState(null);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const filterOnStatus = useCallback(
    list => filterChip(list, selectedStatus, 'statusSelect'),
    [selectedStatus],
  );

  const filteredList = useMemo(
    () =>
      filterOnStatus(
        filterList(
          inventoryList,
          'stockLocation',
          'id',
          stockLocation?.id ?? '',
        ),
      ),
    [filterOnStatus, stockLocation, inventoryList],
  );

  const navigateToInventoryDetail = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate(
        item.statusSelect === Inventory.status.Planned
          ? 'InventoryPlannedDetailsScreen'
          : 'InventoryStartedDetailsScreen',
        {inventoryId: item.id},
      );
    }
  };

  const fetchInventoriesAPI = useCallback(
    page => {
      dispatch(searchInventories({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const handleRefChange = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      dispatch(
        searchInventories({
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <AutoCompleteSearch
            objectList={inventoryList}
            onChangeValue={item => navigateToInventoryDetail(item)}
            fetchData={handleRefChange}
            displayValue={displayInventorySeq}
            placeholder={I18n.t('Stock_Ref')}
            oneFilter={true}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            marginHorizontal={3}
            width={Dimensions.get('window').width * 0.35}
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                color: Inventory.getStatusColor(
                  Inventory.status.Planned,
                  Colors,
                ),
                title: I18n.t('Stock_Status_Planned'),
                key: Inventory.status.Planned,
              },
              {
                color: Inventory.getStatusColor(
                  Inventory.status.InProgress,
                  Colors,
                ),
                title: I18n.t('Stock_Status_InProgress'),
                key: Inventory.status.InProgress,
              },
              {
                color: Inventory.getStatusColor(
                  Inventory.status.Completed,
                  Colors,
                ),
                title: I18n.t('Stock_Status_Completed'),
                key: Inventory.status.Completed,
              },
              {
                color: Inventory.getStatusColor(
                  Inventory.status.Validated,
                  Colors,
                ),
                title: I18n.t('Stock_Status_Validated'),
                key: Inventory.status.Validated,
              },
            ]}
          />
        }>
        <StockLocationSearchBar
          scanKey={stockLocationScanKey}
          placeholderKey="Stock_StockLocation"
          defaultValue={stockLocation}
          onChange={setStockLocation}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingList}
        data={filteredList}
        renderItem={({item}) => (
          <InventoryCard
            reference={item.inventorySeq}
            status={item.statusSelect}
            date={Inventory.getDate(item)}
            stockLocation={item.stockLocation?.name}
            origin={item.origin}
            onPress={() => navigateToInventoryDetail(item)}
          />
        )}
        fetchData={fetchInventoriesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default InventoryListScreen;
