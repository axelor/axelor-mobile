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

import {ObjectFields, schemaContructor} from '@axelor/aos-mobile-core';

export const purchase_modelAPI: ObjectFields = {
  purchase_purchaseRequest: schemaContructor.object({
    purchaseRequestSeq: schemaContructor.string(),
    supplierPartner: schemaContructor.subObject('fullName'),
    company: schemaContructor.subObject('name'),
    statusSelect: schemaContructor.number(),
    description: schemaContructor.string(),
    stockLocation: schemaContructor.subObject(),
    requesterUser: schemaContructor.subObject(),
    validatorUser: schemaContructor.subObject(),
  }),
  purchase_supplier: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
  }),
  purchase_purchaseRequestLine: schemaContructor.object({
    product: schemaContructor.subObject('name'),
    productTitle: schemaContructor.string(),
    unit: schemaContructor.subObject(),
    quantity: schemaContructor.string(),
    newProduct: schemaContructor.boolean(),
  }),
  purchase_product: schemaContructor.object({
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    unit: schemaContructor.subObject('name'),
  }),
  purchase_unit: schemaContructor.object({
    name: schemaContructor.string(),
  }),
};
