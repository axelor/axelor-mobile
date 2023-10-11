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
import {Button} from '../../molecules';
import {Color} from '../../../theme/themes';

const BUTTON_SIZE = 50;

interface CircleButtonProps {
  square?: boolean;
  size?: number;
  color?: Color;
  isNeutralBackground?: boolean;
  iconName: string;
  FontAwesome5?: boolean;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  onDisabledPress?: () => void;
}

const CircleButton = ({
  square = true,
  size = BUTTON_SIZE,
  color,
  isNeutralBackground = false,
  iconName,
  FontAwesome5 = true,
  style,
  onPress = () => {},
  disabled = false,
  onDisabledPress = null,
}: CircleButtonProps) => {
  const styles = useMemo(() => {
    return getStyles(size, square);
  }, [size, square]);

  const iconSize = useMemo(() => Math.floor(size / 2), [size]);

  return (
    <Button
      color={color}
      isNeutralBackground={isNeutralBackground}
      iconName={iconName}
      iconSize={iconSize}
      FontAwesome5={FontAwesome5}
      style={[styles.button, style]}
      styleIcon={styles.icon}
      onPress={onPress}
      disabled={disabled}
      onDisabledPress={onDisabledPress}
    />
  );
};

const getStyles = (size: number, square: boolean) =>
  StyleSheet.create({
    button: {
      width: size,
      height: size,
      borderRadius: square ? 13 : size,
    },
    icon: {
      marginHorizontal: 0,
    },
  });

export default CircleButton;
