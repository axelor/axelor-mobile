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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Icon} from '../../atoms';

interface IconTileProps {
  style?: any;
  testID?: string;
  icon?: string;
  iconSize?: number;
  color?: Color;
  backgroundColor?: string;
  iconColor?: string;
  size?: number;
  padding?: number;
  borderRadius?: number;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const IconTile = ({
  style,
  testID,
  icon,
  iconSize = 18,
  color,
  backgroundColor,
  iconColor,
  size,
  padding = 10,
  borderRadius = 12,
  disabled = false,
  onPress,
  children,
}: IconTileProps) => {
  const Colors = useThemeColor();

  const _color = useMemo(
    () => color ?? Colors.primaryColor,
    [Colors.primaryColor, color],
  );

  const _backgroundColor = useMemo(
    () => backgroundColor ?? _color.background_light,
    [backgroundColor, _color.background_light],
  );

  const _iconColor = useMemo(
    () => iconColor ?? _color.background,
    [_color.background, iconColor],
  );

  const styles = useMemo(
    () => getStyles(_backgroundColor, size, padding, borderRadius),
    [_backgroundColor, size, padding, borderRadius],
  );

  return (
    <TouchableOpacity
      style={[styles.tile, style]}
      testID={testID}
      onPress={onPress}
      disabled={!onPress || disabled}
      activeOpacity={0.9}>
      {icon != null && <Icon name={icon} size={iconSize} color={_iconColor} />}
      {children}
    </TouchableOpacity>
  );
};

const getStyles = (
  backgroundColor: string | undefined,
  size: number | undefined,
  padding: number,
  borderRadius: number,
) =>
  StyleSheet.create({
    tile: {
      ...(size != null ? {width: size, height: size} : {padding}),
      borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
    },
  });

export default IconTile;
