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

import {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {getFileApi} from '../apiProviders';

export const useMetafileUri = () => {
  const [cache, setCache] = useState<Record<number, string | null>>({});
  const pending = useRef<Set<number>>(new Set());

  const resolve = useCallback((id: number) => {
    if (pending.current.has(id)) return;
    pending.current.add(id);
    getFileApi()
      .getDisplayUri({id, fileName: '', isMetaFile: true})
      .then(uri => setCache(prev => ({...prev, [id]: uri})))
      .finally(() => pending.current.delete(id));
  }, []);

  return useCallback(
    (metafileId: number) => {
      if (metafileId == null) return undefined;
      if (metafileId in cache) {
        return cache[metafileId] != null ? {uri: cache[metafileId]} : undefined;
      }
      resolve(metafileId);
      return undefined;
    },
    [cache, resolve],
  );
};

export const useBinaryImageUri = () => {
  const {baseUrl} = useSelector((state: any) => state.auth);

  return useCallback(
    (id: number, version: number, model: string) =>
      id == null || model == null
        ? null
        : {
            uri: `${baseUrl}ws/rest/${model}/${id}/image/download?${
              version != null
                ? `v=${version}&parentId=${id}&parentModel=${model}&`
                : ''
            }image=true`,
          },
    [baseUrl],
  );
};

export const useBinaryPictureUri = () => {
  const {baseUrl} = useSelector((state: any) => state.auth);

  return useCallback(
    (id: number, version: number, model: string) =>
      id != null && version != null && model != null
        ? {
            uri: `${baseUrl}ws/rest/${model}/${id}/picture/download?v=${version}&parentId=${id}&parentModel=${model}&image=true`,
          }
        : null,
    [baseUrl],
  );
};
