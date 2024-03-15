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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {Equipment} from '../../../types';

interface EquipmentCardProps {
  style?: any;
  sequence: string;
  name: string;
  code: string;
  equipmentFamily: string;
  inService: boolean;
}

const EquipmentCard = ({
  style,
  sequence,
  name,
  code,
  equipmentFamily,
  inService = false,
}: EquipmentCardProps) => {
  const Colors = useThemeColor();

  const borderStyle = useMemo(() => {
    return getStyles(Equipment.getBorderColor(inService, Colors)?.background)
      ?.border;
  }, [Colors, inService]);

  return (
    <View style={style}>
      <ObjectCard
        showArrow={false}
        style={[styles.objectCard, borderStyle]}
        upperTexts={{
          items: [
            {displayText: sequence, isTitle: true, numberOfLines: 1},
            {
              indicatorText: code,
              hideIfNull: true,
            },
            {
              displayText: name,
              hideIfNull: true,
            },
            {
              indicatorText: equipmentFamily,
              hideIfNull: true,
              iconName: 'palette2',
            },
          ],
        }}
      />
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  objectCard: {
    marginHorizontal: 0,
    marginRight: 2,
    marginVertical: 0,
    paddingBottom: 5,
    paddingRight: 10,
  },
});

export default EquipmentCard;
