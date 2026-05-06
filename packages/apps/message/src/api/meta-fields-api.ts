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

import {axiosApiProvider} from '@axelor/aos-mobile-core';

export type FieldMeta = {
  title: string;
  selectionTitles?: Record<string, string>;
};

const cache = new Map<string, Promise<Record<string, FieldMeta>>>();

export function fetchModelFieldsMeta(
  modelName: string,
): Promise<Record<string, FieldMeta>> {
  if (cache.has(modelName)) {
    return cache.get(modelName)!;
  }

  const request = axiosApiProvider
    .get({url: `ws/meta/fields/${modelName}`})
    .then(res => {
      const fields: {
        name: string;
        title: string;
        selectionList?: {value: any; title: string}[];
      }[] = res?.data?.data?.fields ?? [];

      return Object.fromEntries(
        fields
          .filter(f => f.name && f.title)
          .map(f => {
            const meta: FieldMeta = {title: f.title};
            if (Array.isArray(f.selectionList) && f.selectionList.length > 0) {
              meta.selectionTitles = Object.fromEntries(
                f.selectionList
                  .filter(s => s.value != null && s.title)
                  .map(s => [String(s.value), s.title]),
              );
            }
            return [f.name, meta];
          }),
      );
    })
    .catch(() => ({}));

  cache.set(modelName, request);
  return request;
}
