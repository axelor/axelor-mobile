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

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import IndicatorBadge from './IndicatorBadge';
import {TabProps} from './tabs.helper';

const Tab = ({
  title,
  onPress,
  isActive = false,
  disabled = false,
  count,
  showBadge,
  style,
}: TabProps) => {
  const Colors = useThemeColor();

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      disabled={disabled || isActive}
      style={[
        tabStyles.container,
        {
          borderColor: isActive
            ? Colors.primaryColor.background
            : Colors.backgroundColor,
          backgroundColor: Colors.backgroundColor,
        },
        style,
      ]}>
      <Text numberOfLines={1} fontSize={16}>
        {title}
      </Text>
      {showBadge && <IndicatorBadge count={count} />}
    </TouchableOpacity>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default Tab;
