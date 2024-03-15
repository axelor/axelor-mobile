/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {EquipmentCard} from '../../molecules';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';

interface EquipmentActionCardProps {
  sequence: string;
  name: string;
  code: string;
  equipmentFamily: string;
  inService: boolean;
}

const EquipmentActionCard = ({
  sequence,
  name,
  code,
  equipmentFamily,
  inService,
}: EquipmentActionCardProps) => {
  const Colors = useThemeColor();

  return (
    <View style={styles.globalContainer}>
      <EquipmentCard
        style={styles.objectCardContainer}
        sequence={sequence}
        name={name}
        code={code}
        equipmentFamily={equipmentFamily}
        inService={inService}
      />
      <View style={styles.flexOne}>
        <CardIconButton
          style={styles.flexOne}
          iconName="front"
          iconColor={Colors.successColor.foreground}
          onPress={() => {}}
        />
      </View>
      <View style={styles.flexOne}>
        <CardIconButton
          style={styles.flexOne}
          iconName="pencil-fill"
          iconColor={Colors.primaryColor.foreground}
          onPress={() => {}}
        />
        <CardIconButton
          style={styles.flexOne}
          iconName="archive-fill"
          iconColor={Colors.errorColor.background}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 2,
    flex: 1,
  },
  objectCardContainer: {
    flex: 7,
    marginVertical: 2,
  },
  flexOne: {
    flex: 1,
  },
});

export default EquipmentActionCard;
