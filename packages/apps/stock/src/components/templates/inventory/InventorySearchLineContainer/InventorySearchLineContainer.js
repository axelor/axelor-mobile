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

import React, {useCallback} from 'react';
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

  const handleShowLine = useCallback(
    (item, skipVerification = undefined) => {
      showLine({
        move: inventory,
        line: item,
        skipVerification,
        type: LineVerification.type.inventory,
      });
    },
    [inventory, showLine],
  );

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

  const handleRefresh = useCallback(
    () => fetchInventoryLinesAPI({page: 0}),
    [fetchInventoryLinesAPI],
  );

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
        handleSelect={handleLineSearch}
        handleSearch={fetchInventoryLinesAPI}
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
