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

import {SortFields} from '@axelor/aos-mobile-core';

export const crm_sortFields: SortFields = {
  crm_catalog: ['name', 'catalogType.name', 'createdOn'],
  crm_client: ['name', 'partnerSeq', 'createdOn'],
  crm_contact: ['name', 'createdOn'],
  crm_event: ['startDateTime'],
  crm_function: ['name'],
  crm_lead: ['leadStatus', 'enterpriseName', 'createdOn'],
  crm_opportunity: ['opportunityStatus.sequence', 'expectedCloseDate'],
  crm_opportunityStatus: ['sequence'],
  crm_prospect: ['name', 'partnerSeq', 'createdOn'],
  crm_tour: ['-date'],
  crm_tourLine: ['tourLineOrder'],
};
