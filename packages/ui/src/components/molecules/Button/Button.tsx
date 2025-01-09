/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Text} from '../../atoms';
import {Color} from '../../../theme/themes';

interface ButtonProps {
  style?: any;
  styleTxt?: any;
  color?: Color;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const Button = ({
  style,
  styleTxt,
  color,
  title,
  onPress = () => {},
  disabled = false,
}: ButtonProps) => {
  const Colors = useThemeColor();
  const buttonColor = useMemo(
    () => (color != null ? color : Colors.primaryColor),
    [Colors, color],
  );

  const styles = useMemo(() => {
    return getStyles(buttonColor.background);
  }, [buttonColor]);

  const commonStyles = useMemo(() => {
    return getCommonStyles(Colors);
  }, [Colors]);

  return (
    <TouchableOpacity
      style={[styles.colorButton, commonStyles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[styles.text, styleTxt]}
        fontSize={15}
        textColor={buttonColor.foreground}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = backgroundColor =>
  StyleSheet.create({
    colorButton: {
      backgroundColor: backgroundColor,
    },
    text: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default Button;
