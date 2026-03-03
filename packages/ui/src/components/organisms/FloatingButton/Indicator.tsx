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
import {useMemo} from 'react';
import {Color, useThemeColor} from '../../../theme';
import {StyleSheet, View} from 'react-native';

const Indicator = ({
  style,
  show = false,
  size = 10,
  color,
}: {
  style?: any;
  show: boolean;
  size?: number;
  color?: Color;
}) => {
  const Colors = useThemeColor();

  const indicatorColor = useMemo(
    () => color ?? Colors.primaryColor,
    [Colors.primaryColor, color],
  );

  if (!show) {
    return null;
  }

  return (
    <View
      testID="floatingButtonIndicator"
      style={[
        styles.indicator,
        {
          borderColor: indicatorColor.background,
          backgroundColor: indicatorColor.background_light,
          width: size,
          height: size,
          borderRadius: size,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderWidth: 1,
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

export default Indicator;
