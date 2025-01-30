/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
    activeCompany: schemaContructor.subObject(),
    'activeCompany.currency': schemaContructor.subObject(),
    'activeCompany.currency.symbol': schemaContructor.string(),
    activeTeam: schemaContructor.subObject(),
    workshopStockLocation: schemaContructor.subObject(),
    roles: schemaContructor.array(),
    group: schemaContructor.subObject(),
    employee: schemaContructor.subObject(),
    language: schemaContructor.string(),
    todayDateT: schemaContructor.string(),
  }),
};
