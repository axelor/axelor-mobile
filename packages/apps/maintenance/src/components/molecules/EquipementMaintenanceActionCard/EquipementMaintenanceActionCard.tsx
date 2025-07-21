import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {EquipementMaintenanceCard} from '../../atoms';

interface EquipementMaintenanceActionCardProps {
  style?: any;
  item: any;
  onPress: () => void;
  readonly?: boolean;
}

const EquipementMaintenanceActionCard = ({
  style,
  item,
  onPress,
  readonly = false,
}: EquipementMaintenanceActionCardProps) => {
  const I18n = useTranslator();
  return (
    <ActionCard
      style={[styles.card, style]}
      actionList={[{iconName: 'x-lg', onPress, hidden: readonly}]}
      translator={I18n.t}>
      <EquipementMaintenanceCard {...item} />
    </ActionCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default EquipementMaintenanceActionCard;
