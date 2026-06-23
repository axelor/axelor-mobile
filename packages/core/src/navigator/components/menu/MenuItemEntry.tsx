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
import {
  Icon,
  Text,
  WarningCard,
  addOpacityToHex,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {Compatibility} from '../../../app';
import {useTranslator} from '../../../i18n';
import {getCompatibilityError, isMenuIncompatible} from '../../helpers';
import MenuIconTile from './MenuIconTile';

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
  iconSize = 20,
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

  const highlighted = useMemo(() => isActive || dropdown, [dropdown, isActive]);

  return (
    <TouchableOpacity onPress={onPress} disabled={menuDisabled}>
      <View
        style={[
          styles.row,
          highlighted
            ? {
                backgroundColor: addOpacityToHex(
                  Colors.primaryColor.background,
                  0.2,
                ),
              }
            : null,
          style,
        ]}>
        <MenuIconTile
          style={styles.iconTile}
          icon={icon}
          iconSize={iconSize}
          highlighted={highlighted}
          disabled={menuDisabled}
        />
        <Text
          style={styles.menuItemTitle}
          fontSize={14}
          textColor={
            menuDisabled ? Colors.secondaryColor.background_light : Colors.text
          }>
          {title}
        </Text>
        <Icon
          name={dropdown ? 'chevron-up' : 'chevron-down'}
          color={Colors.primaryColor.background}
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
      {compatibilityError && (
        <WarningCard
          style={styles.compatibilityError}
          errorMessage={getCompatibilityError(compatibility, I18n, false)}
        />
      )}
    </TouchableOpacity>
  );
};

const TILE_RADIUS = 12;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: TILE_RADIUS,
    overflow: 'hidden',
  },
  iconTile: {
    marginRight: 8,
  },
  menuItemTitle: {
    flex: 1,
    alignSelf: 'center',
    paddingRight: 8,
    fontWeight: 'bold',
  },
  dropdownIcon: {
    marginHorizontal: 5,
    marginRight: 5,
  },
  compatibilityError: {
    marginVertical: 0,
    marginHorizontal: 7,
    width: '95%',
  },
});

export default MenuItemEntry;
