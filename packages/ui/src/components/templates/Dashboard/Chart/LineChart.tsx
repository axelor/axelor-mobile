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
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart as RNLineChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme';
import {Card, Text} from '../../../atoms';
import {checkNullString} from '../../../../utils';
import {Data} from '../dashboard.helper';
import {initLineData} from './chart.helper';

const MARGIN = 5;

interface LineChartProps {
  style?: any;
  datasets: Data[][];
  spacing?: number;
  widthGraph?: number;
  backgroundColor?: string;
  rotateLabel?: boolean;
  title?: string;
  hideCardBackground?: boolean;
}

const LineChart = ({
  style,
  widthGraph,
  datasets,
  spacing,
  backgroundColor,
  title,
  rotateLabel = true,
  hideCardBackground = false,
}: LineChartProps) => {
  const Colors = useThemeColor();

  const chartProps = useMemo(() => {
    return initLineData(datasets, rotateLabel, spacing, Colors);
  }, [Colors, datasets, rotateLabel, spacing]);

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

    return Math.max(_containerWidth / datasets?.[0]?.length, 20);
  }, [_containerWidth, datasets, spacing]);

  const Container = hideCardBackground ? View : Card;

  return (
    <Container style={[styles.container, {width: _containerWidth}, style]}>
      <RNLineChart
        width={_graphWidth}
        yAxisTextStyle={{
          color: Colors.secondaryColor_dark.background,
        }}
        xAxisLabelTextStyle={{color: Colors.secondaryColor_dark.background}}
        initialSpacing={_spacing / 2}
        spacing={_spacing}
        endSpacing={_spacing}
        isAnimated={true}
        backgroundColor={backgroundColor}
        {...chartProps}
      />
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
    </Container>
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
      overflow: 'hidden',
    },
    title: {
      marginTop: rotateLabel ? 30 : 0,
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default LineChart;
