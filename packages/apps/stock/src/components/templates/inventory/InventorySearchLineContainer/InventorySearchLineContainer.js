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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {SearchLineContainer} from '../../../organisms';
import {InventoryLineCard} from '../../../templates';
import {showLine} from '../../../../utils/line-navigation';
import {Inventory} from '../../../../types';
import {fetchInventoryLines} from '../../../../features/inventoryLineSlice';

const scanKey = 'trackingNumber-or-product_inventory-details';

const InventorySearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {inventory} = useSelector(state => state.inventory);
  const {inventoryLineList, totalNumberLines} = useSelector(
    state => state.inventoryLine,
  );

  const handleNewLine = useCallback(() => {
    navigation.navigate('InventorySelectProductScreen', {
      inventory: inventory,
    });
  }, [inventory, navigation]);

  const handleViewAll = () => {
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  };

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
      dispatch(
        fetchInventoryLines({
          inventoryId: inventory?.id,
          searchValue,
          page: page,
        }),
      );
    },
    [dispatch, inventory],
  );

  const filterLine = useCallback(item => {
    return item.realQty == null;
  }, []);

  return (
    <SearchLineContainer
      title={I18n.t('Stock_InventoryLines')}
      numberOfItems={totalNumberLines}
      objectList={inventoryLineList}
      handleSelect={handleLineSearch}
      handleSearch={fetchInventoryLinesAPI}
      scanKey={scanKey}
      onViewPress={handleViewAll}
      filterLine={filterLine}
      showAction={inventory?.statusSelect < Inventory.status.Completed}
      onAction={handleNewLine}
      renderItem={item => (
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
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default InventorySearchLineContainer;
