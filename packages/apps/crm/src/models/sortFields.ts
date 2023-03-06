import {SortFields} from '@axelor/aos-mobile-core';

export const crm_sortFields: SortFields = {
  crm_catalog: ['name', 'catalogType.name', 'createdOn'],
  crm_client: ['name', 'partnerSeq', 'createdOn'],
  crm_contact: ['name', 'createdOn'],
  crm_event: ['startDateTime'],
  crm_lead: ['leadStatus', 'enterpriseName', 'createdOn'],
  crm_opportunity: ['opportunityStatus.sequence', 'expectedCloseDate'],
  crm_opportunityStatus: ['sequence'],
  crm_prospect: ['name', 'partnerSeq', 'createdOn'],
};
