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
import {useDispatch, useSelector} from '../redux/hooks';
import {
  ADMIN_CHECK_FIELD,
  ADMIN_GROUP,
  ADMIN_USER,
  ComponentPermission,
  DEFAULT_APPROVED_PERMISSION,
  FieldPermission,
  MetaPermission,
  ModelsPermission,
} from './type.helpers';
import {hasFieldPermission, hasPermission} from './format.helpers';
import {
  fetchAllMetaPermissionRules,
  fetchAllPermissions,
} from '../features/permissionSlice';

export const useIsAdmin = (): boolean => {
  const {user} = useSelector((state: any) => state.user);

  return useMemo(() => {
    if (user == null) {
      return false;
    }

    return (
      user[ADMIN_CHECK_FIELD] === ADMIN_USER ||
      user.group?.[ADMIN_CHECK_FIELD] === ADMIN_GROUP
    );
  }, [user]);
};

export const usePermissionsFetcher = (): (() => void) => {
  const dispatch = useDispatch();

  const {userId} = useSelector((state: any) => state.auth);

  return useCallback(() => {
    dispatch((fetchAllPermissions as any)({userId}));
    dispatch((fetchAllMetaPermissionRules as any)({userId}));
  }, [dispatch, userId]);
};

const usePerms = (): {permissions: ModelsPermission} => {
  const {modelsPermissions} = useSelector((state: any) => state.permission);

  return useMemo(() => ({permissions: modelsPermissions}), [modelsPermissions]);
};

const useFieldPerms = (): {permissions: MetaPermission} => {
  const {fieldsPermissions} = useSelector((state: any) => state.permission);

  return useMemo(() => {
    return {permissions: fieldsPermissions};
  }, [fieldsPermissions]);
};

export const usePermitted = ({
  modelName,
}: {
  modelName: string;
}): ComponentPermission => {
  const {permissions} = usePerms();
  const _isAdmin = useIsAdmin();

  return useMemo(() => {
    const modelPerms = _isAdmin
      ? DEFAULT_APPROVED_PERMISSION
      : hasPermission(permissions, modelName);

    return {
      hidden: !modelPerms?.canRead,
      readonly: !modelPerms?.canWrite,
      canCreate: modelPerms?.canCreate,
      canDelete: modelPerms?.canRemove,
    };
  }, [_isAdmin, modelName, permissions]);
};

export const useFieldPermitted = ({
  modelName,
  fieldName,
}: {
  modelName: string;
  fieldName: string;
}): FieldPermission => {
  const {hidden, readonly} = usePermitted({modelName});
  const {permissions: metaPermissions} = useFieldPerms();
  const _isAdmin = useIsAdmin();

  return useMemo(() => {
    const fieldPerms = _isAdmin
      ? DEFAULT_APPROVED_PERMISSION
      : hasFieldPermission(metaPermissions, modelName, fieldName);

    return {
      hidden: hidden || !fieldPerms?.canRead,
      readonly: readonly || !fieldPerms?.canWrite,
    };
  }, [_isAdmin, fieldName, hidden, metaPermissions, modelName, readonly]);
};

export const useFieldsPermissions = ({
  modelName,
  fieldNames,
}: {
  modelName: string;
  fieldNames: string[];
}): FieldPermission[] => {
  const {hidden, readonly} = usePermitted({modelName});
  const {permissions: metaPermissions} = useFieldPerms();
  const _isAdmin = useIsAdmin();

  return useMemo(() => {
    return fieldNames.map(_fieldName => {
      const fieldPerms = _isAdmin
        ? DEFAULT_APPROVED_PERMISSION
        : hasFieldPermission(metaPermissions, modelName, _fieldName);

      return {
        key: _fieldName,
        hidden: hidden || !fieldPerms?.canRead,
        readonly: readonly || !fieldPerms?.canWrite,
      };
    });
  }, [_isAdmin, fieldNames, hidden, metaPermissions, modelName, readonly]);
};
