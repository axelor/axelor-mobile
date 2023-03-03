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
  crm_lead: [
    'simpleFullName',
    'enterpriseName',
    'primaryAddress',
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
};
