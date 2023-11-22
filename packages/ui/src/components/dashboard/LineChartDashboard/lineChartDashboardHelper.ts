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

export const generateChartProps = (datasets, Color) => {
  const defaultColors = [
    Color.primaryColor.background,
    Color.infoColor.background,
    Color.errorColor.background,
    Color.progressColor.background,
    Color.secondaryColor.background,
  ];
  const props = {};

  datasets.forEach((dataset, index) => {
    const color = dataset[0]?.color || defaultColors[index];
    props[`dataPointsColor${index + 1}`] = color;
    props[`color${index + 1}`] = color;

    if (index === 0) {
      // eslint-disable-next-line dot-notation
      props['data'] = dataset;
    } else {
      props[`data${index + 1}`] = dataset;
    }
  });

  return props;
};
