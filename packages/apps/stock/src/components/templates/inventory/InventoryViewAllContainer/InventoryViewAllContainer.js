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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ViewAllContainer} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {showLine} from '../../../../utils/line-navigation';
import Inventory from '../../../../types/inventory';
import {InventoryLineCard} from '../../../templates';
import {fetchInventoryLines} from '../../../../features/inventoryLineSlice';

const InventoryViewAllContainer = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {inventory} = useSelector(state => state.inventory);
  const {inventoryLineList} = useSelector(state => state.inventoryLine);

  useEffect(() => {
    if (inventory != null) {
      dispatch(fetchInventoryLines({inventoryId: inventory?.id, page: 0}));
    }
  }, [dispatch, inventory]);

  const handleNewLine = useCallback(() => {
    navigation.navigate('InventorySelectProductScreen', {
      inventoryLine: null,
      inventory: inventory,
    });
  }, [inventory, navigation]);

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

  const handleViewAll = () => {
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  };

  return (
    <ViewAllContainer
      isHeaderExist={inventory?.statusSelect !== Inventory.status.Completed}
      onNewIcon={handleNewLine}
      data={inventoryLineList}
      translator={I18n.t}
      renderFirstTwoItems={item => (
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
      onViewPress={handleViewAll}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default InventoryViewAllContainer;
