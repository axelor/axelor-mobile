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
    manufOrder: schemaContructor.subObject('manufOrderSeq'),
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
    product: schemaContructor.subObject('fullName'),
    qty: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
  }),
  manufacturing_workCenter: schemaContructor.object({
    code: schemaContructor.string(),
    name: schemaContructor.string(),
  }),
};
