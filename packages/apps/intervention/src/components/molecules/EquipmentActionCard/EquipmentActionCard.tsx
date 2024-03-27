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
import {InfoButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {EquipmentCard} from '../../atoms';

interface EquipmentActionCardProps {
  idEquipment: number;
  sequence: string;
  name: string;
  code: string;
  equipmentFamily: string;
  inService: boolean;
  isUnlinkAction?: boolean;
}

const EquipmentActionCard = ({
  idEquipment,
  sequence,
  name,
  code,
  equipmentFamily,
  inService,
  isUnlinkAction = false,
}: EquipmentActionCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();

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
        {isUnlinkAction && (
          <InfoButton
            style={styles.flexOne}
            iconName="x-lg"
            iconColor={Colors.secondaryColor_dark.background}
            onPress={() => {}}
            indication={I18n.t('Intervention_Unlink')}
          />
        )}
        <InfoButton
          style={styles.flexOne}
          iconName="front"
          iconColor={Colors.secondaryColor_dark.background}
          onPress={() => {}}
          indication={I18n.t('Intervention_Duplicate')}
        />
      </View>
      <View style={styles.flexOne}>
        <InfoButton
          style={styles.flexOne}
          iconName="pencil-fill"
          iconColor={Colors.secondaryColor_dark.background}
          onPress={() => {
            navigation.navigate('EquipmentFormView', {
              idEquipment,
            });
          }}
          indication={I18n.t('Intervention_Edit')}
        />
        <InfoButton
          style={styles.flexOne}
          iconName="archive-fill"
          iconColor={Colors.errorColor.background}
          onPress={() => {}}
          indication={I18n.t('Intervention_Archive')}
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
