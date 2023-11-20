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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '../../atoms';

const predefinedPositions = {
  left: {left: '-2%'},
  top: {top: '-50%'},
  center: {top: '50%', left: '50%'},
  right: {right: '-2%'},
  bottom: {bottom: '-50%'},
  'bottom-right': {bottom: '-10%', right: '-2%'},
  'bottom-left': {bottom: '-10%', left: '-2%'},
  'top-left': {top: '-10%', left: '-2%'},
  'top-right': {top: '-10%', right: '-2%'},
};

interface DoubleIconProps {
  bottomIconName: string;
  topIconName: string;
  predefinedPosition?: keyof typeof predefinedPositions;
  topIconPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  color?: string;
  size?: number;
  touchable?: boolean;
  onPress?: () => void;
}

const DoubleIcon = ({
  bottomIconName,
  topIconName,
  topIconPosition = {},
  color,
  size = 18,
  touchable = false,
  predefinedPosition,
  onPress = () => {},
}: DoubleIconProps) => {
  const topIconStyle = predefinedPositions[predefinedPosition];
  return (
    <View style={styles.container}>
      <Icon
        name={bottomIconName}
        color={color}
        size={size}
        touchable={touchable}
        onPress={onPress}
      />
      <View style={[styles.topIcon, topIconStyle, topIconPosition]}>
        <Icon
          name={topIconName}
          color={color}
          size={size * 0.6}
          touchable={touchable}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  topIcon: {
    position: 'absolute',
  },
});

export default DoubleIcon;
