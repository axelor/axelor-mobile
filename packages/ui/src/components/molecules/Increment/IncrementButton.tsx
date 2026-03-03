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
import {StyleSheet} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Icon} from '../../atoms';

const ICON_SIZE = 24;
const DEFAULT_BUTTON_SIZE = 35;
const BIG_BUTTON_SIZE = 75;

interface IncrementButtonProps {
  style?: any;
  iconName: 'plus-lg' | 'dash-lg';
  onPress?: () => void;
  readonly?: boolean;
  disabled?: boolean;
  isBigButton?: boolean;
}

const IncrementButton = ({
  style,
  iconName,
  onPress = () => {},
  readonly = false,
  disabled,
  isBigButton = false,
}: IncrementButtonProps) => {
  const Colors = useThemeColor();

  const buttonSize = useMemo(
    () => (isBigButton ? BIG_BUTTON_SIZE : DEFAULT_BUTTON_SIZE),
    [isBigButton],
  );

  const styles = useMemo(
    () => getStyles(Colors, buttonSize),
    [Colors, buttonSize],
  );

  if (readonly) {
    return null;
  }

  return (
    <Icon
      name={iconName}
      size={ICON_SIZE}
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

const getStyles = (Colors: ThemeColors, buttonSize: number) =>
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
      width: buttonSize ?? DEFAULT_BUTTON_SIZE,
      height: buttonSize ?? DEFAULT_BUTTON_SIZE,
    },
  });

export default IncrementButton;
