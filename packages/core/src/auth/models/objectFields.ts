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

import {ObjectFields, schemaContructor} from '../../app';

export const auth_modelAPI: ObjectFields = {
  auth_company: schemaContructor.object({
    code: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  auth_user: schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    activeCompany: schemaContructor.subObject().concat(
      schemaContructor.object({
        currency: schemaContructor.subObject('symbol'),
      }),
    ),
    localization: schemaContructor.subObject().concat(
      schemaContructor.object({
        code: schemaContructor.string(),
        language: schemaContructor.subObject('code'),
      }),
    ),
    activeTeam: schemaContructor.subObject(),
    workshopStockLocation: schemaContructor.subObject(),
    roles: schemaContructor.array(),
    group: schemaContructor.subObject().concat(
      schemaContructor.object({
        roles: schemaContructor.array(),
      }),
    ),
    theme: schemaContructor.string(),
    employee: schemaContructor.subObject(),
    todayDateT: schemaContructor.string(),
    code: schemaContructor.string(),
    companySet: schemaContructor.subObject(),
  }),
  auth_localization: schemaContructor.object({
    code: schemaContructor.string(),
    name: schemaContructor.string(),
    language: schemaContructor.subObject('code'),
  }),
  auth_metaTheme: schemaContructor.object({
    name: schemaContructor.string(),
    label: schemaContructor.string(),
    content: schemaContructor.string(),
  }),
};
