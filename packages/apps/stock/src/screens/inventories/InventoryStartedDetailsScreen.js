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
import {View, StyleSheet} from 'react-native';
import {
  Button,
  HeaderContainer,
  Screen,
  ScrollView,
  Text,
  ViewAllContainer,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  InventoryHeader,
  InventoryLineCard,
  InventoryStartedHeader,
  LocationsMoveCard,
} from '../../components';
import {fetchInventoryLines} from '../../features/inventoryLineSlice';
import {
  fetchInventoryById,
  updateInventory,
} from '../../features/inventorySlice';
import Inventory from '../../types/inventory';
import {showLine} from '../../utils/line-navigation';

const InventoryStartedDetailsScreen = ({route, navigation}) => {
  const inventoryId = route.params.inventoryId;
  const {loading, inventory} = useSelector(state => state.inventory);
  const {loadingInventoryLines, inventoryLineList} = useSelector(
    state => state.inventoryLine,
  );
  const {mobileSettings} = useSelector(state => state.config);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: inventoryId}));
    dispatch(fetchInventoryLines({inventoryId: inventoryId, page: 0}));
  }, [dispatch, inventoryId]);

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

  const handleCompleteInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory.id,
        version: inventory.version,
        status: Inventory.status.Completed,
        userId: null,
      }),
    );
    navigation.popToTop();
  }, [dispatch, inventory, navigation]);

  const handleValidateInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory.id,
        version: inventory.version,
        status: Inventory.status.Validated,
        userId: null,
      }),
    );
    navigation.popToTop();
  }, [dispatch, inventory, navigation]);

  const handleNewLine = useCallback(() => {
    navigation.navigate('InventorySelectProductScreen', {
      inventoryLine: null,
      inventory: inventory,
    });
  }, [inventory, navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.Inventory"
          modelId={inventory?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, inventory]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        inventory?.statusSelect === Inventory.status.InProgress ? (
          <Button
            title={I18n.t('Base_Complete')}
            onPress={handleCompleteInventory}
          />
        ) : inventory?.statusSelect === Inventory.status.Completed ? (
          <Button
            title={I18n.t('Base_Validate')}
            onPress={handleValidateInventory}
          />
        ) : null
      }
      loading={loadingInventoryLines || loading || inventory == null}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<InventoryStartedHeader inventory={inventory} />}
      />
      <ScrollView>
        {inventory?.fromRack && (
          <LocationsMoveCard
            style={styles.moveCard}
            isLockerCard={true}
            fromStockLocation={inventory?.fromRack}
            toStockLocation={inventory?.toRack}
          />
        )}
        <ViewAllContainer
          isHeaderExist={inventory?.statusSelect !== Inventory.status.Completed}
          onNewIcon={handleNewLine}
          data={inventoryLineList}
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
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  moveCard: {
    marginVertical: 10,
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
});

export default InventoryStartedDetailsScreen;
