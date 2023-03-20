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
import {
  Button,
  EditableInput,
  HeaderContainer,
  Screen,
  ScrollView,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@axelor/aos-mobile-core';
import {
  InventoryPlannedDetailsHeader,
  LocationsMoveCard,
} from '../../components';
import {
  fetchInventoryById,
  modifyDescription,
  updateInventory,
} from '../../features/inventorySlice';
import Inventory from '../../types/inventory';

const InventoryPlannedDetailsScreen = ({route, navigation}) => {
  const {loading, inventory} = useSelector(state => state.inventory);
  const {mobileSettings} = useSelector(state => state.config);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInventoryById({inventoryId: route.params.inventoryId}));
  }, [dispatch, route.params.inventoryId]);

  const handleDescriptionChange = input => {
    dispatch(
      modifyDescription({
        inventoryId: inventory?.id,
        description: input.toString(),
        version: inventory?.version,
      }),
    );
  };

  const handleStartInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory?.id,
        version: inventory?.version,
        status: Inventory.status.InProgress,
        userId: null,
      }),
    );
    navigation.navigate('InventoryStartedDetailsScreen', {
      inventoryId: inventory?.id,
    });
  }, [dispatch, inventory, navigation]);

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
        <Button title={I18n.t('Base_Start')} onPress={handleStartInventory} />
      }
      loading={loading || inventory == null}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<InventoryPlannedDetailsHeader />}
      />
      <ScrollView>
        {inventory?.fromRack && (
          <LocationsMoveCard
            fromStockLocation={inventory?.fromRack}
            toStockLocation={inventory?.toRack}
            isLockerCard={true}
          />
        )}
        <Text style={styles.title}>{I18n.t('Base_Description')}</Text>
        <EditableInput
          defaultValue={inventory?.description}
          placeholder={I18n.t('Base_Description')}
          onValidate={input => handleDescriptionChange(input)}
          multiline={true}
          numberOfLines={5}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});

export default InventoryPlannedDetailsScreen;
