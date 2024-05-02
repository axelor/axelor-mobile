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

export {
  createCatalog as createCatalogApi,
  getCatalogType,
  searchCatalog,
} from './catalog-api';
export {
  getClient,
  searchClient,
  updateClient as updateClientApi,
} from './client-api';
export * from './company-api';
export {
  getContact as getContactApi,
  searchContact,
  searchContactWithIds,
  updateContact as updateContactApi,
} from './contact-api';
export {
  contactEventById,
  createEvent as createEventApi,
  getEvent,
  getPlannedEvent,
  partnerEventById,
  searchEventsByIds,
  updateEvent as updateEventApi,
} from './event-api';
export * from './function-api';
export {
  createLead as createLeadApi,
  getLead,
  getLeadStatus,
  searchLeads,
  updateLead as updateLeadApi,
  updateLeadScoring,
} from './leads-api';
export {
  createOpportunity as createOpportunityApi,
  getOpportunity as getOpportunityApi,
  getOpportunityStatus,
  getPartnerOpportunities as getPartnerOpportunitiesApi,
  searchOpportunities,
  updateOpportunity as updateOpportunityApi,
  updateOpportunityScoring,
  updateOpportunityStatus as updateOpportunityStatusApi,
} from './opportunities-api';
export {
  getPartner,
  searchClientAndProspect,
  searchLinkedPartnersOfContact as searchLinkedPartnersOfContactApi,
  searchPartner as searchPartnerApi,
} from './partner-api';
export {
  getProspect,
  getProspectStatus,
  searchProspect,
  updateProspect as updateProspectApi,
  updateProspectScoring,
} from './prospect-api';
export {
  fetchTourById as fetchTourByIdApi,
  searchTour as searchTourApi,
  validateTour as validateTourApi,
} from './tour-api';
export {
  searchTourLine as searchTourLineApi,
  updateTourLine as updateTourLineApi,
  validateTourLine as validateTourLineApi,
} from './tour-line-api';
