import {
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createOpportunityCriteria = searchValue => {
  return [getSearchCriterias('crm_opportunity', searchValue)];
};

export async function searchOpportunities({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Opportunity',
    criteria: createOpportunityCriteria(searchValue),
    fieldKey: 'crm_opportunity',
    sortKey: 'crm_opportunity',
    page,
  });
}

export async function getOpportunityStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.OpportunityStatus',
    fieldKey: 'crm_opportunityStatus',
    sortKey: 'crm_opportunityStatus',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function getOpportunity({opportunityId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.crm.db.Opportunity',
    id: opportunityId,
    fieldKey: 'crm_opportunityStatus',
    relatedFields: {
      currency: ['symbol'],
      partner: [
        'isCustomer',
        'isProspect',
        'partnerSeq',
        'picture',
        'simpleFullName',
      ],
      user: ['name'],
    },
  });
}

export async function updateOpportunityScoring({
  opportunityId,
  opportunityVersion,
  newScore,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    data: {
      data: {
        id: opportunityId,
        version: opportunityVersion,
        opportunityRating: newScore,
      },
    },
  });
}

export async function updateOpportunityStatus({
  opportunityId,
  version,
  opportunityStatusId,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    data: {
      records: [
        {
          id: opportunityId,
          version: version,
          opportunityStatus: {
            id: opportunityStatusId,
          },
        },
      ],
    },
  });
}

export async function updateOpportunity({
  opportunityId,
  opportunityVersion,
  opportunityAmount,
  opportunityRecurrentAmount,
  opportunityDescription,
  opportunityStatusId,
  idPartner,
  opportunityCloseDate,
  opportunityRating,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity',
    data: {
      data: {
        id: opportunityId,
        version: opportunityVersion,
        amount: opportunityAmount,
        recurrentAmount: opportunityRecurrentAmount,
        opportunityStatus: {id: opportunityStatusId},
        description: opportunityDescription,
        partner: {id: idPartner},
        expectedCloseDate: opportunityCloseDate,
        opportunityRating: opportunityRating,
      },
    },
  });
}
