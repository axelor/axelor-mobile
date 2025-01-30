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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Color} from '../../../theme/themes';
import {Icon} from '../../atoms';

const BUTTON_SIZE = 50;

const CircleButton = ({
  style,
  disabled = false,
  iconName,
  size = BUTTON_SIZE,
  onPress,
}: {
  style?: any;
  disabled?: boolean;
  iconName: string;
  size?: number;
  onPress: () => void;
}) => {
  const Colors = useThemeColor();
  const color: Color = useMemo(
    () => (disabled ? Colors.secondaryColor : Colors.primaryColor),
    [Colors, disabled],
  );

  const styles = useMemo(
    () => getStyles(color.background, size),
    [color, size],
  );
  const iconSize = useMemo(() => Math.floor(size / 2), [size]);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}>
      <Icon
        name={iconName}
        color={color.foreground}
        size={iconSize}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const getStyles = (color, size) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      borderRadius: size,
      width: size,
      height: size,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      alignSelf: 'center',
    },
  });

export default CircleButton;
