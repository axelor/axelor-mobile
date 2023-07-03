/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {useCallback} from 'react';
import {useSelector} from 'react-redux';

export const useMetafileUri = () => {
  const {baseUrl} = useSelector((state: any) => state.auth);

  return useCallback(
    (metafileId: number) =>
      metafileId
        ? {
            uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${metafileId}/content/download`,
          }
        : null,
    [baseUrl],
  );
};

export const useBinaryImageUri = () => {
  const {baseUrl} = useSelector((state: any) => state.auth);

  return useCallback(
    (id: number, version: number, model: string) =>
      id && version && model
        ? {
            uri: `${baseUrl}ws/${model}/${id}/image/download?v=${version}&parentId=${id}&parentModel=${model}&image=true`,
          }
        : null,
    [baseUrl],
  );
};
