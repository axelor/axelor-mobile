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

import {ObjectFields, schemaContructor} from '@axelor/aos-mobile-core';

export const project_modelAPI: ObjectFields = {
  project_project: schemaContructor.object({
    projectStatus: schemaContructor.subObject('name'),
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    clientPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        picture: schemaContructor.subObject(),
        jobTitleFunction: schemaContructor.subObject(),
        name: schemaContructor.string(),
      }),
    ),
    contactPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        picture: schemaContructor.subObject(),
        jobTitleFunction: schemaContructor.subObject(),
        name: schemaContructor.string(),
      }),
    ),
    company: schemaContructor.subObject('name'),
    assignedTo: schemaContructor.subObject('fullName'),
    parentProject: schemaContructor.subObject('fullName'),
    isBusinessProject: schemaContructor.boolean(),
    fromDate: schemaContructor.string(),
    toDate: schemaContructor.string(),
    siteSet: schemaContructor.array().of(schemaContructor.subObject()),
    description: schemaContructor.string(),
    team: schemaContructor.subObject(),
    membersUserSet: schemaContructor.array().of(schemaContructor.subObject()),
    toInvoice: schemaContructor.boolean(),
    isInvoicingExpenses: schemaContructor.boolean(),
    isInvoicingPurchases: schemaContructor.boolean(),
    currency: schemaContructor.subObject(),
    priceList: schemaContructor.subObject(),
  }),
  project_projectStatus: schemaContructor.object({
    name: schemaContructor.string(),
    isCompleted: schemaContructor.boolean(),
  }),
};
