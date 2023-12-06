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

import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PieChart as RNPieChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme/ThemeContext';
import {checkNullString} from '../../../../utils/strings';
import {Text} from '../../../atoms';
import Chart from '../chart';
import {Data} from '../dashboard.helper';

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
  focusOnPress = false,
}: PieChartProps) => {
  const Colors = useThemeColor();

  const [dataSet, setDataSet] = useState(datasets);

  useEffect(() => {
    setDataSet(
      datasets.map((item, index) => {
        return item.color != null
          ? {...item}
          : {...item, color: Chart.getChartColor(index, Colors).background};
      }),
    );
  }, [Colors, datasets]);

  const _width = useMemo(() => {
    return widthGraph - MARGIN * 2;
  }, [widthGraph]);

  return (
    <View style={[styles.container, {width: _width}, styleContainer]}>
      <RNPieChart
        data={dataSet}
        donut={donut}
        showGradient={showGradient}
        sectionAutoFocus={sectionAutoFocus}
        radius={radius}
        innerRadius={innerRadius}
        focusOnPress={focusOnPress}
        innerCircleColor={Colors.backgroundColor}
      />
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      {legend && (
        <View style={styles.legendContainer}>
          {dataSet.map((_data, index) => (
            <View key={index} style={styles.itemLegendContainer}>
              <View
                style={[
                  styles.legendColor,
                  {
                    borderColor: _data.color,
                    backgroundColor: _data.color,
                  },
                ]}
              />
              <Text
                style={styles.legend}
                fontSize={15}>{`${_data.label} : ${_data.value}`}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'column',
  },
  itemLegendContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  legend: {
    marginHorizontal: 5,
  },
  legendColor: {
    borderWidth: 5,
    marginVertical: 2,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
});

export default PieChart;
