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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from '../../atoms';

const predefinedPositions = {
  left: {left: -10},
  top: {top: -10},
  right: {right: -10},
  bottom: {bottom: -10},
  'bottom-right': {bottom: -10, right: -10},
  'bottom-left': {bottom: -7, left: -10},
  'top-left': {top: -10, left: -10},
  'top-right': {top: -10, right: -10},
};

interface IconConfig {
  name: string;
  color?: string;
  size?: number;
}

interface DoubleIconProps {
  style?: any;
  topIconConfig: IconConfig;
  bottomIconConfig: IconConfig;
  size?: number;
  touchable?: boolean;
  onPress?: () => void;
  predefinedPosition?: keyof typeof predefinedPositions;
  topIconPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const DoubleIcon = ({
  style,
  topIconConfig,
  bottomIconConfig,
  size = 18,
  predefinedPosition,
  topIconPosition = {},
  touchable,
  onPress,
}: DoubleIconProps) => {
  const topIconStyle = useMemo(
    () => predefinedPositions[predefinedPosition],
    [predefinedPosition],
  );

  return (
    <TouchableOpacity
      testID="doubleIconTouchable"
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!touchable}>
      <Icon
        {...bottomIconConfig}
        size={bottomIconConfig?.size != null ? bottomIconConfig?.size : size}
      />
      <View
        testID="topIconContainer"
        style={[styles.topIcon, topIconStyle, topIconPosition]}>
        <Icon
          {...topIconConfig}
          size={topIconConfig?.size != null ? topIconConfig?.size : size * 0.6}
        />
      </View>
    </TouchableOpacity>
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
