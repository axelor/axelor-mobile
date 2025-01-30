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
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon} from '../../atoms';

interface CardIconButtonProps {
  style?: any;
  iconName: string;
  iconColor: string;
  onPress: (any) => void;
}

const CardIconButton = ({
  style,
  iconName,
  iconColor,
  onPress = () => {},
}: CardIconButtonProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.4}>
      <Icon size={20} name={iconName} color={iconColor} />
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '90%',
      borderRadius: 8,
      alignSelf: 'center',
      shadowOpacity: 0,
      elevation: 0,
      justifyContent: 'center',
      backgroundColor: Colors.backgroundColor,
      margin: 2,
    },
  });

export default CardIconButton;
