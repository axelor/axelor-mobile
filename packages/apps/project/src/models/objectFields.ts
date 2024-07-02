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
    createdOn: schemaContructor.string(),
    projectStatus: schemaContructor.subObject('name'),
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    clientPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        picture: schemaContructor.subObject(),
        name: schemaContructor.string(),
        partnerSeq: schemaContructor.string(),
        mainAddress: schemaContructor.subObject('fullName').concat(
          schemaContructor.object({
            addressL4: schemaContructor.string(),
            addressL7Country: schemaContructor.subObject('symbol'),
            city: schemaContructor.subObject('name'),
            zip: schemaContructor.string(),
          }),
        ),
      }),
    ),
    contactPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        picture: schemaContructor.subObject(),
        jobTitleFunction: schemaContructor.subObject('name'),
        name: schemaContructor.string(),
        simpleFullName: schemaContructor.string(),
        fixedPhone: schemaContructor.string(),
        mobilePhone: schemaContructor.string(),
        partnerSeq: schemaContructor.string(),
      }),
    ),
    company: schemaContructor.subObject('name'),
    assignedTo: schemaContructor.subObject('fullName'),
    parentProject: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
        name: schemaContructor.string(),
        code: schemaContructor.string(),
        company: schemaContructor.subObject(),
        assignedTo: schemaContructor.subObject(),
        projectStatus: schemaContructor.subObject(),
        parentProject: schemaContructor.subObject('fullName'),
        clientPartner: schemaContructor.subObject().concat(
          schemaContructor.object({
            picture: schemaContructor.subObject(),
            jobTitleFunction: schemaContructor.subObject(),
            name: schemaContructor.string(),
            mainAddress: schemaContructor.subObject('fullName').concat(
              schemaContructor.object({
                addressL4: schemaContructor.string(),
                addressL7Country: schemaContructor.subObject('symbol'),
                city: schemaContructor.subObject('name'),
                zip: schemaContructor.string(),
              }),
            ),
          }),
        ),
      }),
    ),
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
    currency: schemaContructor.subObject().concat(
      schemaContructor.object({
        symbol: schemaContructor.string(),
      }),
    ),
    priceList: schemaContructor.subObject(),
    isShowStatus: schemaContructor.boolean(),
    projectTaskStatusSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    isShowPriority: schemaContructor.boolean(),
    projectTaskPrioritySet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    isShowPhasesElements: schemaContructor.boolean(),
  }),
  project_projectTask: schemaContructor.object({
    name: schemaContructor.string(),
    fullName: schemaContructor.string(),
    assignedTo: schemaContructor.subObject(),
    status: schemaContructor.subObject(),
    priority: schemaContructor.subObject(),
    progress: schemaContructor.number(),
    taskDeadline: schemaContructor.string(),
    parentTask: schemaContructor.subObject('name'),
    project: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        projectStatus: schemaContructor.subObject(),
      }),
    ),
    projectTaskCategory: schemaContructor.subObject(),
    projectTaskSection: schemaContructor.subObject(),
    targetVersion: schemaContructor.subObject(),
    taskDate: schemaContructor.string(),
    taskEndDate: schemaContructor.string(),
    projectTaskTagSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    spentTime: schemaContructor.number(),
    description: schemaContructor.string(),
    internalDescription: schemaContructor.string(),
  }),
  project_projectStatus: schemaContructor.object({
    name: schemaContructor.string(),
    isCompleted: schemaContructor.boolean(),
  }),
  project_projectPriority: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  project_timesheetLine: schemaContructor.object({
    project: schemaContructor.subObject(),
    projectTask: schemaContructor.subObject(),
    site: schemaContructor.subObject(),
    date: schemaContructor.subObject(),
    product: schemaContructor.subObject(),
    duration: schemaContructor.number(),
    toInvoice: schemaContructor.boolean(),
    comments: schemaContructor.string(),
  }),
};
