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

const useBinaryFieldUri = (field: string, requireVersion: boolean) => {
  const [cache, setCache] = useState<Record<string, string | null>>({});
  const pending = useRef<Set<string>>(new Set());

  const resolve = useCallback(
    (key: string, ref: {model: string; id: number; version: number}) => {
      if (pending.current.has(key)) return;
      pending.current.add(key);
      getFileApi()
        .getBinaryImageUri({...ref, field})
        .then(uri => setCache(prev => ({...prev, [key]: uri})))
        .finally(() => pending.current.delete(key));
    },
    [field],
  );

  return useCallback(
    (id: number, version: number, model: string) => {
      if (id == null || model == null || (requireVersion && version == null)) {
        return undefined;
      }
      const key = `${model}:${id}:${version}:${field}`;
      if (key in cache) {
        return cache[key] != null ? {uri: cache[key]} : undefined;
      }
      resolve(key, {model, id, version});
      return undefined;
    },
    [cache, resolve, field, requireVersion],
  );
};

export const useBinaryImageUri = () => useBinaryFieldUri('image', false);

export const useBinaryPictureUri = () => useBinaryFieldUri('picture', true);
