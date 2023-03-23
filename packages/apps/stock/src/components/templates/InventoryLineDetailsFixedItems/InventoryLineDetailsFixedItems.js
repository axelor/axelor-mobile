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

import React, {useCallback} from 'react';
import {Button} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import Inventory from '../../../types/inventory';
import {
  createNewInventoryLine,
  updateInventoryLine,
} from '../../../features/inventoryLineSlice';

const InventoryLineDetailsFixedItems = ({
  inventoryLine,
  inventory,
  trackingNumber,
  rack,
  navigation,
  realQty,
  description,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {productFromId} = useSelector(state => state.product);

  const handleNewLine = useCallback(() => {
    dispatch(
      createNewInventoryLine({
        inventoryId: inventory.id,
        inventoryVersion: inventory.version,
        productId: productFromId?.id,
        trackingNumberId: trackingNumber?.id,
        rack: rack == null || rack === '' ? null : rack,
        realQty: realQty,
      }),
    );
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  }, [
    dispatch,
    inventory,
    navigation,
    productFromId,
    rack,
    realQty,
    trackingNumber,
  ]);

  const handleUpdateLine = useCallback(() => {
    dispatch(
      updateInventoryLine({
        inventoryLineId: inventoryLine.id,
        version: inventoryLine.version,
        realQty: realQty,
        description: description,
      }),
    );
    navigation.navigate('InventoryLineListScreen', {
      inventory: inventory,
    });
  }, [description, dispatch, inventory, inventoryLine, navigation, realQty]);

  if (inventoryLine == null) {
    return <Button title={I18n.t('Base_Add')} onPress={handleNewLine} />;
  } else if (inventory?.statusSelect !== Inventory.status.Validated) {
    return (
      <Button
        title={
          inventory.statusSelect <= Inventory.status.InProgress
            ? I18n.t('Base_Save')
            : I18n.t('Base_Check')
        }
        onPress={handleUpdateLine}
      />
    );
  } else {
    return null;
  }
};

export default InventoryLineDetailsFixedItems;
