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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from '../redux/hooks';
import {
  ComponentPermission,
  DEFAULT_PERMISSION,
  ModelsPermission,
  Permission,
} from './type.helpers';
import {formatPermissions, hasPermission} from './format.helpers';
import {areObjectsEquals} from '../utils';
import {fetchAllPermissions} from '../features/permissionSlice';

export const usePermissionsFetcher = (): (() => void) => {
  const dispatch = useDispatch();

  const {userId} = useSelector((state: any) => state.auth);

  return useCallback(() => {
    dispatch((fetchAllPermissions as any)({userId}));
  }, [dispatch, userId]);
};

const usePerms = (): {permissions: ModelsPermission} => {
  const {modelsPermissions} = useSelector((state: any) => state.permission);

  return useMemo(
    () => ({permissions: formatPermissions(modelsPermissions)}),
    [modelsPermissions],
  );
};

export const usePermitted = ({modelName}): ComponentPermission => {
  const {permissions} = usePerms();

  const [modelPerms, setModelPerms] = useState<Permission>(DEFAULT_PERMISSION);

  useEffect(() => {
    setModelPerms(_current => {
      const _perms = hasPermission(permissions, modelName);

      if (areObjectsEquals(_perms, _current)) {
        return _current;
      }

      return _perms;
    });
  }, [modelName, permissions]);

  return useMemo(() => {
    return {
      hidden: !modelPerms?.canRead,
      readonly: !modelPerms?.canWrite,
      canCreate: modelPerms?.canCreate,
      canDelete: modelPerms?.canRemove,
    };
  }, [modelPerms]);
};
