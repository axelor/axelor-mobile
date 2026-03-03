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
import {StyleSheet, View} from 'react-native';
import {
  Button,
  checkNullString,
  Icon,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface NavigationButtonProps {
  style?: any;
  position: string;
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

  const positionStyle = useMemo(
    () => ({[position]: !checkNullString(title) ? '10%' : '15%'}),
    [position, title],
  );

  return (
    <View style={[styles.buttonContainer, style]}>
      <Button
        title={title}
        onPress={onPress}
        color={Colors.priorityColor}
        disabled={disabled}
        iconName={icon}
      />
      <Icon
        name={`chevron-${position}`}
        style={[styles.chevron, positionStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    position: 'absolute',
  },
});

export default NavigationButton;
