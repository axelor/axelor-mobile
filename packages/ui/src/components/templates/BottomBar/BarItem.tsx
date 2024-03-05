/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Color, useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';
import {Button, NumberBubble} from '../../molecules';
import {Text} from '../../atoms';

const BarItem = ({
  iconName,
  color,
  title,
  isSelected = false,
  size,
  disabled,
  indicator,
  onPress,
}: {
  iconName: string;
  color?: Color;
  title?: string;
  isSelected: boolean;
  size: number;
  disabled?: boolean;
  indicator?: number;
  onPress: () => void;
}) => {
  const Colors = useThemeColor();

  const buttonColor: Color = useMemo(
    () => color ?? Colors.primaryColor,
    [Colors.primaryColor, color],
  );

  const buttonSize: number = useMemo(
    () => (isSelected ? size * 1.2 : size),
    [isSelected, size],
  );

  return (
    <View style={styles.container}>
      <Button
        iconName={iconName}
        color={buttonColor}
        disabled={disabled}
        onPress={onPress}
        width={buttonSize}
        style={{height: buttonSize}}
        iconSize={buttonSize * 0.6}
      />
      {indicator > 0 && (
        <NumberBubble
          number={indicator}
          color={buttonColor}
          isNeutralBackground={true}
          style={styles.indicator}
          size={buttonSize * 0.6}
        />
      )}
      {!checkNullString(title) && <Text>{title}</Text>}
      <View
        style={[
          styles.selectedBar,
          {
            borderColor: isSelected
              ? buttonColor.background
              : Colors.backgroundColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  selectedBar: {
    borderTopWidth: 1,
    width: 30,
    marginTop: 5,
  },
  indicator: {
    position: 'absolute',
    top: -5,
    right: -10,
  },
});

export default BarItem;
