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
import {
  Icon,
  ThemeColors,
  addOpacityToHex,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

type MenuIconTileVariant = 'primary' | 'neutral';

interface MenuIconTileProps {
  style?: any;
  icon: string;
  iconSize?: number;
  size?: number;
  variant?: MenuIconTileVariant;
  highlighted?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const MenuIconTile = ({
  style,
  icon,
  iconSize = 20,
  size = TILE_SIZE,
  variant = 'primary',
  highlighted = false,
  disabled = false,
  onPress,
}: MenuIconTileProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(Colors, size, variant, highlighted),
    [Colors, size, variant, highlighted],
  );

  const iconColor = useMemo(() => {
    if (disabled) {
      return Colors.secondaryColor.background_light;
    }

    return variant === 'primary'
      ? Colors.primaryColor.background
      : Colors.secondaryColor_dark.background;
  }, [Colors, disabled, variant]);

  const Container: any = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.tile, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon
        name={icon}
        size={iconSize}
        color={iconColor}
        visible={icon != null}
      />
    </Container>
  );
};

const TILE_SIZE = 40;
const TILE_RADIUS = 12;

const getStyles = (
  Colors: ThemeColors,
  size: number,
  variant: MenuIconTileVariant,
  highlighted: boolean,
) => {
  const backgroundColor =
    variant === 'primary'
      ? highlighted
        ? Colors.backgroundColor
        : addOpacityToHex(Colors.primaryColor.background, 0.15)
      : addOpacityToHex(Colors.secondaryColor.background_light, 0.6);

  return StyleSheet.create({
    tile: {
      width: size,
      height: size,
      borderRadius: TILE_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      ...(variant === 'primary' && highlighted
        ? {borderWidth: 1, borderColor: Colors.primaryColor.background}
        : {}),
    },
  });
};

export default MenuIconTile;
