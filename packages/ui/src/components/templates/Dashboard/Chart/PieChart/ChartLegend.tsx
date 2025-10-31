/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Text} from '../../../../atoms';
import {Data} from '../../dashboard.helper';

interface ChartLegendProps {
  dataSet?: Data[];
}

const ChartLegend = ({dataSet}: ChartLegendProps) => {
  return (
    <View style={styles.legendContainer} testID="pieChartLegendContainer">
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
          <Text style={styles.legend} fontSize={15}>
            {`${_data.label} : ${_data.value}`}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'column',
  },
  itemLegendContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  legendColor: {
    borderWidth: 5,
    marginVertical: 2,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  legend: {
    marginHorizontal: 5,
  },
});

export default ChartLegend;
