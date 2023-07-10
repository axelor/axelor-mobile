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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Icon} from '../../atoms';

interface IncrementButtonProps {
  style?: any;
  iconName: 'plus' | 'minus';
  onPress?: () => void;
  readonly?: boolean;
  disabled?: boolean;
}

const IncrementButton = ({
  style,
  iconName,
  onPress = () => {},
  readonly = false,
  disabled,
}: IncrementButtonProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (readonly) {
    return null;
  }

  return (
    <Icon
      name={iconName}
      size={24}
      color={
        disabled
          ? Colors.secondaryColor.background
          : Colors.primaryColor.background
      }
      touchable={!disabled}
      onPress={onPress}
      style={[styles.container_icon, style]}
    />
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container_icon: {
      backgroundColor: Colors.backgroundColor,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      padding: 2,
      paddingHorizontal: 5,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 0.5,
      borderRadius: 10,
    },
  });

export default IncrementButton;
