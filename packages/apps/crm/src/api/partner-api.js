import {
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createClientAndProspectCriteria = searchValue => {
  return [
    {
      operator: 'or',
      criteria: [
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'isContact',
              operator: '=',
              value: false,
            },
            {
              fieldName: 'isCustomer',
              operator: '=',
              value: true,
            },
          ],
        },
        {
          operator: 'and',
          criteria: [
            {
              fieldName: 'isContact',
              operator: '=',
              value: false,
            },
            {
              fieldName: 'isProspect',
              operator: '=',
              value: true,
            },
          ],
        },
      ],
    },
    getSearchCriterias('crm_partner', searchValue),
  ];
};

export async function getPartner({partnerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: partnerId,
    fieldKey: 'crm_partner',
  });
}

export async function searchClientAndProspect({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createClientAndProspectCriteria(searchValue),
    fieldKey: 'crm_partner',
    page,
  });
}
