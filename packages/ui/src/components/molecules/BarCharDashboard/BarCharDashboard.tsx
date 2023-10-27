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
import {BarChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card} from '../../atoms';

interface Data {
  value: number;
  color?: string;
  label: string;
}

interface Dataset {
  data: Data[];
}

interface BarCharDashboardProps {
  datasets: Dataset[];
  spacing?: number;
}

const BarCharDashboard = ({datasets, spacing = 20}: BarCharDashboardProps) => {
  const Color = useThemeColor();

  return (
    <Card style={styles.container}>
      <View>
        <BarChart
          key={'xyz'}
          frontColor={
            datasets[0]?.data[0].color != null
              ? datasets[0]?.data[0].color
              : Color?.primaryColor?.background
          }
          data={datasets[0]?.data}
          //width={Dimensions.get('window').width * 0.6}
          spacing={spacing}
          isAnimated={true}
          initialSpacing={20}
          endSpacing={-60}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginHorizontal: 30,
    marginVertical: 5,
    width:
      Dimensions.get('window').width > 500
        ? Dimensions.get('window').width / 4
        : Dimensions.get('window').width / 2,
    //backgroundColor: 'red',
  },
});

export default BarCharDashboard;
