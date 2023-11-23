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

import Chart from '../types/chart';

export const mergeDataForGroupedBars = datasets => {
  const mergedData = [];

  datasets.forEach(dataset => {
    dataset.forEach(data => {
      const {label, value} = data;

      const groupIndex = mergedData.findIndex(group => group.label === label);

      if (groupIndex === -1) {
        mergedData.push({
          label: label,
          values: [value],
        });
      } else {
        mergedData[groupIndex].values.push(value);
      }
    });
  });

  return mergedData;
};

export const transformToBarChartData = (groupedData, Colors) => {
  let finalData = [];

  groupedData.forEach(group => {
    const labelWidth = 20 * group.values.length;

    group.values.forEach((value, index) => {
      finalData.push({
        value: value,
        label: index === 0 ? group.label : '',
        frontColor: Chart.getChartColor(index, Colors).background,
        labelWidth: labelWidth,
        spacing: index === group.values.length - 1 ? 24 : 2,
      });
    });
  });

  return finalData;
};
