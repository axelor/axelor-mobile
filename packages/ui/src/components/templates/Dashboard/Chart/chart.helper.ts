/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import {Dimensions} from 'react-native';
import {ThemeColors} from '../../../../theme';
import Chart from '../chart-type';
import {Data} from '../dashboard.helper';

export const MARGIN = 5;

const mergeDataForGroupedBars = (datasets: any[][]): any[] => {
  const mergedData = [];

  datasets.forEach(dataset => {
    dataset.forEach(data => {
      const {label, value} = data;

      const groupIndex = mergedData.findIndex(group => group.label === label);

      if (groupIndex === -1) {
        mergedData.push({
          label: label,
          valueList: [value],
        });
      } else {
        mergedData[groupIndex].valueList.push(value);
      }
    });
  });

  return mergedData;
};

const transformToBarChartData = (
  groupedData: any[][],
  rotateLabel: boolean,
  spacing: number,
  Colors: ThemeColors,
): any[] => {
  let finalData = [];

  groupedData.forEach((group: any) => {
    group.valueList.forEach((value, index) => {
      finalData.push({
        value: value,
        label: index === 0 ? group.label : '',
        frontColor: Chart.getChartColor(index, Colors).background,
        spacing: index === group.valueList.length - 1 ? 24 : 2,
        labelTextStyle: getLabelStyle(rotateLabel, spacing, Colors, true),
      });
    });
  });

  return finalData;
};

export const initBarData = (
  datasets: Data[][],
  rotateLabel: boolean,
  spacing: number,
  Colors: ThemeColors,
): any => {
  if (!Array.isArray(datasets)) {
    return {};
  }

  return transformToBarChartData(
    mergeDataForGroupedBars(datasets),
    rotateLabel,
    spacing,
    Colors,
  );
};

const getLabelStyle = (
  rotateLabel: boolean,
  spacing: number,
  Colors: ThemeColors,
  isBar: boolean = false,
): any => {
  return {
    width: rotateLabel ? 60 : spacing,
    color: Colors.secondaryColor_dark.background,
    top: (rotateLabel ? 10 : 0) + (isBar ? 2 : 0),
    left: 5,
    transform: rotateLabel ? [{rotate: '45deg'}] : [],
    fontSize: 13,
  };
};

export const addLabelTextStyleToDataset = (
  datasets: Data[][],
  rotateLabel: boolean,
  spacing: number,
  Colors: ThemeColors,
): Data[][] => {
  return datasets.map(dataArray =>
    dataArray.map(data => ({
      ...data,
      labelTextStyle: getLabelStyle(rotateLabel, spacing, Colors),
    })),
  );
};

const generateLineChartProps = (
  datasets: Data[][],
  Colors: ThemeColors,
): any => {
  const props: any = {};

  datasets.forEach((dataset, index) => {
    const color =
      dataset[0]?.color || Chart.getChartColor(index, Colors).background;
    props[`dataPointsColor${index + 1}`] = color;
    props[`color${index + 1}`] = color;

    if (index === 0) {
      props.data = dataset;
    } else {
      props[`data${index + 1}`] = dataset;
    }
  });

  return props;
};

export const initLineData = (
  datasets: Data[][],
  rotateLabel: boolean,
  spacing: number,
  Colors: ThemeColors,
): any => {
  if (!Array.isArray(datasets)) {
    return {};
  }

  return generateLineChartProps(
    addLabelTextStyleToDataset(datasets, rotateLabel, spacing, Colors),
    Colors,
  );
};

export const getContainerMinWidth = () => {
  const screenWidth = Dimensions.get('window').width;
  if (screenWidth > 500) {
    return screenWidth / 4 - MARGIN * 2;
  } else {
    return screenWidth / 2 - MARGIN * 2;
  }
};

export const getContainerWidth = (widthGraph: number) => {
  return widthGraph - MARGIN * 2;
};
