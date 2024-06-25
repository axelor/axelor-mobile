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

export const sale_modelAPI: ObjectFields = {
  sale_saleConfig: schemaContructor.object({
    saleOrderInAtiSelect: schemaContructor.number(),
  }),
  sales_product: schemaContructor.object({
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    productFamily: schemaContructor.subObject('name'),
    productCategory: schemaContructor.subObject('name'),
    description: schemaContructor.string(),
    salePrice: schemaContructor.number(),
    saleCurrency: schemaContructor.subObject('symbol'),
    picture: schemaContructor.subObject('fileName'),
    configurator: schemaContructor.subObject(),
  }),
  sale_saleOrder: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    saleOrderSeq: schemaContructor.string(),
    orderBeingEdited: schemaContructor.boolean(),
    externalReference: schemaContructor.string(),
    clientPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
        picture: schemaContructor.subObject(),
        simpleFullName: schemaContructor.string(),
        name: schemaContructor.string(),
        partnerSeq: schemaContructor.string(),
        jobTitleFunction: schemaContructor.subObject('name'),
        mainAddress: schemaContructor.subObject('fullName'),
        fixedPhone: schemaContructor.string(),
        mobilePhone: schemaContructor.string(),
      }),
    ),
    contactPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        picture: schemaContructor.subObject(),
        simpleFullName: schemaContructor.string(),
        name: schemaContructor.string(),
        partnerSeq: schemaContructor.string(),
        jobTitleFunction: schemaContructor.subObject('name'),
        fixedPhone: schemaContructor.string(),
        mobilePhone: schemaContructor.string(),
      }),
    ),
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
    invoicedPartner: schemaContructor.subObject('fullName'),
    mainInvoicingAddressStr: schemaContructor.string(),
    deliveredPartner: schemaContructor.subObject('fullName'),
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
  }),
};
