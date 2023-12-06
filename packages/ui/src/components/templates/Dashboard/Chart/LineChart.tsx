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
import {Dimensions, StyleSheet} from 'react-native';
import {LineChart as RNLineChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme/ThemeContext';
import {Card, Text} from '../../../atoms';
import {checkNullString} from '../../../../utils/strings';
import {Data} from '../dashboard.helper';
import {generateChartProps} from './chart.helper';

const MARGIN = 5;

interface LineChartProps {
  style?: any;
  datasets: Data[][];
  spacing?: number;
  widthGraph?: number;
  backgroundColor?: string;
  title?: string;
}

const LineChart = ({
  style,
  widthGraph,
  datasets,
  spacing,
  backgroundColor,
  title,
}: LineChartProps) => {
  const Colors = useThemeColor();

  const chartProps = generateChartProps(datasets, Colors);

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

    return Math.max(_containerWidth / datasets?.[0]?.length, 20);
  }, [_containerWidth, datasets, spacing]);

  return (
    <Card style={[styles.container, {width: _containerWidth}, style]}>
      <RNLineChart
        width={_graphWidth}
        yAxisTextStyle={{
          color: Colors.secondaryColor_dark.background,
        }}
        xAxisLabelTextStyle={{color: Colors.secondaryColor_dark.background}}
        initialSpacing={_spacing / 2}
        spacing={_spacing}
        endSpacing={5}
        isAnimated={true}
        backgroundColor={backgroundColor}
        {...chartProps}
      />
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default LineChart;
