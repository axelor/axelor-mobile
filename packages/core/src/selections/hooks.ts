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

import {useCallback, useMemo} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../i18n';
import {SelectionHelpers, SelectionFields, Selection} from './types';
import {formatTypes} from './format.helpers';

export const useTypes = (): {[modelKey: string]: SelectionFields} => {
  return useMemo(() => formatTypes(), []);
};

export function getTypes(): {[modelKey: string]: SelectionFields} {
  return formatTypes();
}

export const useTypeHelpers = (): SelectionHelpers => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const getItemTitle = useCallback(
    (selection: Selection, value: any) => {
      if (Array.isArray(selection?.list) && selection.list.length > 0) {
        return I18n.t(selection.list.find(_i => _i.value === value)?.title);
      }

      return null;
    },
    [I18n],
  );

  const getItemColor = useCallback(
    (selection: Selection, value: any) => {
      if (Array.isArray(selection?.list) && selection.list.length > 0) {
        const colorKey = selection.list.find(_i => _i.value === value)?.color;

        return Colors[colorKey] ?? Colors.primaryColor; // TODO: radnom
      }

      return null;
    },
    [Colors],
  );

  const getSelectionItems = useCallback(
    (selection: Selection) => {
      console.log(selection);
      return (
        selection?.list?.map(_i => ({
          title: getItemTitle(selection, _i.value),
          color: getItemColor(selection, _i.value),
          value: _i.value,
        })) ?? []
      );
    },
    [getItemColor, getItemTitle],
  );

  return useMemo(
    () => ({getItemColor, getItemTitle, getSelectionItems}),
    [getItemColor, getItemTitle, getSelectionItems],
  );
};
