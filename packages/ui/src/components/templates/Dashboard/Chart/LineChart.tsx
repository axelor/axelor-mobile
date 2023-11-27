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
import {View, StyleSheet, Dimensions} from 'react-native';
import {LineChart as RNLineChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme/ThemeContext';
import {Card, Text} from '../../../atoms';
import {checkNullString} from '../../../../utils/strings';
import {Data} from '../dashboard.helper';
import {generateChartProps} from './chart-helper';

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
  spacing = 50,
  backgroundColor,
  title,
}: LineChartProps) => {
  const Color = useThemeColor();

  const chartProps = generateChartProps(datasets, Color);

  return (
    <Card style={[styles.container, style]}>
      <View>
        <RNLineChart
          width={widthGraph}
          yAxisTextStyle={{color: Color.secondaryColor_dark.background}}
          xAxisLabelTextStyle={{color: Color.secondaryColor_dark.background}}
          spacing={spacing}
          isAnimated={true}
          backgroundColor={backgroundColor}
          {...chartProps}
          endSpacing={5}
        />
        {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width:
      Dimensions.get('window').width > 500
        ? Dimensions.get('window').width / 4
        : Dimensions.get('window').width / 2,
    marginVertical: 5,
  },
  title: {alignSelf: 'center'},
});

export default LineChart;
