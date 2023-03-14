/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {Badge} from '../../molecules';

interface DropdownMenuItemProps {
  icon?: string;
  placeholder: string;
  FontAwesome5?: boolean;
  indicator?: number;
  hideIf?: boolean;
  onPress: (any) => void;
}

const BADGE_SIZE = 12;

const DropdownMenuItem = ({
  icon = 'paperclip',
  placeholder,
  indicator = 0,
  FontAwesome5 = true,
  hideIf = false,
  onPress,
}: DropdownMenuItemProps) => {
  const Colors = useThemeColor();

  if (hideIf) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.iconContainer}>
        <Icon name={icon} FontAwesome5={FontAwesome5} size={15} />
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
      <Text style={styles.text}>{placeholder}</Text>
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
  badgeText: {
    fontSize: Math.ceil(BADGE_SIZE / 2),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
  },
  text: {
    fontSize: 18,
  },
  iconContainer: {
    marginRight: 10,
  },
});

export default DropdownMenuItem;
