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
import {ThemeColors, useThemeColor} from '../../../theme';
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

const BADGE_SIZE = 16;

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

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const _color = useMemo(() => {
    if (color != null) {
      return color;
    }

    if (disableIf) {
      return Colors.secondaryColor.background;
    }

    return Colors.primaryColor.background;
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
        {React.isValidElement(customComponent) ? (
          <View style={styles.customComponentWrapper}>
            {customComponent}
          </View>
        ) : (
          <Icon name={icon} color={_color} size={18} />
        )}
        {indicator > 0 && (
          <Badge
            style={styles.badge}
            txtStyle={styles.badgeText}
            color={{
              background_light: Colors.primaryColor.background,
              foreground: Colors.backgroundColor,
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

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    badge: {
      width: BADGE_SIZE,
      height: BADGE_SIZE,
      borderRadius: BADGE_SIZE / 2,
      position: 'absolute',
      top: -4,
      right: -4,
      zIndex: 10,
    },
    badgeText: {
      fontSize: Math.ceil(BADGE_SIZE / 1.5),
      fontWeight: 500,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      padding: 5,
    },
    text: {fontSize: 16, fontWeight: 500},
    iconContainer: {
      marginRight: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: `${Colors.primaryColor.background}24`,
    },
    customComponentWrapper: {
      width: 18,
      height: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default DropdownMenuItem;
