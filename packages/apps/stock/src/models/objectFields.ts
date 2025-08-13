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

const productModel = schemaContructor.subObject().concat(
  schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    trackingNumberConfiguration: schemaContructor.subObject(),
    code: schemaContructor.string(),
    picture: schemaContructor.subObject('fileName'),
  }),
);

export const stock_modelAPI: ObjectFields = {
  stock_customerDelivery: schemaContructor.object({
    availableStatusSelect: schemaContructor.number(),
    name: schemaContructor.string(),
    stockMoveLineList: schemaContructor
      .array()
      .of(schemaContructor.subObject('productName')),
    stockMoveSeq: schemaContructor.string(),
    fromStockLocation: schemaContructor.subObject('name'),
    toAddress: schemaContructor.subObject('name'),
    toAddressStr: schemaContructor.string(),
    company: schemaContructor.subObject('name'),
    origin: schemaContructor.string(),
    createdOn: schemaContructor.string(),
    estimatedDate: schemaContructor.string(),
    realDate: schemaContructor.string(),
    partner: schemaContructor.subObject('fullName'),
    statusSelect: schemaContructor.number(),
    pickingOrderComments: schemaContructor.string(),
    deliveryCondition: schemaContructor.string(),
    isIspmRequired: schemaContructor.boolean(),
    note: schemaContructor.string(),
    freightCarrierMode: schemaContructor.subObject('name'),
    shipmentMode: schemaContructor.subObject('name'),
    carrierPartner: schemaContructor.subObject('fullName'),
    forwarderPartner: schemaContructor.subObject('fullName'),
    incoterm: schemaContructor.subObject('fullname'),
    trackingNumber: schemaContructor.string(),
    modeOfTransport: schemaContructor.string(),
    numOfPackages: schemaContructor.number(),
    numOfPalettes: schemaContructor.number(),
    grossMass: schemaContructor.number(),
    signatoryUser: schemaContructor.subObject('fullName'),
    isNeedingConformityCertificate: schemaContructor.boolean(),
    isConformityCertifSigned: schemaContructor.boolean(),
  }),
  stock_customerDeliveryLine: schemaContructor.object({
    product: productModel,
    description: schemaContructor.string(),
    availableStatusSelect: schemaContructor.number(),
    trackingNumber: schemaContructor.subObject('trackingNumberSeq'),
    unit: schemaContructor.subObject('name'),
    qty: schemaContructor.number(),
    realQty: schemaContructor.number(),
    locker: schemaContructor.string(),
    name: schemaContructor.string(),
    productName: schemaContructor.string(),
    'saleOrderLine.pickingOrderInfo': schemaContructor.string(),
    isRealQtyModifiedByUser: schemaContructor.boolean(),
    fromStockLocation: schemaContructor.subObject('name'),
    totalNetMass: schemaContructor.number(),
    saleOrderLine: schemaContructor.subObject('sequence').concat(
      schemaContructor.object({
        saleOrder: schemaContructor.subObject().concat(
          schemaContructor.object({
            saleOrderSeq: schemaContructor.string(),
            clientPartner: schemaContructor.subObject('fullName'),
          }),
        ),
      }),
    ),
  }),
  stock_internalMove: schemaContructor.object({
    name: schemaContructor.string(),
    stockMoveSeq: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    availableStatusSelect: schemaContructor.number(),
    fromStockLocation: schemaContructor.subObject('name'),
    toStockLocation: schemaContructor.subObject('name'),
    origin: schemaContructor.string(),
    createdOn: schemaContructor.string(),
    estimatedDate: schemaContructor.string(),
    realDate: schemaContructor.string(),
    stockMoveLineList: schemaContructor
      .array()
      .of(schemaContructor.subObject('productName')),
    note: schemaContructor.string(),
    pickingOrderComments: schemaContructor.string(),
    company: schemaContructor.subObject(),
  }),
  stock_internalMoveLine: schemaContructor.object({
    product: productModel,
    description: schemaContructor.string(),
    availableStatusSelect: schemaContructor.number(),
    trackingNumber: schemaContructor.subObject('trackingNumberSeq'),
    unit: schemaContructor.subObject('name'),
    qty: schemaContructor.number(),
    realQty: schemaContructor.number(),
    productName: schemaContructor.string(),
    isRealQtyModifiedByUser: schemaContructor.boolean(),
    fromStockLocation: schemaContructor.subObject('name'),
    toStockLocation: schemaContructor.subObject('name'),
    totalNetMass: schemaContructor.number(),
  }),
  stock_inventory: schemaContructor.object({
    inventoryTitle: schemaContructor.string(),
    inventorySeq: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    typeSelect: schemaContructor.number(),
    product: schemaContructor.subObject('fullName'),
    stockLocation: schemaContructor.subObject('name'),
    company: schemaContructor.subObject('name'),
    createdOn: schemaContructor.string(),
    updatedOn: schemaContructor.string(),
    validatedOn: schemaContructor.string(),
    plannedStartDateT: schemaContructor.string(),
    plannedEndDateT: schemaContructor.string(),
    description: schemaContructor.string(),
    fromRack: schemaContructor.string(),
    toRack: schemaContructor.string(),
    productCategory: schemaContructor.subObject('name'),
    productFamily: schemaContructor.subObject('name'),
  }),
  stock_inventoryLine: schemaContructor.object({
    product: productModel,
    trackingNumber: schemaContructor.subObject('trackingNumberSeq'),
    unit: schemaContructor.subObject('name'),
    currentQty: schemaContructor.number(),
    realQty: schemaContructor.number(),
    description: schemaContructor.string(),
    rack: schemaContructor.string(),
    stockLocation: schemaContructor.subObject('name'),
  }),
  stock_partner: schemaContructor.object({
    partnerSeq: schemaContructor.string(),
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    firstName: schemaContructor.string(),
    simpleFullName: schemaContructor.string(),
  }),
  stock_product: schemaContructor.object({
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    fullName: schemaContructor.string(),
    picture: schemaContructor.subObject('fileName'),
    trackingNumberConfiguration: schemaContructor.subObject(),
    unit: schemaContructor.subObject('name'),
    sellable: schemaContructor.boolean(),
    salesUnit: schemaContructor.subObject('name'),
    purchasable: schemaContructor.boolean(),
    purchasesUnit: schemaContructor.subObject('name'),
    length: schemaContructor.number(),
    height: schemaContructor.number(),
    width: schemaContructor.number(),
    lengthUnit: schemaContructor.subObject('name'),
    description: schemaContructor.string(),
    netMass: schemaContructor.number(),
    grossMass: schemaContructor.number(),
    massUnit: schemaContructor.subObject('name'),
    productCategory: schemaContructor.subObject('name'),
    procurementMethodSelect: schemaContructor.string(),
    isUnrenewed: schemaContructor.boolean(),
    isPrototype: schemaContructor.boolean(),
    serialNumber: schemaContructor.string(),
    parentProduct: schemaContructor.subObject('fileName'),
    productVariant: schemaContructor.subObject('name'),
  }),
  stock_productCompany: schemaContructor.object({
    product: schemaContructor.subObject(),
    trackingNumberConfiguration: schemaContructor.subObject(),
  }),
  stock_stockCorrection: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    product: schemaContructor.subObject('fullName'),
    trackingNumber: schemaContructor.subObject('trackingNumberSeq'),
    stockLocation: schemaContructor.subObject('name'),
    createdOn: schemaContructor.string(),
    validationDateT: schemaContructor.string(),
    realQty: schemaContructor.number(),
    baseQty: schemaContructor.number(),
    stockCorrectionReason: schemaContructor.subObject('name'),
    comments: schemaContructor.string(),
  }),
  stock_stockCorrectionReason: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  stock_stockLocation: schemaContructor.object({
    name: schemaContructor.string(),
    serialNumber: schemaContructor.string(),
    stockLocationLineList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  stock_stockLocationLine: schemaContructor.object({
    product: schemaContructor.subObject('fullName'),
    stockLocation: schemaContructor.subObject('name'),
    unit: schemaContructor.subObject('name'),
    rack: schemaContructor.string(),
    currentQty: schemaContructor.number(),
    futureQty: schemaContructor.number(),
    reservedQty: schemaContructor.number(),
  }),
  stock_availableProducts: schemaContructor.object({
    currentQty: schemaContructor.number(),
    product: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
        name: schemaContructor.string(),
        code: schemaContructor.string(),
        unit: schemaContructor.subObject('name'),
        picture: schemaContructor.subObject('fileName'),
        trackingNumberConfiguration: schemaContructor.subObject(),
      }),
    ),
    trackingNumber: schemaContructor.subObject('trackingNumberSeq'),
  }),
  stock_supplierArrival: schemaContructor.object({
    name: schemaContructor.string(),
    stockMoveSeq: schemaContructor.string(),
    stockMoveLineList: schemaContructor
      .array()
      .of(schemaContructor.subObject('productName')),
    company: schemaContructor.subObject('name'),
    origin: schemaContructor.string(),
    supplierShipmentRef: schemaContructor.string(),
    toStockLocation: schemaContructor.subObject('name'),
    fromAddress: schemaContructor.subObject('name'),
    fromAddressStr: schemaContructor.string(),
    createdOn: schemaContructor.string(),
    estimatedDate: schemaContructor.string(),
    realDate: schemaContructor.string(),
    partner: schemaContructor.subObject('fullName'),
    statusSelect: schemaContructor.number(),
  }),
  stock_supplierArrivalLine: schemaContructor.object({
    trackingNumber: schemaContructor.subObject().concat(
      schemaContructor.object({
        trackingNumberSeq: schemaContructor.string(),
        origin: schemaContructor.string(),
      }),
    ),
    unit: schemaContructor.subObject('name'),
    qty: schemaContructor.number(),
    realQty: schemaContructor.number(),
    locker: schemaContructor.string(),
    name: schemaContructor.string(),
    conformitySelect: schemaContructor.number(),
    productName: schemaContructor.string(),
    product: productModel,
    isRealQtyModifiedByUser: schemaContructor.boolean(),
    toStockLocation: schemaContructor.subObject('name'),
    totalNetMass: schemaContructor.number(),
  }),
  stock_supplierCatalog: schemaContructor.object({
    productSupplierName: schemaContructor.string(),
    productSupplierCode: schemaContructor.string(),
  }),
  stock_trackingNumber: schemaContructor.object({
    trackingNumberSeq: schemaContructor.string(),
    origin: schemaContructor.string(),
    serialNumber: schemaContructor.string(),
  }),
  stock_unit: schemaContructor.object({name: schemaContructor.string()}),
  stock_stockQtyIndicator: schemaContructor.object({
    name: schemaContructor.string(),
    stockMove: schemaContructor.subObject().concat(
      schemaContructor.object({
        estimatedDate: schemaContructor.string(),
        realDate: schemaContructor.string(),
        typeSelect: schemaContructor.number(),
        fromStockLocation: schemaContructor.subObject('name'),
        toStockLocation: schemaContructor.subObject('name'),
      }),
    ),
    realQty: schemaContructor.number(),
    qty: schemaContructor.number(),
    reservedQty: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
    trackingNumber: schemaContructor.subObject('trackingNumberSeq'),
    qtyInvoiced: schemaContructor.number(),
  }),
  stock_saleOrderQtyIndicator: schemaContructor.object({
    saleOrder: schemaContructor.subObject().concat(
      schemaContructor.object({
        saleOrderSeq: schemaContructor.string(),
        stockLocation: schemaContructor.subObject('name'),
        estimatedDeliveryDate: schemaContructor.string(),
        externalReference: schemaContructor.string(),
      }),
    ),
    qty: schemaContructor.number(),
    deliveredQty: schemaContructor.number(),
    reservedQty: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
    estimatedDeliveryDate: schemaContructor.string(),
    deliveryState: schemaContructor.number(),
    sequence: schemaContructor.number(),
  }),
  stock_purchaseOrderQtyIndicator: schemaContructor.object({
    purchaseOrder: schemaContructor.subObject().concat(
      schemaContructor.object({
        purchaseOrderSeq: schemaContructor.string(),
        stockLocation: schemaContructor.subObject('name'),
        estimatedReceiptDate: schemaContructor.string(),
        externalReference: schemaContructor.string(),
      }),
    ),
    qty: schemaContructor.number(),
    receivedQty: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
    estimatedReceiptDate: schemaContructor.string(),
    receiptState: schemaContructor.number(),
    sequence: schemaContructor.number(),
  }),
  stock_alternativeBarcode: schemaContructor.object({
    product: schemaContructor.subObject(),
    serialNumber: schemaContructor.number(),
  }),
  stock_stockMoveLine: schemaContructor.object({
    trackingNumber: schemaContructor.subObject().concat(
      schemaContructor.object({
        trackingNumberSeq: schemaContructor.string(),
        origin: schemaContructor.string(),
      }),
    ),
    unit: schemaContructor.subObject('name'),
    qty: schemaContructor.number(),
    realQty: schemaContructor.number(),
    product: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
        name: schemaContructor.string(),
        code: schemaContructor.string(),
        trackingNumberConfiguration: schemaContructor.subObject(),
      }),
    ),
    isRealQtyModifiedByUser: schemaContructor.boolean(),
  }),
  auth_user: schemaContructor.object({
    activeCompany: schemaContructor.subObject().concat(
      schemaContructor.object({
        stockConfig: schemaContructor.subObject().concat(
          schemaContructor.object({
            customsMassUnit: schemaContructor.subObject('labelToPrinting'),
          }),
        ),
      }),
    ),
  }),
};
