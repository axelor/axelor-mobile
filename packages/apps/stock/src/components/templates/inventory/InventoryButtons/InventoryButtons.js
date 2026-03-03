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
import {
  useSelector,
  useDispatch,
  useTranslator,
  useNavigation,
  usePermitted,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {updateInventory} from '../../../../features/inventorySlice';

const InventoryButtons = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {Inventory} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.Inventory',
  });

  const {inventory} = useSelector(state => state.inventory);
  const {mobileSettings} = useSelector(state => state.appConfig);

  const handleStartInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory?.id,
        version: inventory?.version,
        status: Inventory?.statusSelect.InProgress,
        userId: null,
      }),
    );

    navigation.replace('InventoryStartedDetailsScreen', {
      inventoryId: inventory?.id,
    });
  }, [Inventory?.statusSelect.InProgress, dispatch, inventory, navigation]);

  const handleCompleteInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory.id,
        version: inventory.version,
        status: Inventory?.statusSelect.Completed,
        userId: null,
      }),
    );
    navigation.popToTop();
  }, [Inventory?.statusSelect.Completed, dispatch, inventory, navigation]);

  const handleValidateInventory = useCallback(() => {
    dispatch(
      updateInventory({
        inventoryId: inventory.id,
        version: inventory.version,
        status: Inventory?.statusSelect.Validated,
        userId: null,
      }),
    );
    navigation.popToTop();
  }, [Inventory?.statusSelect.Validated, dispatch, inventory, navigation]);

  if (readonly) {
    return null;
  }

  if (inventory?.statusSelect === Inventory?.statusSelect.Planned) {
    return (
      <Button
        title={I18n.t('Base_Start')}
        iconName="play-fill"
        onPress={handleStartInventory}
      />
    );
  }

  if (inventory?.statusSelect === Inventory?.statusSelect.InProgress) {
    return (
      <Button
        title={I18n.t('Base_Complete')}
        iconName="check-lg"
        onPress={handleCompleteInventory}
      />
    );
  }

  if (
    inventory?.statusSelect === Inventory?.statusSelect.Completed &&
    mobileSettings?.isInventoryValidationEnabled !== false
  ) {
    return (
      <Button
        title={I18n.t('Base_Validate')}
        iconName="check-lg"
        onPress={handleValidateInventory}
      />
    );
  }

  return null;
};

export default InventoryButtons;
