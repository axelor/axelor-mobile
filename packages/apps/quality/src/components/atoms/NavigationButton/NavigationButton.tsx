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
import {StyleSheet, View} from 'react-native';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

interface NavigationButtonProps {
  style?: any;
  position: 'left' | 'right';
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
  title?: string;
}

const NavigationButton = ({
  style,
  position,
  onPress,
  icon,
  disabled,
  title,
}: NavigationButtonProps) => {
  const Colors = useThemeColor();

  return (
    <View style={[styles.buttonContainer, style]}>
      <Button
        title={title}
        onPress={onPress}
        color={Colors.priorityColor}
        disabled={disabled}
        iconName={position === 'left' ? 'chevron-left' : icon}
        rightIconName={position === 'right' ? 'chevron-right' : icon}
        iconSize={18}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavigationButton;
