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

import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Color, useThemeColor} from '../../../../../theme';
import {Icon, Text} from '../../../../atoms';
import {TextUnit} from '../../../../molecules';
import {checkNullString, getCommonStyles, hexToRgb} from '../../../../../utils';

interface IndicatorItemProps {
  icon?: string;
  color?: string;
  value: number;
  unit: string;
  title: string;
  onPress?: () => void;
}

const IndicatorItem = ({
  icon,
  color: _color,
  value,
  unit,
  title,
  onPress,
}: IndicatorItemProps) => {
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const isIcon = useMemo(() => !checkNullString(icon), [icon]);

  const color: Color = useMemo(() => {
    if (_color != null) {
      return {
        background: _color,
        background_light: `rgba(${hexToRgb(_color)}, 0.6)`,
        foreground: Colors.text,
      };
    }

    return Colors.primaryColor;
  }, [Colors, _color]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        commonStyles.button,
        styles.container,
        {
          backgroundColor: color.background_light,
          borderColor: color.background,
        },
      ]}>
      <View style={styles.title}>
        {isIcon && <Icon style={styles.icon} size={20} name={icon} />}
        <Text numberOfLines={2} writingType="important">
          {title}
        </Text>
      </View>
      <View style={styles.unit}>
        <TextUnit
          unit={unit}
          value={value}
          fontSize={16}
          numberOfLines={2}
          defaultColor={true}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  title: {
    flex: 2,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  unit: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default IndicatorItem;
