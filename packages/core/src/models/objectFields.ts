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

import {ObjectFields, schemaContructor} from '../app';

export const core_modelAPI: ObjectFields = {
  core_mobileMenu: schemaContructor.object({
    name: schemaContructor.string(),
    technicalName: schemaContructor.string(),
    authorizedRoles: schemaContructor.array().of(schemaContructor.subObject()),
  }),
  core_metaFile: schemaContructor.object({
    fileName: schemaContructor.string(),
    createdOn: schemaContructor.string(),
  }),
  core_printTemplate: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  core_user: schemaContructor.object({
    fullName: schemaContructor.string(),
  }),
  core_permissions: schemaContructor.object({
    name: schemaContructor.string(),
    object: schemaContructor.string(),
    canRead: schemaContructor.boolean(),
    canWrite: schemaContructor.boolean(),
    canCreate: schemaContructor.boolean(),
    canRemove: schemaContructor.boolean(),
  }),
  core_metaPermissionRule: schemaContructor.object({
    field: schemaContructor.string(),
    canRead: schemaContructor.boolean(),
    canWrite: schemaContructor.boolean(),
    metaPermission: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        object: schemaContructor.string(),
      }),
    ),
  }),
  core_module: schemaContructor.object({
    moduleVersion: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  core_app: schemaContructor.object({
    code: schemaContructor.string(),
    active: schemaContructor.boolean(),
  }),
  core_metaFilter: schemaContructor.object({
    filterView: schemaContructor.string(),
    name: schemaContructor.string(),
    title: schemaContructor.string(),
    filterCustom: schemaContructor.string(),
  }),
  core_currency: schemaContructor.object({
    numberOfDecimals: schemaContructor.number(),
  }),
};
