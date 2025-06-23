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

export const quality_modelAPI: ObjectFields = {
  quality_controlEntry: schemaContructor.object({
    inspector: schemaContructor.subObject(),
    name: schemaContructor.string(),
    controlEntrySamplesList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    entryDateTime: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    sampleCount: schemaContructor.number(),
    controlPlan: schemaContructor.subObject(),
  }),
  quality_controlEntrySample: schemaContructor.object({
    fullName: schemaContructor.string(),
    resultSelect: schemaContructor.number(),
    entrySampleNbr: schemaContructor.number(),
  }),
  quality_controlEntrySampleLine: schemaContructor.object({
    name: schemaContructor.string(),
    resultSelect: schemaContructor.number(),
    controlPlanLine: schemaContructor
      .subObject()
      .concat(
        schemaContructor.object({
          characteristic: schemaContructor.subObject('name'),
        }),
      ),
    controlEntrySample: schemaContructor.subObject('fullName'),
  }),
  quality_controlPlan: schemaContructor.object({
    name: schemaContructor.string(),
    controlPlanLinesList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  quality_qualityImprovement: schemaContructor.object({
    sequence: schemaContructor.string(),
    qiDetection: schemaContructor
      .subObject()
      .concat(schemaContructor.object({origin: schemaContructor.number()})),
    qiStatus: schemaContructor.subObject('sequence'),
    gravityTypeSelect: schemaContructor.number(),
    analysisMethod: schemaContructor.subObject(),
    type: schemaContructor.number(),
    qiIdentification: schemaContructor
      .subObject()
      .concat(
        schemaContructor.object({
          customerPartner: schemaContructor.subObject('simpleFullName'),
          customerSaleOrder: schemaContructor.subObject('saleOrderSeq'),
          customerSaleOrderLine: schemaContructor.subObject(),
          supplierPartner: schemaContructor.subObject('simpleFullName'),
          supplierPurchaseOrder: schemaContructor.subObject('purchaseOrderSeq'),
          supplierPurchaseOrderLine: schemaContructor.subObject(),
          manufOrder: schemaContructor.subObject(),
          operationOrder: schemaContructor.subObject(),
          product: schemaContructor.subObject(),
          quantity: schemaContructor.number(),
          nonConformingQuantity: schemaContructor.number(),
        }),
      ),
    qiResolution: schemaContructor.subObject(),
  }),
  quality_qiStatus: schemaContructor.object({name: schemaContructor.string()}),
  quality_qiResolution: schemaContructor.object({
    qiResolutionDefaultsList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  quality_qiResolutionDefault: schemaContructor.object({
    name: schemaContructor.string(),
    description: schemaContructor.string(),
    quantity: schemaContructor.number(),
    qiDefault: schemaContructor.subObject(),
  }),
  quality_qiDetection: schemaContructor.object({
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    origin: schemaContructor.number(),
  }),
  quality_qiAnalysisMethod: schemaContructor.object({
    code: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  quality_supplier: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
  }),
  quality_supplierOrder: schemaContructor.object({
    purchaseOrderSeq: schemaContructor.string(),
  }),
  quality_supplierOrderLine: schemaContructor.object({
    fullName: schemaContructor.string(),
    product: schemaContructor.subObject(),
  }),
  quality_customer: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
  }),
  quality_customerOrder: schemaContructor.object({
    saleOrderSeq: schemaContructor.string(),
  }),
  quality_customerOrderLine: schemaContructor.object({
    productName: schemaContructor.string(),
    product: schemaContructor.subObject(),
  }),
  quality_manufacturingOrder: schemaContructor.object({
    manufOrderSeq: schemaContructor.string(),
    product: schemaContructor.subObject(),
    billOfMaterial: schemaContructor.subObject('product'),
  }),
  quality_operationOrder: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  quality_product: schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
  quality_qiDefault: schemaContructor.object({name: schemaContructor.string()}),
};
