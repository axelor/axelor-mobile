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
import {PieChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Text} from '../../atoms';
import Chart from '../../../types/chart';

interface Data {
  value: number;
  color?: string;
  label: string;
}

interface PieChartProps {
  styleContainer?: any;
  datasets: Data[][];
  legend?: boolean;
}

const PieChartDashboard = ({
  styleContainer,
  datasets,
  legend = false,
}: PieChartProps) => {
  const Color = useThemeColor();

  const [dataSet, setDataSet] = useState(datasets[0]);

  useEffect(() => {
    const newDatasets = datasets[0]?.map((item, index) => {
      if (item?.color == null) {
        return {...item, color: Chart.getChartColor(index, Color).background};
      }
      return {...item};
    });
    setDataSet(newDatasets);
  }, [Color, datasets]);

  const renderLegendBorderColor = color => {
    return {
      borderWidth: 5,
      marginVertical: 2,
      borderColor: color,
      backgroundColor: color,
    };
  };
  return (
    <View style={[style.container, styleContainer]}>
      <PieChart
        data={dataSet}
        donut={true}
        showGradient
        sectionAutoFocus
        radius={90}
        innerRadius={60}
      />
      {legend && (
        <View style={style.legenContainer}>
          {dataSet?.map((_data, index) => {
            return (
              <View key={index} style={style.itemLegendContainer}>
                <View style={renderLegendBorderColor(_data?.color)} />
                <Text style={style.text}>{_data?.label}</Text>
                <Text>{_data?.value}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
});

export default PieChartDashboard;
