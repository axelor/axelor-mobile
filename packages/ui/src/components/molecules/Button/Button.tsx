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
import {DimensionValue, StyleSheet, TouchableOpacity} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {Color, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';

export interface ButtonProps {
  testID?: string;
  width?: DimensionValue;
  color?: Color;
  isNeutralBackground?: boolean;
  iconName?: string;
  iconSize?: number;
  title?: string;
  style?: any;
  styleIcon?: any;
  styleTxt?: any;
  onPress?: () => void;
  disabled?: boolean;
  onDisabledPress?: () => void;
}

const Button = ({
  testID,
  width = '90%',
  color,
  isNeutralBackground = false,
  iconName,
  iconSize = 25,
  title,
  style,
  styleIcon,
  styleTxt,
  onPress = () => {},
  disabled = false,
  onDisabledPress = null,
}: ButtonProps) => {
  const Colors = useThemeColor();

  const buttonColor = useMemo(() => {
    if (disabled) {
      return Colors.secondaryColor;
    }

    let _buttonColor: Color = color != null ? color : Colors.primaryColor;

    if (isNeutralBackground) {
      _buttonColor = {
        background: _buttonColor.background,
        background_light: Colors.backgroundColor,
        foreground: Colors.text,
      };
    }

    return _buttonColor;
  }, [color, Colors, disabled, isNeutralBackground]);

  const styles = useMemo(() => {
    return getStyles(buttonColor, width);
  }, [buttonColor, width]);

  const commonStyles = useMemo(() => {
    return getCommonStyles(Colors);
  }, [Colors]);

  if (!iconName && !title) {
    return null;
  }

  return (
    <TouchableOpacity
      testID={testID}
      style={[commonStyles.button, styles.colorButton, style]}
      onPress={disabled ? onDisabledPress : onPress}
      disabled={disabled && !onDisabledPress}
      activeOpacity={0.9}
      accessibilityRole="button">
      {!!iconName && (
        <Icon
          name={iconName}
          size={iconSize}
          color={buttonColor.foreground}
          style={[styles.icon, styleIcon]}
        />
      )}
      {!!title && (
        <Text
          style={[styles.text, styleTxt]}
          fontSize={17}
          textColor={buttonColor.foreground}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (color: Color, width: DimensionValue) =>
  StyleSheet.create({
    colorButton: {
      backgroundColor: color.background_light,
      borderColor: color.background,
      width: width,
    },
    text: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 5,
    },
    icon: {
      marginHorizontal: 5,
    },
  });

export default Button;
