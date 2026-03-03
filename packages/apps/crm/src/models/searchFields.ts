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

import {SearchFields} from '@axelor/aos-mobile-core';

export const crm_searchFields: SearchFields = {
  crm_catalog: ['name', 'catalogType.name'],
  crm_client: [
    'simpleFullName',
    'partnerSeq',
    'mainAddress.fullName',
    'mobilePhone',
    'fixedPhone',
    'emailAddress.name',
  ],
  crm_contact: [
    'simpleFullName',
    'partnerSeq',
    'mainAddress.fullName',
    'fixedPhone',
    'emailAddress.name',
  ],
  crm_event: ['contactPartner.fullName'],
  crm_function: ['code', 'name'],
  crm_lead: [
    'simpleFullName',
    'enterpriseName',
    'address.fullName',
    'mobilePhone',
    'fixedPhone',
    'emailAddress.name',
  ],
  crm_opportunity: ['opportunitySeq', 'name'],
  crm_partner: [
    'simpleFullName',
    'partnerSeq',
    'mainAddress.fullName',
    'mobilePhone',
    'fixedPhone',
    'emailAddress.name',
  ],
  crm_prospect: [
    'simpleFullName',
    'partnerSeq',
    'mainAddress.fullName',
    'mobilePhone',
    'fixedPhone',
    'emailAddress.name',
  ],
  crm_tour: ['name', 'salespersonUser', 'date'],
};
