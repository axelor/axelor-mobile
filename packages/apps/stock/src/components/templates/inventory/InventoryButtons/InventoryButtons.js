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
import {
  useSelector,
  useDispatch,
  useTranslator,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import Inventory from '../../../../types/inventory';
import {updateInventory} from '../../../../features/inventorySlice';

const InventoryButtons = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {inventory} = useSelector(state => state.inventory);
  const {mobileSettings} = useSelector(state => state.config);

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

  if (inventory?.statusSelect === Inventory.status.Planned) {
    return (
      <Button
        title={I18n.t('Base_Start')}
        iconName="play"
        onPress={handleStartInventory}
      />
    );
  }

  if (inventory?.statusSelect === Inventory.status.InProgress) {
    return (
      <Button
        title={I18n.t('Base_Complete')}
        iconName="check"
        onPress={handleCompleteInventory}
      />
    );
  }

  if (
    inventory?.statusSelect === Inventory.status.Completed &&
    mobileSettings?.isInventoryValidationEnabled !== false
  ) {
    return (
      <Button
        title={I18n.t('Base_Validate')}
        iconName="check"
        onPress={handleValidateInventory}
      />
    );
  }

  return null;
};

export default InventoryButtons;
