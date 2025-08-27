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

const partnerModel = schemaContructor.object({
  fullName: schemaContructor.string(),
  picture: schemaContructor.subObject(),
  simpleFullName: schemaContructor.string(),
  name: schemaContructor.string(),
  partnerSeq: schemaContructor.string(),
  jobTitleFunction: schemaContructor.subObject('name'),
  mainAddress: schemaContructor.subObject('fullName'),
  fixedPhone: schemaContructor.string(),
  mobilePhone: schemaContructor.string(),
});

export const sale_modelAPI: ObjectFields = {
  sale_partnerLink: schemaContructor.object({
    partner1: schemaContructor.subObject(),
    partner2: partnerModel,
    partnerLinkType: schemaContructor.number(),
  }),
  sale_saleConfig: schemaContructor.object({
    saleOrderInAtiSelect: schemaContructor.number(),
  }),
  sale_product: schemaContructor.object({
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    productFamily: schemaContructor.subObject('name'),
    productCategory: schemaContructor.subObject('name'),
    description: schemaContructor.string(),
    salePrice: schemaContructor.number(),
    saleCurrency: schemaContructor.subObject('symbol'),
    picture: schemaContructor.subObject('fileName'),
    configurator: schemaContructor.subObject(),
    inAti: schemaContructor.boolean(),
    internalDescription: schemaContructor.string(),
    productTypeSelect: schemaContructor.string(),
    productSubTypeSelect: schemaContructor.number(),
    procurementMethodSelect: schemaContructor.string(),
    startDate: schemaContructor.string(),
    endDate: schemaContructor.string(),
    salesUnit: schemaContructor.subObject(),
    unit: schemaContructor.subObject(),
    isPrototype: schemaContructor.boolean(),
    isUnrenewed: schemaContructor.boolean(),
    allowToForceSaleQty: schemaContructor.boolean(),
    saleProductMultipleQtyList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    productVariantConfig: schemaContructor.subObject(),
    productVariant: schemaContructor.subObject().concat(
      schemaContructor.object({
        productVariantValue1: schemaContructor.subObject(),
        productVariantValue2: schemaContructor.subObject(),
        productVariantValue3: schemaContructor.subObject(),
        productVariantValue4: schemaContructor.subObject(),
        productVariantValue5: schemaContructor.subObject(),
      }),
    ),
    parentProduct: schemaContructor.subObject('name'),
  }),
  sale_alternativeBarcode: schemaContructor.object({
    product: schemaContructor.subObject(),
    serialNumber: schemaContructor.number(),
  }),
  sale_productVariantConfig: schemaContructor.object({
    name: schemaContructor.string(),
    productVariantAttr1: schemaContructor.subObject(),
    productVariantAttr2: schemaContructor.subObject(),
    productVariantAttr3: schemaContructor.subObject(),
    productVariantAttr4: schemaContructor.subObject(),
    productVariantAttr5: schemaContructor.subObject(),
    productVariantValue1Set: schemaContructor.subObject(),
    productVariantValue2Set: schemaContructor.subObject(),
    productVariantValue3Set: schemaContructor.subObject(),
    productVariantValue4Set: schemaContructor.subObject(),
    productVariantValue5Set: schemaContructor.subObject(),
  }),
  sale_productCategory: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  sale_productCompany: schemaContructor.object({
    company: schemaContructor.subObject(),
    product: schemaContructor.subObject(),
    salePrice: schemaContructor.number(),
    saleCurrency: schemaContructor.subObject('symbol'),
    procurementMethodSelect: schemaContructor.string(),
  }),
  auth_user: schemaContructor.object({
    companySet: schemaContructor.array().of(schemaContructor.subObject()),
  }),
  sale_saleOrder: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    saleOrderSeq: schemaContructor.string(),
    orderBeingEdited: schemaContructor.boolean(),
    externalReference: schemaContructor.string(),
    priceList: schemaContructor.subObject(),
    clientPartner: partnerModel,
    contactPartner: partnerModel,
    company: schemaContructor.subObject('name'),
    tradingName: schemaContructor.subObject('name'),
    orderDate: schemaContructor.string(),
    exTaxTotal: schemaContructor.number(),
    taxTotal: schemaContructor.number(),
    inTaxTotal: schemaContructor.number(),
    amountInvoiced: schemaContructor.number(),
    advanceTotal: schemaContructor.number(),
    currency: schemaContructor.subObject('symbol'),
    deliveryState: schemaContructor.number(),
    invoicingState: schemaContructor.number(),
    oneoffSale: schemaContructor.boolean(),
    saleOrderTypeSelect: schemaContructor.number(),
    inAti: schemaContructor.boolean(),
    description: schemaContructor.string(),
    internalNote: schemaContructor.string(),
    stockLocation: schemaContructor.subObject('name'),
    fiscalPosition: schemaContructor.subObject('name'),
    paymentMode: schemaContructor.subObject('name'),
    paymentCondition: schemaContructor.subObject('name'),
    invoicedPartner: partnerModel,
    mainInvoicingAddressStr: schemaContructor.string(),
    deliveredPartner: partnerModel,
    deliveryAddressStr: schemaContructor.string(),
    accountedRevenue: schemaContructor.number(),
    totalCostPrice: schemaContructor.number(),
    totalGrossMargin: schemaContructor.number(),
    marginRate: schemaContructor.number(),
    markup: schemaContructor.number(),
    opportunity: schemaContructor.subObject().concat(
      schemaContructor.object({
        amount: schemaContructor.number(),
        expectedCloseDate: schemaContructor.string(),
        name: schemaContructor.string(),
        opportunityRating: schemaContructor.number(),
        opportunitySeq: schemaContructor.string(),
        currency: schemaContructor.subObject('symbol'),
        opportunityStatus: schemaContructor.subObject('name'),
      }),
    ),
    salespersonUser: schemaContructor.subObject('fullName'),
    team: schemaContructor.subObject('name'),
    creationDate: schemaContructor.string(),
    expectedRealisationDate: schemaContructor.string(),
    endOfValidityDate: schemaContructor.string(),
    lastReminderDate: schemaContructor.string(),
    lastReminderComments: schemaContructor.string(),
  }),
  sale_customer: schemaContructor.object({
    fullName: schemaContructor.string(),
    picture: schemaContructor.subObject(),
    name: schemaContructor.string(),
    partnerSeq: schemaContructor.string(),
    mainAddress: schemaContructor.subObject('fullName'),
    mobilePhone: schemaContructor.string(),
    fixedPhone: schemaContructor.string(),
    emailAddress: schemaContructor.subObject('address'),
    description: schemaContructor.string(),
    factorizedCustomer: schemaContructor.boolean(),
    hasBlockedAccount: schemaContructor.boolean(),
    inPaymentMode: schemaContructor.subObject('name'),
    paymentCondition: schemaContructor.subObject('name'),
  }),
  sale_paymentMode: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  sale_paymentCondition: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  sale_saleOrderLine: schemaContructor.object({
    typeSelect: schemaContructor.number(),
    availableStatusSelect: schemaContructor.number(),
    availableStatus: schemaContructor.string(),
    product: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        picture: schemaContructor.subObject(),
        code: schemaContructor.string(),
        productFamily: schemaContructor.subObject('name'),
        productCategory: schemaContructor.subObject('name'),
        description: schemaContructor.string(),
        configurator: schemaContructor.subObject(),
      }),
    ),
    productName: schemaContructor.string(),
    price: schemaContructor.number(),
    unit: schemaContructor.subObject('name'),
    qty: schemaContructor.number(),
    inTaxTotal: schemaContructor.number(),
    exTaxTotal: schemaContructor.number(),
    description: schemaContructor.string(),
    isShowTotal: schemaContructor.boolean(),
    priceDiscounted: schemaContructor.number(),
    inTaxPrice: schemaContructor.number(),
    subTotalCostPrice: schemaContructor.number(),
    subTotalGrossMargin: schemaContructor.number(),
    subMarginRate: schemaContructor.number(),
    subTotalMarkup: schemaContructor.number(),
    saleSupplySelect: schemaContructor.number(),
    pricingScaleLogs: schemaContructor.string(),
  }),
  sale_customerCategory: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  sale_complementaryProduct: schemaContructor.object({
    product: schemaContructor.subObject().concat(
      schemaContructor.object({
        picture: schemaContructor.subObject(),
        name: schemaContructor.string(),
        code: schemaContructor.string(),
        salePrice: schemaContructor.number(),
        saleCurrency: schemaContructor.subObject('symbol'),
      }),
    ),
    optional: schemaContructor.boolean(),
    qty: schemaContructor.number(),
  }),
  sale_priceListLine: schemaContructor.object({
    priceList: schemaContructor.subObject().concat(
      schemaContructor.object({
        isActive: schemaContructor.boolean(),
        title: schemaContructor.string(),
        applicationBeginDate: schemaContructor.string(),
        applicationEndDate: schemaContructor.string(),
        typeSelect: schemaContructor.number(),
        nonNegotiable: schemaContructor.boolean(),
      }),
    ),
    minQty: schemaContructor.number(),
    typeSelect: schemaContructor.number(),
    amountTypeSelect: schemaContructor.number(),
    amount: schemaContructor.number(),
  }),
  sale_cart: schemaContructor.object({
    partner: schemaContructor.subObject(),
    company: schemaContructor.subObject(),
  }),
  sale_cartLine: schemaContructor.object({
    product: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        code: schemaContructor.string(),
        picture: schemaContructor.subObject('fileName'),
        salePrice: schemaContructor.number(),
        saleCurrency: schemaContructor.subObject('symbol'),
        productVariant: schemaContructor.subObject('name'),
        productVariantConfig: schemaContructor.subObject(),
        parentProduct: schemaContructor.subObject(),
      }),
    ),
    qty: schemaContructor.number(),
    unit: schemaContructor.subObject(),
    variantProduct: schemaContructor.subObject(),
  }),
};
