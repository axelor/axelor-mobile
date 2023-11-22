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

export const transformToBarChartData = groupedData => {
  const colors = ['#177AD5', '#ED6665'];
  let finalData = [];

  groupedData.forEach(group => {
    group.values.forEach((value, index) => {
      finalData.push({
        value: value,
        label: index === 0 ? group.label : '',
        frontColor: colors[index % colors.length],
      });
    });
  });

  return finalData;
};
