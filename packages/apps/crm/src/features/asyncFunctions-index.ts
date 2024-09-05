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

export {createCatalog, fetchCatalog, fetchCatalogType} from './catalogSlice';
export {
  createClient,
  fetchClients,
  getClientbyId,
  updateClient,
} from './clientSlice';
export {fetchCompanyById} from './companySlice';
export {
  fetchContact,
  getContact,
  searchContactById,
  updateContact,
} from './contactSlice';
export {
  createEvent,
  fetchContactEventById,
  fetchEventById,
  fetchPartnerEventById,
  fetchPlannedEvent,
  searchEventById,
  updateEvent,
} from './eventSlice';
export {fetchFunction} from './functionSlice';
export {
  createLead,
  fetchLeadById,
  fetchLeads,
  fetchLeadStatus,
  updateLead,
  updateLeadScore,
} from './leadSlice';
export {
  createOpportunity,
  fetchOpportunities,
  fetchOpportunityStatus,
  getOpportunity,
  getPartnerOpportunities,
  updateOpportunity,
  updateOpportunityScore,
  updateOpportunityStatus,
} from './opportunitySlice';
export {
  fetchClientAndProspect,
  fetchPartner,
  searchLinkedPartnersOfContact,
  searchPartner,
} from './partnerSlice';
export {
  fetchProspectById,
  fetchProspects,
  fetchProspectStatus,
  updateProspect,
  updateProspectScore,
} from './prospectSlice';
export {
  searchTourLine,
  updateTourLine,
  validateTourLine,
} from './tourLineSlice';
export {fetchTourById, searchTour, validateTour} from './tourSlice';
