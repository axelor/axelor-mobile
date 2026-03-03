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
import {Color, useThemeColor} from '../../../theme';

interface Group {
  value: number;
  color: Color;
}

interface DistributionBarProps {
  distribution: Group[];
  total?: number;
  height?: number;
  style?: any;
}

const DistributionBar = ({
  distribution,
  total = 100,
  height = 30,
  style,
}: DistributionBarProps) => {
  const Colors = useThemeColor();

  const renderGroups = () => {
    return distribution.map((group, index) => {
      const percentWidth = total !== 0 ? (group.value / total) * 100 : 0;
      const isFirstItem = index === 0;
      const isLastItem = index === distribution.length - 1;

      const groupStyles = getGroupStyles(
        percentWidth,
        height,
        group.color.background,
      );

      return (
        <View
          style={[
            groupStyles.group,
            isFirstItem && groupStyles.borderLeftRadius,
            isLastItem && groupStyles.borderRightRadius,
          ]}
          key={index}
          testID={`distributionBarGroup-idx${index}`}
        />
      );
    });
  };

  const styles = useMemo(
    () => getStyles(height, Colors.secondaryColor.background),
    [Colors, height],
  );

  return (
    <View style={[styles.container, style]} testID="distributionBarContainer">
      {renderGroups()}
    </View>
  );
};

const getGroupStyles = (percentWidth: number, height: number, color: string) =>
  StyleSheet.create({
    group: {
      width: `${percentWidth}%`,
      height: height - 2,
      backgroundColor: color,
    },
    borderLeftRadius: {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },
    borderRightRadius: {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
  });

const getStyles = (height: number, borderColor: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: height,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: borderColor,
    },
  });

export default DistributionBar;
