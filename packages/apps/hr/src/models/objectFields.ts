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
    expense: schemaContructor.subObject(),
    expenseDate: schemaContructor.string(),
    fromCity: schemaContructor.string(),
    toCity: schemaContructor.string(),
    project: schemaContructor.subObject(),
    totalAmount: schemaContructor.string(),
    expenseProduct: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        blockExpenseTax: schemaContructor.boolean(),
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
  }),
  hr_expenseType: schemaContructor.object({
    name: schemaContructor.string(),
    fullName: schemaContructor.string(),
    blockExpenseTax: schemaContructor.boolean(),
  }),
  hr_kilomectricAllowParam: schemaContructor.object({
    name: schemaContructor.string(),
    code: schemaContructor.string(),
  }),
  hr_project: schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  auth_user: schemaContructor.object({
    employee: schemaContructor.subObject().concat(
      schemaContructor.object({
        hrManager: schemaContructor.boolean(),
        employeeVehicleList: schemaContructor
          .array()
          .of(schemaContructor.subObject()),
      }),
    ),
  }),
};
