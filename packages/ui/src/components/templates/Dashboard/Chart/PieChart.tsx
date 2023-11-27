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

import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PieChart as RNPieChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme/ThemeContext';
import {checkNullString} from '../../../../utils/strings';
import {Text} from '../../../atoms';
import Chart from '../chart';
import {Data} from '../dashboard.helper';

interface PieChartProps {
  styleContainer?: any;
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
  datasets,
  legend = false,
  title,
  donut = true,
  showGradient = false,
  sectionAutoFocus = true,
  radius = 90,
  innerRadius = 60,
  focusOnPress = true,
}: PieChartProps) => {
  const Color = useThemeColor();

  const [dataSet, setDataSet] = useState(datasets);

  useEffect(() => {
    const newDatasets = datasets.map((item, index) => {
      return item.color != null
        ? {...item}
        : {...item, color: Chart.getChartColor(index, Color).background};
    });
    setDataSet(newDatasets);
  }, [Color, datasets]);

  const renderLegendBorderColor = color => ({
    borderWidth: 5,
    marginVertical: 2,
    borderColor: color,
    backgroundColor: color,
  });

  return (
    <View style={[style.container, styleContainer]}>
      <RNPieChart
        data={dataSet}
        donut={donut}
        showGradient={showGradient}
        sectionAutoFocus={sectionAutoFocus}
        radius={radius}
        innerRadius={innerRadius}
        focusOnPress={focusOnPress}
        innerCircleColor={Color.backgroundColor}
      />
      {!checkNullString(title) && <Text style={style.title}>{title}</Text>}
      {legend && (
        <View style={style.legenContainer}>
          {dataSet.map((_data, index) => (
            <View key={index} style={style.itemLegendContainer}>
              <View style={renderLegendBorderColor(_data.color)} />
              <Text style={style.text}>{_data.label}</Text>
              <Text>{_data.value}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width:
      Dimensions.get('window').width > 500
        ? Dimensions.get('window').width / 4
        : Dimensions.get('window').width / 2,
  },
  legenContainer: {
    flexDirection: 'column',
  },
  itemLegendContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  text: {
    marginHorizontal: 5,
  },
  title: {alignSelf: 'center'},
});

export default PieChart;
