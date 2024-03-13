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
import {StyleSheet, Dimensions, View} from 'react-native';
import {BarChart as RNBarChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme';
import {Card, Text} from '../../../atoms';
import {checkNullString} from '../../../../utils';
import {Data} from '../dashboard.helper';
import {initBarData} from './chart.helper';

const MARGIN = 5;

interface BarCharProps {
  style?: any;
  widthGraph?: any;
  datasets: Data[][];
  spacing?: number;
  horizontal?: boolean;
  title?: string;
  rotateLabel?: boolean;
  hideCardBackground?: boolean;
}

const BarChart = ({
  style,
  widthGraph = Dimensions.get('window').width * 0.6,
  datasets,
  spacing,
  horizontal = false,
  title,
  rotateLabel = true,
  hideCardBackground = false,
}: BarCharProps) => {
  const Colors = useThemeColor();

  const barChartData = useMemo(() => {
    return initBarData(datasets, rotateLabel, spacing, Colors);
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

    return Math.max(_containerWidth / barChartData.length, 20);
  }, [_containerWidth, barChartData.length, spacing]);

  const renderRNBarChart = () => {
    return (
      <>
        <RNBarChart
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
          endSpacing={_spacing}
          horizontal={horizontal}
          disablePress={true}
          yAxisTextStyle={{color: Colors.secondaryColor_dark.background}}
          xAxisLabelTextStyle={{color: Colors.secondaryColor_dark.background}}
        />
        {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      </>
    );
  };

  if (hideCardBackground) {
    return (
      <View style={[styles.container, {width: _containerWidth}, style]}>
        {renderRNBarChart()}
      </View>
    );
  }

  return (
    <Card style={[styles.container, {width: _containerWidth}, style]}>
      {renderRNBarChart()}
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
      overflow: 'hidden',
    },
    title: {
      marginTop: rotateLabel ? 30 : 0,
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default BarChart;
