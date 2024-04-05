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

import {useCallback, useContext, useEffect, useMemo} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {SelectionContext} from './SelectionContext';
import {fetchMetaConfig} from './api.helpers';
import {ModelSelection, SelectionItem, Selections, TypeConfig} from './types';
import {useTranslator} from '../i18n';

export const useTypes = (): {[modelKey: string]: Selections} => {
  const {types} = useContext(SelectionContext);
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return useMemo(() => {
    const result = {};

    types.forEach(({key, selections}) => {
      const content: Selections = {};

      Object.entries(selections).forEach(([_key, _select]) => {
        content[_key] = {
          ..._select,
          ...(Object.fromEntries(
            _select.list.map(({key: selectKey, value}) => [selectKey, value]),
          ) ?? {}),
          getItemTitle: value => {
            return I18n.t(_select.list.find(_i => _i === value).title);
          },
          getItemColor: value => {
            const colorKey = _select.list.find(_i => _i === value).color;

            return Colors[colorKey] != null ? Colors[colorKey] : colorKey;
          },
        };
      });

      result[key] = content;
    });

    return result;
  }, [Colors, I18n, types]);
};

export const useSelectionRegister = () => {
  const {registerTypes, moduleConfigs} = useContext(SelectionContext);

  const fetchConfigs = useCallback(
    async ({modelName, key, fields}: ModelSelection): Promise<TypeConfig> => {
      const metaFields = await fetchMetaConfig({modelName});
      const modelSelections: Selections = {};

      Object.keys(fields).forEach(name => {
        const selectConfig = metaFields.find(_i => _i.name === name);
        modelSelections[name] = {
          list: selectConfig.selectionList
            .map(
              _i =>
                ({
                  title: _i.title,
                  value: _i.value,
                  order: _i.order,
                  color: _i.color,
                } as SelectionItem),
            )
            .sort((a, b) =>
              a.order === b.order ? a.value - b.value : a.order - b.order,
            ),
        };
      });

      return {modelName, key, selections: modelSelections};
    },
    [],
  );

  useEffect(() => {
    moduleConfigs.forEach(config => {
      fetchConfigs(config).then(registerTypes);
    });
  }, [fetchConfigs, moduleConfigs, registerTypes]);
};
