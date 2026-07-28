/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {searchInventories} from '../../features/inventorySlice';
import {displayInventorySeq} from '../../utils';
import {InventoryCard, StockLocationSearchBar} from '../../components';

const stockLocationScanKey = 'stock-location_inventory-list';

const InventoryListScreen = ({navigation}: any) => {
  const I18n = useTranslator();
  const {Inventory} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loadingList, moreLoading, isListEnd, inventoryList} = useSelector(
    state => state.inventory,
  );
  const {user} = useSelector(state => state.user);

  const [stockLocation, setStockLocation] = useState<any>();
  const [navigate, setNavigate] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);

  const navigateToInventoryDetail = (_item: any) => {
    if (_item != null) {
      setNavigate(current => !current);
      navigation.navigate(
        _item.statusSelect === Inventory?.statusSelect.Planned
          ? 'InventoryPlannedDetailsScreen'
          : 'InventoryStartedDetailsScreen',
        {inventoryId: _item.id},
      );
    }
  };

  const statusList = useMemo(
    () => getSelectionItems(Inventory?.statusSelect, selectedStatus),
    [Inventory?.statusSelect, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      stockLocationId: stockLocation?.id,
      statusList: selectedStatus,
      companyId: user.activeCompany?.id,
    }),
    [selectedStatus, stockLocation?.id, user.activeCompany?.id],
  );

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        list={inventoryList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchInventories}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={navigateToInventoryDetail}
        displaySearchValue={displayInventorySeq}
        searchPlaceholder={I18n.t('Stock_Ref')}
        searchNavigate={navigate}
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
        headerChildren={
          <StockLocationSearchBar
            scanKey={stockLocationScanKey}
            placeholderKey="Stock_StockLocation"
            defaultValue={stockLocation}
            onChange={setStockLocation}
          />
        }
        renderListItem={({item}) => (
          <InventoryCard
            {...item}
            onPress={() => navigateToInventoryDetail(item)}
          />
        )}
      />
    </Screen>
  );
};

export default InventoryListScreen;
