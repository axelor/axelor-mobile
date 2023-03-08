import React, {useCallback} from 'react';
import {IconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import ManufacturingOrder from '../../../types/manufacturing-order';
import {updateStatusOfManufOrder} from '../../../features/manufacturingOrderSlice';

const ManufacturingOrderIconButtonList = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {manufOrder} = useSelector(state => state.manufacturingOrder);

  const handleUpdateStatus = useCallback(
    targetStatus => {
      dispatch(
        updateStatusOfManufOrder({
          manufOrderId: manufOrder.id,
          manufOrderVersion: manufOrder.version,
          targetStatus,
        }),
      );
    },
    [dispatch, manufOrder],
  );

  return (
    <>
      {manufOrder.statusSelect === ManufacturingOrder.status.Planned && (
        <IconButton
          title={I18n.t('Base_Start')}
          onPress={() =>
            handleUpdateStatus(ManufacturingOrder.status.InProgress)
          }
          iconName="play"
        />
      )}
      {manufOrder.statusSelect === ManufacturingOrder.status.InProgress && (
        <IconButton
          title={I18n.t('Base_Pause')}
          onPress={() => handleUpdateStatus(ManufacturingOrder.status.StandBy)}
          iconName="pause"
          color={Colors.secondaryColor}
        />
      )}
      {manufOrder.statusSelect === ManufacturingOrder.status.StandBy && (
        <IconButton
          title={I18n.t('Base_Continue')}
          onPress={() =>
            handleUpdateStatus(ManufacturingOrder.status.InProgress)
          }
          iconName="step-forward"
        />
      )}
      {manufOrder.statusSelect === ManufacturingOrder.status.InProgress && (
        <IconButton
          title={I18n.t('Base_Finish')}
          onPress={() => handleUpdateStatus(ManufacturingOrder.status.Finished)}
          iconName="power-off"
        />
      )}
    </>
  );
};

export default ManufacturingOrderIconButtonList;
