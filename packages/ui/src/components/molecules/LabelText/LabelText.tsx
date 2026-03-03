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
import {View, StyleSheet} from 'react-native';
import {checkNullString} from '../../../utils/strings';
import {Icon, Text} from '../../atoms';

interface LabelTextProps {
  style?: any;
  iconStyle?: any;
  textStyle?: any;
  title?: string | number;
  value?: string | number;
  size?: number;
  textSize?: number;
  color?: string;
  iconName?: string;
  onlyOneLine?: boolean;
}

const LabelText = ({
  style,
  iconStyle,
  textStyle,
  title,
  value,
  size = 12,
  textSize = 14,
  color,
  iconName = null,
  onlyOneLine = false,
}: LabelTextProps) => {
  const renderValue = () => {
    if (checkNullString(value?.toString())) {
      return null;
    }

    return (
      <Text style={textStyle} writingType="important" fontSize={textSize}>
        {value}
      </Text>
    );
  };

  return (
    <View testID="labelTextContainer" style={[styles.container, style]}>
      {iconName && (
        <Icon
          style={[styles.icon, iconStyle]}
          name={iconName}
          size={size}
          color={color}
        />
      )}
      <Text
        style={textStyle}
        fontSize={textSize}
        numberOfLines={onlyOneLine ? 1 : null}>
        {!checkNullString(title?.toString()) && `${title} `}
        {renderValue()}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});

export default LabelText;
