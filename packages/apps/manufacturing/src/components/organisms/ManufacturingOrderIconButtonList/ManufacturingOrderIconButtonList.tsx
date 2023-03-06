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

  if (statusSelect === ManufacturingOrder.status.Planned) {
    return (
      <IconButton
        title={I18n.t('Base_Start')}
        onPress={() => onPress}
        iconName="play"
      />
    );
  } else if (statusSelect === ManufacturingOrder.status.InProgress) {
    return (
      <IconButton
        title={I18n.t('Base_Pause')}
        onPress={() => onPress}
        iconName="pause"
        color={Colors.secondaryColor}
      />
    );
  } else if (statusSelect === ManufacturingOrder.status.StandBy) {
    <IconButton
      title={I18n.t('Base_Continue')}
      onPress={() => onPress}
      iconName="step-forward"
    />;
  } else if (statusSelect === ManufacturingOrder.status.InProgress) {
    <IconButton
      title={I18n.t('Base_Finish')}
      onPress={() => onPress}
      iconName="power-off"
    />;
  } else {
    return null;
  }
};

export default ManufacturingOrderIconButtonList;
