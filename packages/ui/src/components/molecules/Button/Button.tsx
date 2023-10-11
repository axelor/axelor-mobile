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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Text} from '../../atoms';
import {Color} from '../../../theme/themes';

export interface ButtonProps {
  color?: Color;
  disabled?: boolean;
  FontAwesome5?: boolean;
  iconName?: string;
  isNeutralBackground?: boolean;
  onDisabledPress?: () => void;
  onPress?: () => void;
  style?: any;
  styleTxt?: any;
  title?: string;
  width?: string | number;
}

const Button = ({
  color,
  disabled = false,
  FontAwesome5 = true,
  iconName,
  isNeutralBackground = false,
  onDisabledPress = null,
  onPress = () => {},
  style,
  styleTxt,
  title,
  width = '90%',
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
      style={[commonStyles.button, styles.colorButton, style]}
      onPress={disabled ? onDisabledPress : onPress}
      disabled={disabled && !onDisabledPress}
      activeOpacity={0.9}>
      {!!iconName && (
        <Icon
          name={iconName}
          FontAwesome5={FontAwesome5}
          size={15}
          color={buttonColor.foreground}
          style={styles.icon}
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

const getStyles = (color: Color, width: string | number) =>
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
