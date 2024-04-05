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

import {ModuleSelections, TypeConfig} from './types';

export function formatSelections(types: ModuleSelections): TypeConfig[] {
  const result: TypeConfig[] = [];

  types.forEach(({modelName, key, fields}) => {
    const selections = {};

    Object.entries(fields).forEach(([_field, values]) => {
      selections[_field] = {list: values};
    });

    result.push({modelName, key, selections});
  });

  return result;
}

export function addModelSelections(
  existingTypes: TypeConfig[],
  type: TypeConfig,
): TypeConfig[] {
  if (existingTypes.find(_i => _i.modelName === type.modelName)) {
    return existingTypes.map(_type => {
      if (_type.modelName !== type.modelName) {
        return _type;
      }

      // TODO: manage override of selections from modules
      return {..._type, ...type};
    });
  }

  return [...existingTypes, type];
}
