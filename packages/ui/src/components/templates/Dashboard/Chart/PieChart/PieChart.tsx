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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PieChart as RNPieChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../../theme';
import {checkNullString} from '../../../../../utils/strings';
import {Text} from '../../../../atoms';
import Chart from '../../chart-type';
import {Data} from '../../dashboard.helper';
import ChartLegend from './ChartLegend';
import LabelView from './LabelView';
import {MARGIN, getContainerMinWidth, getContainerWidth} from '../chart.helper';

interface PieChartProps {
  styleContainer?: any;
  widthGraph?: number;
  datasets: Data[];
  legend?: boolean;
  title?: string;
  donut?: boolean;
  showGradient?: boolean;
  sectionAutoFocus?: boolean;
  radius?: number;
  innerRadius?: number;
  focusOnPress?: boolean;
}

const PieChart = ({
  styleContainer,
  widthGraph,
  datasets,
  legend = false,
  title,
  donut = false,
  showGradient = false,
  sectionAutoFocus = true,
  radius = 90,
  innerRadius = 60,
  focusOnPress = true,
}: PieChartProps) => {
  const Colors = useThemeColor();

  const [dataSet, setDataSet] = useState(datasets);
  const [selectedItem, setSelectedItem] = useState({label: '', value: ''});

  useEffect(() => {
    setDataSet(
      datasets.map((item, index) => {
        return item.color != null
          ? {...item}
          : {...item, color: Chart.getChartColor(index, Colors).background};
      }),
    );
  }, [Colors, datasets]);

  const handlePress = useCallback(item => {
    setSelectedItem(current =>
      current.label === item.label
        ? {label: '', value: ''}
        : {label: item.label, value: item.value.toString()},
    );
  }, []);

  const containerWidth = useMemo(() => {
    return getContainerWidth(widthGraph);
  }, [widthGraph]);

  const containerMinWidth = useMemo(() => {
    return getContainerMinWidth();
  }, []);

  const styles = useMemo(() => {
    return getStyles(donut, focusOnPress);
  }, [donut, focusOnPress]);

  const renderLabelView = useCallback(() => {
    if (!focusOnPress) {
      return undefined;
    }

    return (
      <LabelView
        innerRadius={innerRadius}
        isCentered={donut}
        selectedItem={selectedItem}
      />
    );
  }, [donut, focusOnPress, innerRadius, selectedItem]);

  return (
    <View
      style={[
        styles.container,
        {width: containerWidth, minWidth: containerMinWidth},
        styleContainer,
      ]}
      testID="pieChartContainer">
      {!donut && renderLabelView()}
      <RNPieChart
        data={dataSet}
        donut={donut}
        showGradient={showGradient}
        sectionAutoFocus={sectionAutoFocus}
        radius={radius}
        innerRadius={innerRadius}
        focusOnPress={focusOnPress}
        innerCircleColor={Colors.backgroundColor}
        textColor={Colors.text}
        onPress={item => {
          handlePress(item);
        }}
        centerLabelComponent={donut ? renderLabelView : undefined}
      />
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      {legend && <ChartLegend dataSet={dataSet} />}
    </View>
  );
};

const getStyles = (donut: boolean, focusOnPress: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      margin: MARGIN,
      paddingTop: donut || !focusOnPress ? 0 : 35,
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default PieChart;
