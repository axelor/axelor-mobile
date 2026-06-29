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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color, useThemeColor} from '../../../../../theme';
import {checkNullString, hexToRgb} from '../../../../../utils';
import {BorderBar, Icon, Text} from '../../../../atoms';
import {TextUnit} from '../../../../molecules';

interface SimpleIndicatorProps {
  icon?: string;
  color?: string;
  value: number;
  unit: string;
  title: string;
  onPress?: () => void;
}

const SimpleIndicator = ({
  icon,
  color: _color,
  value,
  unit,
  title,
  onPress,
}: SimpleIndicatorProps) => {
  const Colors = useThemeColor();

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
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {value > 0 && <BorderBar color={color.background} />}
      <View style={styles.inner}>
        <Icon size={20} name={icon!} visible={isIcon} />
        <View style={styles.titleContainer}>
          <TextUnit
            value={value}
            unit={unit}
            color={value <= 0 ? Colors.secondaryColor : color}
          />
          <Text
            numberOfLines={2}
            style={styles.textAlign}
            textColor={Colors.secondaryColor.background}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 6,
    paddingRight: 6,
    gap: 6,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  textAlign: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SimpleIndicator;
