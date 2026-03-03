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

export interface Permission {
  canRead: boolean;
  canWrite: boolean;
  canCreate?: boolean;
  canRemove?: boolean;
}

export interface ModelsPermission {
  [modelName: string]: Permission;
}

export interface MetaPermission {
  [modelName: string]: {perms: Permission; fieldName: string}[];
}

export interface FieldPermission {
  key?: string;
  hidden: boolean;
  readonly: boolean;
}

export interface ComponentPermission extends FieldPermission {
  canCreate: boolean;
  canDelete: boolean;
}

export const DEFAULT_DENIED_PERMISSION: Permission = {
  canCreate: false,
  canRead: false,
  canRemove: false,
  canWrite: false,
};

export const DEFAULT_APPROVED_PERMISSION: Permission = {
  canCreate: true,
  canRead: true,
  canRemove: true,
  canWrite: true,
};

export const GLOBAL_MARKER = '.*';

export const ADMIN_USER = 'admin';
export const ADMIN_GROUP = 'admins';
export const ADMIN_CHECK_FIELD = 'code';
