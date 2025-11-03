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

import {ObjectFields, schemaContructor} from '@axelor/aos-mobile-core';

export const hr_modelAPI: ObjectFields = {
  hr_currency: schemaContructor.object({
    name: schemaContructor.string(),
    symbol: schemaContructor.string(),
    code: schemaContructor.string(),
  }),
  hr_expense: schemaContructor.object({
    fullName: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    expenseSeq: schemaContructor.string(),
    period: schemaContructor.subObject('code'),
    inTaxTotal: schemaContructor.string(),
    companyInTaxTotal: schemaContructor.string(),
    currency: schemaContructor
      .subObject()
      .concat(
        schemaContructor.object({
          symbol: schemaContructor.string(),
          code: schemaContructor.string(),
        }),
      ),
    groundForRefusal: schemaContructor.string(),
    employee: schemaContructor
      .subObject()
      .concat(
        schemaContructor.object({managerUser: schemaContructor.subObject()}),
      ),
    kilometricExpenseLineList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    generalExpenseLineList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  hr_expenseDraft: schemaContructor.object({
    fullName: schemaContructor.string(),
    expenseSeq: schemaContructor.string(),
  }),
  hr_expenseLines: schemaContructor.object({
    expense: schemaContructor.subObject().concat(
      schemaContructor.object({
        expenseSeq: schemaContructor.string(),
      }),
    ),
    expenseDate: schemaContructor.string(),
    fromCity: schemaContructor.string(),
    toCity: schemaContructor.string(),
    project: schemaContructor.subObject(),
    projectTask: schemaContructor.subObject(),
    totalAmount: schemaContructor.string(),
    expenseProduct: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        blockExpenseTax: schemaContructor.boolean(),
        deductLunchVoucher: schemaContructor.boolean(),
      }),
    ),
    kilometricTypeSelect: schemaContructor.number(),
    justificationMetaFile: schemaContructor.subObject(),
    comments: schemaContructor.string(),
    kilometricAllowParam: schemaContructor.subObject(),
    distance: schemaContructor.number(),
    totalTax: schemaContructor.string(),
    toInvoice: schemaContructor.boolean(),
    currency: schemaContructor.subObject('symbol'),
    invitedCollaboratorSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  hr_expenseType: schemaContructor.object({
    name: schemaContructor.string(),
    fullName: schemaContructor.string(),
    blockExpenseTax: schemaContructor.boolean(),
    deductLunchVoucher: schemaContructor.boolean(),
  }),
  hr_kilomectricAllowParam: schemaContructor.object({
    name: schemaContructor.string(),
    code: schemaContructor.string(),
  }),
  hr_manufOrder: schemaContructor.object({
    manufOrderSeq: schemaContructor.string(),
  }),
  hr_operationOrder: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  hr_project: schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  hr_projectTask: schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    product: schemaContructor.subObject('fullName'),
    project: schemaContructor.subObject(),
  }),
  hr_product: schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  hr_timer: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    project: schemaContructor.subObject('name'),
    projectTask: schemaContructor.subObject('name'),
    product: schemaContructor.subObject('name'),
    comments: schemaContructor.string(),
    startDateTime: schemaContructor.string(),
    timerStartDateT: schemaContructor.string(),
    duration: schemaContructor.number(),
    updatedDuration: schemaContructor.number(),
  }),
  hr_timesheet: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    isCompleted: schemaContructor.boolean(),
    fromDate: schemaContructor.string(),
    toDate: schemaContructor.string(),
    company: schemaContructor.subObject('name'),
    periodTotal: schemaContructor.number(),
    timeLoggingPreferenceSelect: schemaContructor.string(),
    employee: schemaContructor
      .subObject('name')
      .concat(
        schemaContructor.object({managerUser: schemaContructor.subObject()}),
      ),
    groundForRefusal: schemaContructor.string(),
  }),
  hr_timesheetLine: schemaContructor.object({
    project: schemaContructor.subObject('name'),
    projectTask: schemaContructor.subObject('name'),
    manufOrder: schemaContructor.subObject('name'),
    operationOrder: schemaContructor.subObject('name'),
    product: schemaContructor.subObject('name'),
    comments: schemaContructor.string(),
    date: schemaContructor.string(),
    duration: schemaContructor.number(),
    hoursDuration: schemaContructor.number(),
    timer: schemaContructor.subObject(),
  }),
  auth_user: schemaContructor.object({
    employee: schemaContructor.subObject().concat(
      schemaContructor.object({
        hrManager: schemaContructor.boolean(),
        employeeVehicleList: schemaContructor
          .array()
          .of(schemaContructor.subObject()),
        product: schemaContructor.subObject('name'),
        timesheetImputationSelect: schemaContructor.number(),
      }),
    ),
  }),
  hr_leave: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    fromDateT: schemaContructor.string(),
    toDateT: schemaContructor.string(),
    duration: schemaContructor.number(),
    leaveReason: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        unitSelect: schemaContructor.number(),
        leaveReasonTypeSelect: schemaContructor.number(),
      }),
    ),
    company: schemaContructor.subObject('name'),
    employee: schemaContructor.subObject('name'),
    groundForRefusal: schemaContructor.string(),
    startOnSelect: schemaContructor.number(),
    endOnSelect: schemaContructor.number(),
    comments: schemaContructor.string(),
    requestDate: schemaContructor.string(),
    validationDateTime: schemaContructor.string(),
    validatedBy: schemaContructor.subObject('name'),
    refusalDateTime: schemaContructor.string(),
    refusedBy: schemaContructor.subObject('name'),
  }),
  hr_leaveReason: schemaContructor.object({
    name: schemaContructor.string(),
    unitSelect: schemaContructor.number(),
    leaveReasonTypeSelect: schemaContructor.number(),
  }),
  hr_employee: schemaContructor.object({
    name: schemaContructor.string(),
  }),
};
