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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  DrawerActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {Icon, ThemeColors, useThemeColor} from '@axelor/aos-mobile-ui';

interface HeaderButtonProps {
  isRoot?: boolean;
}

const HeaderButton = ({isRoot = false}: HeaderButtonProps) => {
  const navigation = useNavigation();
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handlePress = useCallback(
    () =>
      navigation.dispatch(
        isRoot ? DrawerActions.toggleDrawer() : StackActions.pop(),
      ),
    [isRoot, navigation],
  );

  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={handlePress}
      activeOpacity={0.7}>
      <Icon
        name={isRoot ? 'list' : 'chevron-left'}
        color={Colors.primaryColor.background}
        size={22}
      />
    </TouchableOpacity>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    icon: {
      marginLeft: 8,
      marginRight: 8,
      padding: 8,
      borderRadius: 12,
      backgroundColor: `${Colors.backgroundColor}CC`,
      borderWidth: 0.5,
      borderColor: `${Colors.secondaryColor_dark.background}26`,
    },
  });

export default HeaderButton;
