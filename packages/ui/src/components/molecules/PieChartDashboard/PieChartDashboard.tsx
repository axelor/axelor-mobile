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
import {StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';
import {PieChart} from 'react-native-gifted-charts';

interface Data {
  value: number;
  color?: string;
  label: string;
}

interface Dataset {
  data: Data[];
}

interface PieChartProps {
  datasets: Dataset[];
  legend: boolean;
}

const PieChartDashboard = ({datasets, legend}: PieChartProps) => {
  const renderLegendBorderColor = color => {
    return {
      borderWidth: 5,
      marginVertical: 2,
      borderColor: color,
      backgroundColor: color,
    };
  };
  return (
    <View style={style.container}>
      <PieChart
        data={datasets[0]?.data}
        donut={true}
        showGradient
        sectionAutoFocus
        radius={90}
        innerRadius={60}
      />
      {legend && (
        <View style={style.legenContainer}>
          {datasets[0]?.data?.map((_data, index) => {
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
