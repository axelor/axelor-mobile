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
import {StyleSheet, Dimensions} from 'react-native';
import {BarChart as RNBarChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme/ThemeContext';
import {Card, Text} from '../../../atoms';
import {checkNullString} from '../../../../utils/strings';
import {Data} from '../dashboard.helper';
import {mergeDataForGroupedBars, transformToBarChartData} from './chart.helper';

const MARGIN = 5;

interface BarCharProps {
  style?: any;
  widthGraph?: any;
  datasets: Data[][];
  spacing?: number;
  horizontal?: boolean;
  title?: string;
  rotateLabel?: boolean;
}

const BarChart = ({
  style,
  widthGraph = Dimensions.get('window').width * 0.6,
  datasets,
  spacing,
  horizontal = false,
  title,
  rotateLabel = false,
}: BarCharProps) => {
  const Colors = useThemeColor();
  const groupedData = mergeDataForGroupedBars(datasets);
  const barChartData = transformToBarChartData(
    groupedData,
    Colors,
    rotateLabel,
  );

  const styles = useMemo(() => {
    return getStyles(rotateLabel);
  }, [rotateLabel]);

  const _containerWidth = useMemo(() => {
    return widthGraph - MARGIN * 2;
  }, [widthGraph]);

  const _graphWidth = useMemo(() => {
    return _containerWidth - 50;
  }, [_containerWidth]);

  const _spacing = useMemo(() => {
    if (spacing != null) {
      return spacing;
    }

    return Math.max(_containerWidth / barChartData.length, 20);
  }, [_containerWidth, barChartData.length, spacing]);

  return (
    <Card style={[styles.container, {width: _containerWidth}, style]}>
      <RNBarChart
        frontColor={
          datasets[0]?.[0].color != null
            ? datasets[0]?.[0].color
            : Colors?.primaryColor?.background
        }
        data={barChartData}
        width={_graphWidth}
        isAnimated={true}
        barBorderRadius={4}
        barBorderTopRightRadius={7}
        barBorderTopLeftRadius={7}
        barBorderBottomRightRadius={0}
        barBorderBottomLeftRadius={0}
        initialSpacing={_spacing / 2}
        spacing={_spacing}
        endSpacing={5}
        horizontal={horizontal}
        disablePress={true}
        yAxisTextStyle={{color: Colors.secondaryColor_dark.background}}
        xAxisLabelTextStyle={{color: Colors.secondaryColor_dark.background}}
      />
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
    </Card>
  );
};

const getStyles = rotateLabel =>
  StyleSheet.create({
    container: {
      minWidth:
        Dimensions.get('window').width > 500
          ? Dimensions.get('window').width / 4 - MARGIN * 2
          : Dimensions.get('window').width / 2 - MARGIN * 2,
      margin: MARGIN,
      paddingHorizontal: 0,
      paddingRight: 5,
      paddingVertical: 10,
    },
    title: {
      marginTop: rotateLabel ? 30 : 10,
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default BarChart;
