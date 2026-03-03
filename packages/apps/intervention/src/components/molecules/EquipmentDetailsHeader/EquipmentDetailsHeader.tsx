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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Badge, LabelText, Text} from '@axelor/aos-mobile-ui';
import {useSelector, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';

const EquipmentDetailsHeader = () => {
  const {Equipment} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {equipment} = useSelector((state: any) => state.intervention_equipment);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerChildrenContainer}>
        <View>
          <Text writingType="title">{equipment.sequence}</Text>
          <Text>{equipment.code}</Text>
          <Text>{equipment.name}</Text>
          <LabelText
            iconName="palette2"
            title={equipment.equipmentFamily?.name}
          />
        </View>
        <Badge
          color={getItemColor(Equipment?.serviceSelect, equipment.inService)}
          title={getItemTitle(Equipment?.serviceSelect, equipment.inService)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 24,
  },
  headerChildrenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EquipmentDetailsHeader;
