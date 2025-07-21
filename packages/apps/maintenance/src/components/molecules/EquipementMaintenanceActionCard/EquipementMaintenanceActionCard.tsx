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
