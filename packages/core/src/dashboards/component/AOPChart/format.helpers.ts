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

interface Data {
  label: string;
  value: number;
}

interface AxesKeys {
  valueKey: string;
  labelKey: string;
}

export const getAxesKeys = (data: any): AxesKeys => {
  const sample = data[0];
  let valueKey: string = '';
  let labelKey: string = '';

  Object.keys(sample).forEach(key => {
    const value = sample[key];
    if (!isNaN(parseFloat(value)) && valueKey === '') {
      valueKey = key;
    } else if (labelKey === '') {
      labelKey = key;
    }
  });

  if (valueKey === '' || labelKey === '') {
    throw new Error(
      "Couldn't find appropriate keys for value and label in data.",
    );
  }

  return {valueKey, labelKey};
};

export const transformData = (data: any[]): Data[][] => {
  if (!Array.isArray(data) || data.length === 0) {
    return [[]];
  }

  const {valueKey, labelKey} = getAxesKeys(data);

  const transformed = data.map(item => ({
    label: item[labelKey],
    value: parseFloat(item[valueKey]) || 0,
  }));

  return [transformed];
};
