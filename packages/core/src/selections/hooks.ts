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

import {useMemo} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {getSelectionTypes} from './SelectionProvider';
import {Selections} from './types';
import {useTranslator} from '../i18n';

function getSelectionTitle(modelName: string) {
  return modelName.split('.').pop();
}

export const useTypes = (): {[modelKey: string]: Selections} => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const types = useMemo(() => getSelectionTypes(), []);

  return useMemo(() => {
    const result = {};

    types.forEach(({modelName, selections}) => {
      const content: Selections = {};

      Object.entries(selections).forEach(([_key, _select]) => {
        const getItemTitle = value => {
          return I18n.t(_select.list.find(_i => _i === value).title);
        };

        const getItemColor = value => {
          const colorKey = _select.list.find(_i => _i === value).color;

          return Colors[colorKey] ?? Colors.primaryColor; // TODO: radnom
        };

        content[_key] = {
          ..._select,
          ...(Object.fromEntries(
            _select.list.map(({key: selectKey, value}) => [selectKey, value]),
          ) ?? {}),
          getItemTitle,
          getItemColor,
        };
      });

      result[getSelectionTitle(modelName)] = content;
    });

    return result;
  }, [Colors, I18n, types]);
};
