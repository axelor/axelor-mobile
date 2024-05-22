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

import React, {useMemo} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Card} from '../../../../atoms';
import {Data} from '../../dashboard.helper';
import {MARGIN, getContainerMinWidth, getContainerWidth} from '../chart.helper';
import IndicatorItem from './IndicatorItem';
import SimpleIndicator from './SimpleIndicator';
import ChartTitle from './ChartTitle';

interface IndicatorChartProps {
  style?: any;
  widthGraph?: number;
  datasets: Data[];
  title?: string;
  hideCardBackground?: boolean;
}

const IndicatorChart = ({
  style,
  widthGraph = Dimensions.get('window').width,
  datasets,
  title,
  hideCardBackground = false,
}: IndicatorChartProps) => {
  const Container = useMemo(
    () => (hideCardBackground ? View : Card),
    [hideCardBackground],
  );

  const containerWidth = useMemo(() => {
    return getContainerWidth(widthGraph);
  }, [widthGraph]);

  const containerMinWidth = useMemo(() => {
    return getContainerMinWidth();
  }, []);

  const renderIndicator = useMemo(() => {
    if (datasets?.length === 1) {
      const data = datasets[0];
      return (
        <>
          <SimpleIndicator
            title={data.title}
            icon={data.icon}
            color={data.color}
            unit={data.unit}
            value={data.value}
          />
          <ChartTitle title={title} align />
        </>
      );
    }

    return (
      <>
        <ChartTitle title={title} style={styles.groupTitle} />
        {datasets.map((data, idx) => (
          <IndicatorItem
            key={idx}
            title={data.title}
            icon={data.icon}
            color={data.color}
            unit={data.unit}
            value={data.value}
          />
        ))}
      </>
    );
  }, [datasets, title]);

  if (!Array.isArray(datasets) || datasets.length === 0) {
    return null;
  }

  return (
    <Container
      style={[
        styles.container,
        {width: containerWidth, minWidth: containerMinWidth},
        style,
      ]}>
      {renderIndicator}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: MARGIN,
    paddingRight: 5,
    paddingLeft: 5,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  groupTitle: {
    marginHorizontal: 24,
    marginBottom: 10,
  },
});

export default IndicatorChart;
