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
import {Color, useThemeColor} from '../../../theme';
import {getCommonStyles} from '../../../utils';
import {Icon, Text} from '../../atoms';

export interface ButtonProps {
  testID?: string;
  width?: DimensionValue;
  color?: Color;
  isNeutralBackground?: boolean;
  iconName?: string;
  iconSize?: number;
  title?: string;
  titleSize?: number;
  style?: any;
  styleIcon?: any;
  styleTxt?: any;
  onPress?: () => void;
  disabled?: boolean;
  onDisabledPress?: () => void;
  numberOfLines?: number;
}

const Button = ({
  testID,
  width = '90%',
  color,
  isNeutralBackground = false,
  iconName,
  iconSize = 16,
  title,
  titleSize = 16,
  style,
  styleIcon,
  styleTxt,
  onPress,
  disabled = false,
  onDisabledPress,
  numberOfLines = 2,
}: ButtonProps) => {
  const Colors = useThemeColor();

  const buttonColor = useMemo(() => {
    if (disabled) return Colors.secondaryColor;

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

  const styles = useMemo(
    () => getStyles(buttonColor, width),
    [buttonColor, width],
  );

  const commonStyles = useMemo(() => getCommonStyles(), []);

  if (!iconName && !title) return null;

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
          style={styleIcon}
        />
      )}
      {!!title && (
        <Text
          style={[styles.text, styleTxt]}
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit
          fontSize={titleSize}
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
      gap: 10,
    },
    text: {
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      flexShrink: 1,
    },
  });

export default Button;
