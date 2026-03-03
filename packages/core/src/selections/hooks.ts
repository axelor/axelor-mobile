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

import {useCallback, useMemo} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../i18n';
import {
  SelectionHelpers,
  SelectionFields,
  Selection,
  ObjectSelectionItem,
} from './types';
import {formatTypes, getRandomColor} from './format.helpers';
import {getSelectionTypes, useTypeConfigs} from './SelectionProvider';

export const useTypes = (): {[modelKey: string]: SelectionFields} => {
  const {typeConfigs} = useTypeConfigs();

  return useMemo(() => formatTypes(typeConfigs), [typeConfigs]);
};

export function getTypes(): {[modelKey: string]: SelectionFields} {
  return formatTypes(getSelectionTypes());
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
        const item = selection.list
          .map((_i, idx) => ({content: _i, index: idx}))
          .find(({content: _i}) => _i.value === value);

        if (item == null) {
          return null;
        }

        const colorKey = item.content.color?.toLowerCase();

        return (
          Object.entries(Colors).find(([key, _]) => {
            return key.toLowerCase() === colorKey;
          })?.[1] ?? getRandomColor(Colors, item.index)
        );
      }

      return null;
    },
    [Colors],
  );

  const getSelectionItems = useCallback(
    (
      selection: Selection,
      selectedItem: {key: any; [key: string]: any}[] = [],
    ) => {
      return (
        selection?.list?.map(_i => ({
          title: getItemTitle(selection, _i.value),
          color: getItemColor(selection, _i.value),
          value: _i.value,
          key: _i.value,
          isActive:
            selectedItem.find(({key}) => key === _i.value) != null ?? false,
        })) ?? []
      );
    },
    [getItemColor, getItemTitle],
  );

  const getItemColorFromIndex = useCallback(
    (selectionList: ObjectSelectionItem[], value: ObjectSelectionItem) => {
      const idx = (selectionList ?? [])?.findIndex(({id}) => id === value?.id);

      if (idx !== -1) {
        return getRandomColor(Colors, idx);
      } else {
        return null;
      }
    },
    [Colors],
  );

  const getCustomSelectionItems = useCallback(
    (
      selectionList: ObjectSelectionItem[],
      titleField: string,
      selectedItem: {key: any; [key: string]: any}[] = [],
    ) => {
      return (
        (selectionList ?? [])?.map((_i, idx) => ({
          title: _i[titleField],
          color: getRandomColor(Colors, idx),
          value: _i.id,
          key: _i.id,
          isActive:
            selectedItem.find(({key}) => key === _i.id) != null ?? false,
        })) ?? []
      );
    },
    [Colors],
  );

  return useMemo(
    () => ({
      getItemColor,
      getItemTitle,
      getSelectionItems,
      getItemColorFromIndex,
      getCustomSelectionItems,
    }),
    [
      getCustomSelectionItems,
      getItemColor,
      getItemColorFromIndex,
      getItemTitle,
      getSelectionItems,
    ],
  );
};
