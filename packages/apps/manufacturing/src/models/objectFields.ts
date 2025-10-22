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

export const manufacturing_modelAPI: ObjectFields = {
  manufacturing_machine: schemaContructor.object({
    code: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  manufacturing_manufacturingOrder: schemaContructor.object({
    manufOrderSeq: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    prioritySelect: schemaContructor.number(),
    product: schemaContructor.subObject('fullName'),
    qty: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
    clientPartner: schemaContructor.subObject('fullName'),
    saleOrderSet: schemaContructor
      .array()
      .of(schemaContructor.subObject('saleOrderSeq')),
    toConsumeProdProductList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    note: schemaContructor.string(),
    moCommentFromSaleOrder: schemaContructor.string(),
    moCommentFromSaleOrderLine: schemaContructor.string(),
    parentMO: schemaContructor.subObject('manufOrderSeq'),
    wasteProdProductList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    wasteStockMove: schemaContructor.subObject('stockMoveSeq'),
    productionOrderSet: schemaContructor
      .array()
      .of(schemaContructor.subObject('productionOrderSeq')),
    company: schemaContructor.subObject('name'),
    plannedStartDateT: schemaContructor.string(),
    plannedEndDateT: schemaContructor.string(),
    realStartDateT: schemaContructor.string(),
    realEndDateT: schemaContructor.string(),
    isConsProOnOperation: schemaContructor.boolean(),
  }),
  manufacturing_manufacturingOrderShort: schemaContructor.object({
    manufOrderSeq: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
  }),
  manufacturing_productionOrder: schemaContructor.object({
    manufOrderSet: schemaContructor
      .array()
      .of(schemaContructor.subObject('manufOrderSeq')),
  }),
  manufacturing_operationOrder: schemaContructor.object({
    operationName: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    priority: schemaContructor.number(),
    workCenter: schemaContructor.subObject('name'),
    plannedDuration: schemaContructor.string(),
    plannedHumanDuration: schemaContructor.string(),
    plannedMachineDuration: schemaContructor.string(),
    manufOrder: schemaContructor.object({
      manufOrderSeq: schemaContructor.string(),
      isConsProOnOperation: schemaContructor.boolean(),
    }),
    machine: schemaContructor.subObject('name'),
    plannedStartDateT: schemaContructor.string(),
    plannedEndDateT: schemaContructor.string(),
    realStartDateT: schemaContructor.string(),
    realEndDateT: schemaContructor.string(),
    realDuration: schemaContructor.string(),
  }),
  manufacturing_productionFile: schemaContructor.object({
    image: schemaContructor.subObject('fileName'),
    description: schemaContructor.string(),
  }),
  manufacturing_prodProduct: schemaContructor.object({
    product: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        picture: schemaContructor.subObject(),
      }),
    ),
    qty: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
  }),
  manufacturing_workCenter: schemaContructor.object({
    code: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  manufacturing_manufacturingQtyIndicator: schemaContructor.object({
    producedManufOrder: schemaContructor.subObject().concat(
      schemaContructor.object({
        manufOrderSeq: schemaContructor.string(),
      }),
    ),
    consumedManufOrder: schemaContructor.subObject().concat(
      schemaContructor.object({
        manufOrderSeq: schemaContructor.string(),
      }),
    ),
    consumedOperationOrder: schemaContructor.subObject(),
    stockMove: schemaContructor.subObject().concat(
      schemaContructor.object({
        stockMoveSeq: schemaContructor.string(),
        realDate: schemaContructor.string(),
        statusSelect: schemaContructor.number(),
      }),
    ),
    realQty: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
    trackingNumber: schemaContructor.string(),
  }),
  manufacturing_stockMoveStatus: schemaContructor.object({
    stockMove: schemaContructor.subObject('statusSelect'),
  }),
};
