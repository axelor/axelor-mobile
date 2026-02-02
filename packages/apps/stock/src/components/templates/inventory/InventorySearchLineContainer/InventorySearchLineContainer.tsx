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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {InventoryPickingWidget, SearchLineContainer} from '../../../organisms';
import {InventoryLineActionCard} from '../../../templates';
import {fetchInventoryLines} from '../../../../features/inventoryLineSlice';
import {useLineHandler} from '../../../../hooks';
import {LineVerification} from '../../../../types';

const scanKey = 'trackingNumber-or-product_inventory-details';
const massScanKey = 'inventory-line_mass-scan';

const InventorySearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {Inventory} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.Inventory',
  });
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.InventoryLine',
  });
  const {showLine} = useLineHandler();

  const {inventory} = useSelector(state => state.inventory);
  const {
    loadingInventoryLines,
    moreLoading,
    isListEnd,
    inventoryLineList,
    totalNumberLines,
  } = useSelector(state => state.inventoryLine);

  const handleNewLine = useCallback(() => {
    navigation.navigate('InventorySelectProductScreen', {inventory});
  }, [inventory, navigation]);

  const handleViewAll = useCallback(() => {
    navigation.navigate('InventoryLineListScreen', {inventory});
  }, [inventory, navigation]);

  const handleShowLine = useCallback(
    (item: any, skipVerification = undefined) => {
      showLine({
        move: inventory,
        line: item,
        skipVerification,
        type: LineVerification.type.inventory,
      });
    },
    [inventory, showLine],
  );

  const handleLineSearch = useCallback(
    (item: any) => handleShowLine(item, true),
    [handleShowLine],
  );

  const sliceFunctionData = useMemo(
    () => ({inventoryId: inventory?.id}),
    [inventory?.id],
  );

  const handleRefresh = useCallback(
    () =>
      dispatch((fetchInventoryLines as any)({...sliceFunctionData, page: 0})),
    [dispatch, sliceFunctionData],
  );

  const filterLine = useCallback((item: any) => item.realQty == null, []);

  return (
    <View style={styles.container}>
      <InventoryPickingWidget
        scanKey={massScanKey}
        inventoryId={inventory.id}
        inventoryStatus={inventory.statusSelect}
        onRefresh={handleRefresh}
        handleShowLine={handleLineSearch}
      />
      <SearchLineContainer
        title={I18n.t('Stock_InventoryLines')}
        numberOfItems={totalNumberLines}
        objectList={inventoryLineList}
        loading={loadingInventoryLines}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchInventoryLines}
        sliceFunctionData={sliceFunctionData}
        handleSelect={handleLineSearch}
        scanKey={scanKey}
        onViewPress={handleViewAll}
        filterLine={filterLine}
        showAction={
          !readonly &&
          canCreate &&
          inventory?.statusSelect < Inventory?.statusSelect.Completed
        }
        onAction={handleNewLine}
        renderItem={item => (
          <InventoryLineActionCard
            style={styles.item}
            inventoryLine={item}
            onPress={() => handleShowLine(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  item: {
    width: '100%',
  },
});

export default InventorySearchLineContainer;
