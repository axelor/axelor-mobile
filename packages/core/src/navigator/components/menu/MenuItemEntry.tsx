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
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Text, WarningCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {Compatibility} from '../../../app';
import {useTranslator} from '../../../i18n';
import {getCompatibilityError, isMenuIncompatible} from '../../helpers';

interface MenuItemEntryProps {
  style?: any;
  icon: string;
  title: string;
  compatibility: Compatibility;
  onPress: () => void;
  isActive?: boolean;
  disabled?: boolean;
  isDropdown?: boolean;
  dropdown?: boolean;
  iconSize?: number;
}

const MenuItemEntry = ({
  style,
  icon,
  title,
  compatibility,
  onPress,
  isActive = false,
  disabled = false,
  isDropdown = false,
  dropdown = false,
  iconSize = 24,
}: MenuItemEntryProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const compatibilityError = useMemo(
    () => isMenuIncompatible(compatibility),
    [compatibility],
  );

  const menuDisabled = useMemo(
    () => disabled || compatibilityError,
    [compatibilityError, disabled],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={menuDisabled}>
      <View style={styles.container}>
        <View
          style={[
            styles.menuItemActive,
            {
              backgroundColor:
                !dropdown && isActive
                  ? Colors.primaryColor.background
                  : Colors.backgroundColor,
            },
          ]}
        />
        <View style={[styles.menuItemContainer, style]}>
          <Icon
            style={styles.menuItemIcon}
            name={icon}
            size={iconSize}
            color={
              menuDisabled
                ? Colors.secondaryColor.background_light
                : Colors.secondaryColor_dark.background
            }
            visible={icon != null}
          />
          <View style={styles.menuItemTextContainer}>
            <Text
              style={styles.menuItemTitle}
              textColor={
                menuDisabled
                  ? Colors.secondaryColor.background_light
                  : Colors.text
              }>
              {title}
            </Text>
          </View>
          <Icon
            name={dropdown ? 'chevron-up' : 'chevron-down'}
            color={Colors.secondaryColor_dark.background}
            style={styles.dropdownIcon}
            visible={isDropdown && !compatibilityError}
          />
          <Icon
            name="exclamation-triangle-fill"
            color={Colors.errorColor.background}
            style={styles.dropdownIcon}
            visible={compatibilityError}
          />
        </View>
      </View>
      {compatibilityError && (
        <WarningCard
          style={styles.compatibilityError}
          errorMessage={getCompatibilityError(compatibility, I18n, false)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  menuItemContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  menuItemActive: {
    width: 7,
    height: 32,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  menuItemIcon: {
    marginLeft: 12,
    marginRight: 18,
  },
  menuItemTextContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingRight: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownIcon: {
    marginHorizontal: 5,
    marginRight: 20,
  },
  compatibilityError: {
    marginVertical: 0,
    marginHorizontal: 7,
    width: '95%',
  },
});

export default MenuItemEntry;
