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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PieChart as RNPieChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../../theme/ThemeContext';
import {checkNullString} from '../../../../../utils/strings';
import {Text} from '../../../../atoms';
import Chart from '../../chart-type';
import {Data} from '../../dashboard.helper';
import ChartLegend from './ChartLegend';
import LabelView from './LabelView';

const MARGIN = 5;

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

  const _width = useMemo(() => {
    return widthGraph - MARGIN * 2;
  }, [widthGraph]);

  const styles = useMemo(() => {
    return getStyles(donut, focusOnPress);
  }, [donut, focusOnPress]);

  return (
    <View style={[styles.container, {width: _width}, styleContainer]}>
      {!donut && focusOnPress && !checkNullString(selectedItem.label) && (
        <LabelView
          innerRadius={innerRadius}
          isCentered={false}
          selectedItem={selectedItem}
        />
      )}
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
        centerLabelComponent={
          donut && focusOnPress
            ? () => (
                <LabelView
                  innerRadius={innerRadius}
                  isCentered={true}
                  selectedItem={selectedItem}
                />
              )
            : undefined
        }
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
      minWidth:
        Dimensions.get('window').width > 500
          ? Dimensions.get('window').width / 4 - MARGIN * 2
          : Dimensions.get('window').width / 2 - MARGIN * 2,
      margin: MARGIN,
      paddingTop: donut || !focusOnPress ? 0 : 35,
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default PieChart;
