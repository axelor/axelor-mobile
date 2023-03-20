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

  return (
    <>
      {inventory?.statusSelect === Inventory.status.InProgress ? (
        <Button
          title={I18n.t('Base_Complete')}
          onPress={handleCompleteInventory}
        />
      ) : inventory?.statusSelect === Inventory.status.Completed ? (
        <Button
          title={I18n.t('Base_Validate')}
          onPress={handleValidateInventory}
        />
      ) : null}
    </>
  );
};

export default InventoryStartedFixedItems;
