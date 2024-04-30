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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {getSelectionTypes} from './SelectionProvider';
import {SelectionFields} from './types';

function getSelectionTitle(modelName: string) {
  return modelName.split('.').pop();
}

export function formatTypes(): {[modelKey: string]: SelectionFields} {
  return Object.fromEntries(
    getSelectionTypes().map(({modelName, specificKey, selections}) => {
      const content: SelectionFields = {};

      Object.entries(selections).forEach(([_key, _select]) => {
        content[_key] = {
          list: _select.list,
          ...(Object.fromEntries(
            _select.list.map(({key: selectKey, value}) => [selectKey, value]),
          ) ?? {}),
        };
      });

      return [
        specificKey != null ? specificKey : getSelectionTitle(modelName),
        content,
      ];
    }),
  );
}

export function getRandomColor(Colors: ThemeColors, index: number): Color {
  const values = Object.values(Colors).filter(
    _color => typeof _color !== 'string',
  );

  return values[index % values.length];
}
