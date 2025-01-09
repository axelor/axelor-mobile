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
import {Icon, Text} from '../../atoms';
import {Color} from '../../../theme/themes';

interface IconButtonProps {
  style?: any;
  color?: Color;
  title: string;
  iconName: string;
  FontAwesome5?: boolean;
  onPress: (any) => void;
  disabled?: boolean;
}

const IconButton = ({
  style,
  color,
  title,
  iconName,
  FontAwesome5 = true,
  onPress = () => {},
  disabled = false,
}: IconButtonProps) => {
  const Colors = useThemeColor();
  const buttonColor = useMemo(
    () => (color == null ? Colors.primaryColor : color),
    [Colors.primaryColor, color],
  );

  const styles = useMemo(() => {
    return getStyles(buttonColor);
  }, [buttonColor]);

  const commonStyle = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      style={[styles.container, commonStyle.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon
        name={iconName}
        FontAwesome5={FontAwesome5}
        size={15}
        color={buttonColor.foreground}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
    text: {
      color: color.foreground,
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 10,
    },
  });

export default IconButton;
