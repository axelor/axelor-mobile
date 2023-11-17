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
import {Card, Text} from '../../atoms';
import {checkNullString} from '../../../utils/strings';

interface Data {
  value: number;
  color?: string;
  label: string;
}

interface BarCharDashboardProps {
  style?: any;
  widthGraph?: any;
  datasets: Data[][];
  spacing?: number;
  horizontal?: boolean;
  title?: string;
}

const BarChartDashboard = ({
  style,
  widthGraph = Dimensions.get('window').width * 0.6,
  datasets,
  spacing = 20,
  horizontal = false,
  title,
}: BarCharDashboardProps) => {
  const Color = useThemeColor();

  return (
    <Card style={[styles.container, style]}>
      <View>
        <BarChart
          frontColor={
            datasets[0]?.[0].color != null
              ? datasets[0]?.[0].color
              : Color?.primaryColor?.background
          }
          data={datasets[0]}
          width={widthGraph}
          spacing={spacing}
          isAnimated={true}
          barBorderRadius={4}
          initialSpacing={20}
          horizontal={horizontal}
          yAxisTextStyle={{color: Color.secondaryColor_dark.background}}
          xAxisLabelTextStyle={{color: Color.secondaryColor_dark.background}}
        />
      </View>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  title: {alignSelf: 'center'},
});

export default BarChartDashboard;
