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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  DrawerActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';

interface HeaderButtonProps {
  isRoot?: boolean;
}

const HeaderButton = ({isRoot = false}: HeaderButtonProps) => {
  const navigation = useNavigation();
  const Colors = useThemeColor();

  const handlePress = useCallback(
    () =>
      navigation.dispatch(
        isRoot ? DrawerActions.toggleDrawer() : StackActions.pop(),
      ),
    [isRoot, navigation],
  );

  return (
    <Icon
      style={styles.icon}
      name={isRoot ? 'list' : 'chevron-left'}
      size={26}
      color={Colors.primaryColor.background}
      touchable
      onPress={handlePress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 14,
    paddingRight: 28,
  },
});

export default HeaderButton;
