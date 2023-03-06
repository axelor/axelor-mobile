import React from 'react';
import {IconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import ManufacturingOrder from '../../../types/manufacturing-order';

interface ManufacturingOrderIconButtonListProps {
  statusSelect: any;
  onPress: () => void;
}

const ManufacturingOrderIconButtonList = ({
  statusSelect,
  onPress,
}: ManufacturingOrderIconButtonListProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <>
      {statusSelect === ManufacturingOrder.status.Planned && (
        <IconButton
          title={I18n.t('Base_Start')}
          onPress={() => onPress}
          iconName="play"
        />
      )}
      {statusSelect === ManufacturingOrder.status.InProgress && (
        <IconButton
          title={I18n.t('Base_Pause')}
          onPress={() => onPress}
          iconName="pause"
          color={Colors.secondaryColor}
        />
      )}
      {statusSelect === ManufacturingOrder.status.StandBy && (
        <IconButton
          title={I18n.t('Base_Continue')}
          onPress={() => onPress}
          iconName="step-forward"
        />
      )}
      {statusSelect === ManufacturingOrder.status.InProgress && (
        <IconButton
          title={I18n.t('Base_Finish')}
          onPress={() => onPress}
          iconName="power-off"
        />
      )}
    </>
  );
};

export default ManufacturingOrderIconButtonList;
