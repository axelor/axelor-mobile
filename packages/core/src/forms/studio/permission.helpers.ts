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
import {useDispatch, useSelector} from 'react-redux';
import {fetchObjectModelTypes} from '../../features/metaJsonFieldSlice';
import {useFieldsPermissions, useIsAdmin} from '../../permissions';
import {getRoles} from '../../utils';

const isFieldHidden = (authorizedRoles, userRoles) => {
  if (!Array.isArray(authorizedRoles) || authorizedRoles.length === 0) {
    return false;
  } else if (!Array.isArray(userRoles) || userRoles.length === 0) {
    return true;
  } else {
    return authorizedRoles.every(
      _role => userRoles.find(({id: roleId}) => roleId === _role.id) == null,
    );
  }
};

export const useFieldPermitter = ({modelName}: {modelName: string}) => {
  const dispatch = useDispatch();

  const {modelTypes} = useSelector((state: any) => state.metaJsonField);
  const {user} = useSelector((state: any) => state.user);

  const isAdmin = useIsAdmin();
  const permissions = useFieldsPermissions({
    modelName,
    fieldNames: modelTypes ?? [],
  });

  useEffect(() => {
    dispatch((fetchObjectModelTypes as any)({modelName}));
  }, [dispatch, modelName]);

  const roles = useMemo(() => getRoles(user), [user]);

  return useCallback(
    _item => {
      if (isAdmin) {
        return _item;
      }

      const {readonly} =
        permissions.find(({key}) => key === _item.modelField) ?? {};
      const isHidden = isFieldHidden(_item.roles, roles);

      return {..._item, readonly, hidden: isHidden};
    },
    [isAdmin, permissions, roles],
  );
};
