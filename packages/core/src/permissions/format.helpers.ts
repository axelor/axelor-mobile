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

import {checkNullString} from '@axelor/aos-mobile-ui';
import {
  DEFAULT_PERMISSION,
  GLOBAL_MARKER,
  ModelsPermission,
  Permission,
} from './type.helpers';

export const formatPermissions = (permissionList: any[]): ModelsPermission => {
  if (!Array.isArray(permissionList) || permissionList.length === 0) {
    return {};
  }

  const permissions: ModelsPermission = {};

  permissionList.forEach(_permission => {
    permissions[_permission.object] = {
      canCreate: _permission.canCreate,
      canRead: _permission.canRead,
      canRemove: _permission.canRemove,
      canWrite: _permission.canWrite,
    };
  });

  return permissions;
};

export const hasPermission = (
  permissions: ModelsPermission,
  modelName: string,
): Permission => {
  if (permissions == null) {
    return DEFAULT_PERMISSION;
  }

  if (permissions[modelName] != null) {
    return permissions[modelName];
  }

  const modelParts = modelName.split('.');
  let foundPermission = false;
  let permissionModel = '';

  for (const part of modelParts) {
    permissionModel += (checkNullString(permissionModel) ? '' : '.') + part;

    if (permissions[permissionModel + GLOBAL_MARKER] != null) {
      permissionModel += GLOBAL_MARKER;
      foundPermission = true;
      break;
    }
  }

  if (foundPermission) {
    return permissions[permissionModel];
  }

  return DEFAULT_PERMISSION;
};
