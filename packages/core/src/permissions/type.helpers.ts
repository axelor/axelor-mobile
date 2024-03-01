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

export interface Permission {
  canRead: boolean;
  canWrite: boolean;
  canCreate: boolean;
  canRemove: boolean;
}

export interface ComponentPermission {
  hidden: boolean;
  readonly: boolean;
  canCreate: boolean;
  canDelete: boolean;
}

export interface ModelsPermission {
  [modelName: string]: Permission;
}

export type RightType = 'create' | 'read' | 'update' | 'delete';

export const DEFAULT_PERMISSION: Permission = {
  canCreate: false,
  canRead: false,
  canRemove: false,
  canWrite: false,
};

export const GLOBAL_MARKER = '.*';
