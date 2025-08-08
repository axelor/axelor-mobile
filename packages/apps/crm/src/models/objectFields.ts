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

const addressModel = schemaContructor.subObject('fullName').concat(
  schemaContructor.object({
    streetName: schemaContructor.string(),
    country: schemaContructor.subObject('name'),
    city: schemaContructor.subObject('name'),
    zip: schemaContructor.string(),
  }),
);

const getPartnerModel = (additionalContent: any) =>
  schemaContructor.object({
    isContact: schemaContructor.boolean(),
    isCustomer: schemaContructor.boolean(),
    isProspect: schemaContructor.boolean(),
    partnerSeq: schemaContructor.string(),
    simpleFullName: schemaContructor.string(),
    fullName: schemaContructor.string(),
    partnerTypeSelect: schemaContructor.number(),
    leadScoringSelect: schemaContructor.number(),
    titleSelect: schemaContructor.string(),
    firstName: schemaContructor.string(),
    name: schemaContructor.string(),
    mainPartner: schemaContructor.subObject('simpleFullName'),
    description: schemaContructor.string(),
    ...additionalContent,
  });

export const crm_modelAPI: ObjectFields = {
  crm_partnerAddress: schemaContructor.object({
    address: addressModel,
    isDefaultAddr: schemaContructor.boolean(),
    isDeliveryAddr: schemaContructor.boolean(),
    isInvoicingAddr: schemaContructor.boolean(),
    fullName: schemaContructor.string(),
  }),
  crm_catalog: schemaContructor.object({
    name: schemaContructor.string(),
    pdfFile: schemaContructor.subObject('fileName'),
    description: schemaContructor.string(),
    catalogType: schemaContructor.subObject('name'),
  }),
  crm_catologType: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  crm_client: getPartnerModel({
    mainAddress: addressModel,
    fixedPhone: schemaContructor.string(),
    mobilePhone: schemaContructor.string(),
    emailAddress: schemaContructor.subObject('address'),
    user: schemaContructor.subObject('fullName'),
    industrySector: schemaContructor.subObject('name'),
    partnerCategory: schemaContructor.subObject('name'),
    webSite: schemaContructor.string(),
    contactPartnerSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    picture: schemaContructor.subObject('fileName'),
    salePartnerPriceList: schemaContructor.subObject('label'),
  }),
  crm_contact: getPartnerModel({
    mainAddress: addressModel,
    fixedPhone: schemaContructor.string(),
    mobilePhone: schemaContructor.string(),
    emailAddress: schemaContructor.subObject('address'),
    picture: schemaContructor.subObject('fileName'),
    jobTitleFunction: schemaContructor.subObject('name'),
    webSite: schemaContructor.string(),
    language: schemaContructor.subObject('name'),
  }),
  crm_event: schemaContructor.object({
    startDateTime: schemaContructor.string(),
    endDateTime: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    typeSelect: schemaContructor.number(),
    subject: schemaContructor.string(),
    location: schemaContructor.string(),
    organizer: schemaContructor.subObject('name'),
    user: schemaContructor.subObject('fullName'),
    lead: schemaContructor.subObject(),
    partner: schemaContructor.subObject().concat(
      schemaContructor.object({
        partnerTypeSelect: schemaContructor.number(),
      }),
    ),
    contactPartner: schemaContructor.subObject(),
    description: schemaContructor.string(),
    eventLead: schemaContructor.subObject(),
    allDay: schemaContructor.boolean(),
  }),
  crm_function: schemaContructor.subObject('name'),
  crm_lead: schemaContructor.object({
    name: schemaContructor.string(),
    fullName: schemaContructor.string(),
    enterpriseName: schemaContructor.string(),
    firstName: schemaContructor.string(),
    simpleFullName: schemaContructor.string(),
    leadStatus: schemaContructor.subObject('name'),
    address: addressModel,
    emailAddress: schemaContructor.subObject('address'),
    mobilePhone: schemaContructor.string(),
    fixedPhone: schemaContructor.string(),
    webSite: schemaContructor.string(),
    user: schemaContructor.subObject('fullName'),
    isDoNotSendEmail: schemaContructor.boolean(),
    isDoNotCall: schemaContructor.boolean(),
    jobTitleFunction: schemaContructor.subObject('name'),
    description: schemaContructor.string(),
    type: schemaContructor.subObject('name'),
    industrySector: schemaContructor.subObject('name'),
    eventList: schemaContructor.array().of(schemaContructor.subObject()),
    leadScoringSelect: schemaContructor.number(),
    titleSelect: schemaContructor.number(),
  }),
  crm_leadStatus: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  crm_prospectStatus: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  crm_opportunity: schemaContructor.object({
    description: schemaContructor.string(),
    expectedCloseDate: schemaContructor.string(),
    name: schemaContructor.string(),
    opportunitySeq: schemaContructor.string(),
    opportunityStatus: schemaContructor.subObject('name'),
    opportunityRating: schemaContructor.number(),
    partner: schemaContructor.subObject('partnerSeq'),
    amount: schemaContructor.number(),
    currency: schemaContructor.subObject('symbol'),
    recurrentAmount: schemaContructor.number(),
    user: schemaContructor.subObject('fullName'),
    contact: schemaContructor.subObject(),
  }),
  crm_opportunityStatus: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  crm_partner: getPartnerModel({
    mainAddress: addressModel,
    fixedPhone: schemaContructor.string(),
    mobilePhone: schemaContructor.string(),
    emailAddress: schemaContructor.subObject('address'),
    user: schemaContructor.subObject('fullName'),
    industrySector: schemaContructor.subObject('name'),
    partnerCategory: schemaContructor.subObject('name'),
    webSite: schemaContructor.string(),
    picture: schemaContructor.subObject('fileName'),
    salePartnerPriceList: schemaContructor.subObject('label'),
    contactPartnerSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  crm_prospect: getPartnerModel({
    mainAddress: addressModel,
    fixedPhone: schemaContructor.string(),
    mobilePhone: schemaContructor.string(),
    emailAddress: schemaContructor.subObject('address'),
    user: schemaContructor.subObject('fullName'),
    industrySector: schemaContructor.subObject('name'),
    partnerCategory: schemaContructor.subObject('name'),
    webSite: schemaContructor.string(),
    picture: schemaContructor.subObject('fileName'),
    partnerStatus: schemaContructor.subObject('name'),
    contactPartnerSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  crm_tour: schemaContructor.object({
    name: schemaContructor.string(),
    salespersonUser: schemaContructor.subObject(),
    date: schemaContructor.string(),
  }),
  crm_tourLine: schemaContructor.object({
    tourLineOrder: schemaContructor.number(),
    isValidated: schemaContructor.boolean(),
    partner: schemaContructor.subObject(),
    address: schemaContructor.subObject(),
    event: schemaContructor.subObject(),
  }),
};
