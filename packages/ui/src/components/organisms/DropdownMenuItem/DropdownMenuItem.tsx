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

import React, {ReactElement, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import {Badge, IconTile} from '../../molecules';

interface DropdownMenuItemProps {
  style?: any;
  styleText?: any;
  numberOfLines?: number;
  icon?: string;
  color?: string;
  placeholder: string;
  indicator?: number;
  hideIf?: boolean;
  disableIf?: boolean;
  customComponent?: ReactElement<any>;
  onPress: () => void;
}

const BADGE_SIZE = 16;

const DropdownMenuItem = ({
  style,
  styleText,
  numberOfLines,
  icon = 'paperclip',
  color,
  placeholder,
  indicator = 0,
  hideIf = false,
  disableIf = false,
  customComponent,
  onPress,
}: DropdownMenuItemProps) => {
  const Colors = useThemeColor();

  const _color: Color = useMemo(() => {
    if (color != null)
      return {
        background: color,
        background_light: color,
        foreground: Colors.text,
      };

    if (disableIf) return Colors.secondaryColor;

    return Colors.primaryColor;
  }, [Colors, color, disableIf]);

  if (hideIf) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.menuItem, style]}
      disabled={disableIf}
      testID="dropdownMenuItemTouchable">
      <IconTile
        style={styles.iconContainer}
        icon={React.isValidElement(customComponent) ? undefined : icon}
        iconSize={18}
        color={_color}
        padding={10}
        borderRadius={10}>
        {customComponent}
        {indicator > 0 && (
          <Badge
            style={styles.badge}
            txtStyle={styles.badgeText}
            color={Colors.errorColor}
            title={indicator}
          />
        )}
      </IconTile>
      <Text style={styleText} fontSize={16} numberOfLines={numberOfLines}>
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: Math.ceil(BADGE_SIZE / 2),
    position: 'absolute',
    top: -6,
    right: -6,
    zIndex: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  badgeText: {
    fontSize: Math.ceil(BADGE_SIZE / 1.8),
  },
});

export default DropdownMenuItem;
