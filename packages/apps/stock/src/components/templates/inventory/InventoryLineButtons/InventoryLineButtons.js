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
import {Button} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  useDispatch,
  useNavigation,
  usePermitted,
  useTypes,
  useStackChecker,
} from '@axelor/aos-mobile-core';
import {
  createNewInventoryLine,
  updateInventoryLine,
} from '../../../../features/inventoryLineSlice';

const InventoryLineButtons = ({
  inventoryLine,
  inventory,
  stockLocation,
  trackingNumber,
  rack,
  realQty,
  description,
  visible = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isScreenMounted = useStackChecker();
  const {Inventory} = useTypes();
  const {canCreate, readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.InventoryLine',
  });

  const {productFromId} = useSelector(state => state.product);

  const navigateBack = useCallback(() => {
    if (isScreenMounted('InventoryLineListScreen')) {
      navigation.popTo('InventoryLineListScreen', {inventory});
    } else {
      navigation.popTo('InventoryStartedDetailsScreen', {
        inventoryId: inventory?.id,
      });
    }
  }, [inventory, isScreenMounted, navigation]);

  const handleNewLine = useCallback(() => {
    dispatch(
      createNewInventoryLine({
        inventoryId: inventory.id,
        inventoryVersion: inventory.version,
        productId: productFromId?.id,
        stockLocationId: stockLocation?.id,
        trackingNumberId: trackingNumber?.id,
        rack: rack == null || rack === '' ? null : rack,
        realQty: realQty,
      }),
    );

    navigateBack();
  }, [
    dispatch,
    inventory.id,
    inventory.version,
    navigateBack,
    productFromId?.id,
    rack,
    realQty,
    stockLocation?.id,
    trackingNumber?.id,
  ]);

  const handleUpdateLine = useCallback(() => {
    dispatch(
      updateInventoryLine({
        inventoryLineId: inventoryLine?.id,
        version: inventoryLine?.version,
        stockLocationId: stockLocation?.id,
        realQty: realQty,
        description: description,
        inventoryId: inventory?.id,
      }),
    );

    navigateBack();
  }, [
    description,
    dispatch,
    inventory?.id,
    inventoryLine,
    navigateBack,
    realQty,
    stockLocation?.id,
  ]);

  if (!visible) {
    return null;
  }

  if (inventoryLine?.id == null) {
    if (canCreate) {
      return <Button title={I18n.t('Base_Add')} onPress={handleNewLine} />;
    }

    return null;
  }

  if (
    !readonly &&
    inventory?.statusSelect !== Inventory?.statusSelect.Validated
  ) {
    return (
      <Button
        title={
          inventory.statusSelect <= Inventory?.statusSelect.InProgress
            ? I18n.t('Base_Save')
            : I18n.t('Base_Check')
        }
        onPress={handleUpdateLine}
      />
    );
  }

  return null;
};

export default InventoryLineButtons;
