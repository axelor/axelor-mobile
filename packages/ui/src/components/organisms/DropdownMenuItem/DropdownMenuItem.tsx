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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {Badge} from '../../molecules';

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
  onPress: (any) => void;
}

const BADGE_SIZE = 12;

const DropdownMenuItem = ({
  style,
  styleText,
  numberOfLines = null,
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

  const _color = useMemo(() => {
    if (color != null) {
      return color;
    }

    if (disableIf) {
      return Colors.secondaryColor.background;
    }

    return Colors.secondaryColor_dark.background;
  }, [Colors, color, disableIf]);

  if (hideIf) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.menuItem, style]}
      disabled={disableIf}
      testID="dropdownMenuItemTouchable">
      <View style={styles.iconContainer}>
        {customComponent != null ? (
          React.cloneElement(customComponent)
        ) : (
          <Icon name={icon} color={_color} size={15} />
        )}
        {indicator > 0 && (
          <Badge
            style={styles.badge}
            txtStyle={styles.badgeText}
            color={{
              background_light: Colors.backgroundColor,
              foreground: Colors.text,
              background: Colors.primaryColor.background,
            }}
            title={indicator}
          />
        )}
      </View>
      <Text style={[styles.text, styleText]} numberOfLines={numberOfLines}>
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: Math.ceil(BADGE_SIZE / 2),
    position: 'absolute',
    top: -4,
    right: -8,
    zIndex: 10,
  },
  badgeText: {fontSize: Math.ceil(BADGE_SIZE / 2)},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
  },
  text: {fontSize: 18},
  iconContainer: {marginRight: 10},
});

export default DropdownMenuItem;
