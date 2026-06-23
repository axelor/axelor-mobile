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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  DrawerActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {Card, Icon, useThemeColor} from '@axelor/aos-mobile-ui';

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
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.container}>
        <Icon
          name={isRoot ? 'list' : 'chevron-left'}
          color={Colors.primaryColor.background}
          size={18}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    paddingHorizontal: 10,
    paddingRight: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default HeaderButton;
