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
import {LineChart} from 'react-native-gifted-charts';
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

interface LineChartDashboardProps {
  datasets: Dataset[];
  spacing?: number;
  widthGraph?: number;
  backgroundColor?: string;
}

const LineChartDashboard = ({
  datasets,
  spacing = 50,
  backgroundColor,
}: LineChartDashboardProps) => {
  const Color = useThemeColor();

  return (
    <Card style={styles.container}>
      <View>
        <LineChart
          data={datasets[0]?.data}
          data2={datasets[1]?.data}
          spacing={spacing}
          width={Dimensions.get('window').width * 0.6}
          isAnimated={true}
          backgroundColor={backgroundColor}
          dataPointsColor1={
            datasets[0]?.data[0]?.color != null
              ? datasets[0]?.data[0]?.color
              : Color.primaryColor.background
          }
          color1={
            datasets[0]?.data[0]?.color != null
              ? datasets[0]?.data[0]?.color
              : Color.primaryColor.background
          }
          dataPointsColor2={
            datasets[1]?.data[0]?.color != null
              ? datasets[1]?.data[0]?.color
              : Color.infoColor.background
          }
          color2={
            datasets[1]?.data[0]?.color != null
              ? datasets[1]?.data[0]?.color
              : Color.infoColor.background
          }
          dataPointsColor3={
            datasets[2]?.data[0]?.color != null
              ? datasets[2]?.data[0]?.color
              : Color.errorColor.background
          }
          color3={
            datasets[2]?.data[0]?.color != null
              ? datasets[2]?.data[0]?.color
              : Color.errorColor.background
          }
          dataPointsColor4={
            datasets[3]?.data[0]?.color != null
              ? datasets[3]?.data[0]?.color
              : Color.progressColor.background
          }
          color4={
            datasets[3]?.data[0]?.color != null
              ? datasets[3]?.data[0]?.color
              : Color.progressColor.background
          }
          dataPointsColor5={
            datasets[4]?.data[0]?.color != null
              ? datasets[4]?.data[0]?.color
              : Color.secondaryColor.background
          }
          color5={
            datasets[4]?.data[0]?.color != null
              ? datasets[4]?.data[0]?.color
              : Color.secondaryColor.background
          }
          endSpacing={5}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 30, marginVertical: 5},
});

export default LineChartDashboard;
