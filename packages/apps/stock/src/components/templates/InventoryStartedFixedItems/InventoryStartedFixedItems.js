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
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import Inventory from '../../../types/inventory';
import {updateInventory} from '../../../features/inventorySlice';

const InventoryStartedFixedItems = ({navigation}) => {
  const {inventory} = useSelector(state => state.inventory);
  const I18n = useTranslator();
  const dispatch = useDispatch();

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

  if (inventory?.statusSelect === Inventory.status.InProgress) {
    return (
      <Button
        title={I18n.t('Base_Complete')}
        onPress={handleCompleteInventory}
      />
    );
  } else if (inventory?.statusSelect === Inventory.status.Completed) {
    return (
      <Button
        title={I18n.t('Base_Validate')}
        onPress={handleValidateInventory}
      />
    );
  } else {
    return null;
  }
};

export default InventoryStartedFixedItems;
