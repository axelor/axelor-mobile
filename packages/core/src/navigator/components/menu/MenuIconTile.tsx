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
import {IconTile, useThemeColor} from '@axelor/aos-mobile-ui';

type MenuIconTileVariant = 'primary' | 'neutral';

const TILE_SIZE = 40;

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

  const backgroundColor = useMemo(() => {
    if (variant === 'neutral') {
      return Colors.secondaryColor.background_light;
    }

    return highlighted
      ? Colors.backgroundColor
      : Colors.primaryColor.background_light;
  }, [Colors, variant, highlighted]);

  const iconColor = useMemo(() => {
    if (disabled) {
      return Colors.secondaryColor.background_light;
    }

    return variant === 'primary'
      ? Colors.primaryColor.background
      : Colors.secondaryColor_dark.background;
  }, [Colors, disabled, variant]);

  const borderStyle = useMemo(
    () =>
      variant === 'primary' && highlighted
        ? {borderWidth: 1, borderColor: Colors.primaryColor.background}
        : null,
    [Colors, variant, highlighted],
  );

  return (
    <IconTile
      style={[borderStyle, style]}
      icon={icon}
      iconSize={iconSize}
      size={size}
      backgroundColor={backgroundColor}
      iconColor={iconColor}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default MenuIconTile;
