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

import {useCallback, useEffect, useMemo} from 'react';
import {fetchObjectModelTypes} from '../../features/metaJsonFieldSlice';
import {useFieldsPermissions, useIsAdmin} from '../../permissions';
import {useDispatch, useSelector} from '../../redux/hooks';
import {getRoles} from '../../utils';

const NO_FIELD_NAMES: string[] = [];
const NO_ROLE_IDS: number[] = [];

export const useRoleFilter = (): number[] | null => {
  const {user} = useSelector(state => state.user);

  const isAdmin = useIsAdmin();

  return useMemo(() => {
    if (isAdmin) return null;

    const roles = getRoles(user);

    return Array.isArray(roles) ? roles.map(_role => _role.id) : NO_ROLE_IDS;
  }, [isAdmin, user]);
};

export const useFieldPermitter = ({modelName}: {modelName: string}) => {
  const dispatch = useDispatch();

  const {modelTypes} = useSelector(state => state.metaJsonField);

  const fieldNames: string[] = useMemo(
    () => modelTypes?.[modelName] ?? NO_FIELD_NAMES,
    [modelName, modelTypes],
  );

  const isAdmin = useIsAdmin();
  const permissions = useFieldsPermissions({modelName, fieldNames});

  useEffect(() => {
    if (modelTypes?.[modelName] == null) {
      dispatch((fetchObjectModelTypes as any)({modelName}));
    }
  }, [dispatch, modelName, modelTypes]);

  return useCallback(
    (_item: any) => {
      if (isAdmin) return _item;

      const {readonly} =
        permissions.find(({key}) => key === _item.modelField) ?? {};

      return {..._item, readonly};
    },
    [isAdmin, permissions],
  );
};
