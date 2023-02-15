import {axiosApiProvider} from '@axelor/aos-mobile-core';

const opportunityFields = [
  'amount',
  'currency.symbol',
  'description',
  'expectedCloseDate',
  'name',
  'opportunitySeq',
  'opportunityStatus',
  'opportunityRating',
  'partner',
  'recurrentAmount',
  'user',
];

const sortByFields = ['opportunityStatus.sequence', 'expectedCloseDate'];

const createOpportunityCriteria = searchValue => {
  let criterias = [];
  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'opportunitySeq',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'name',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  return criterias;
};

export async function searchOpportunities({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Opportunity/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createOpportunityCriteria(searchValue),
          },
        ],
      },
      fields: opportunityFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getOpportunityStatus() {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.OpportunityStatus/search',
    data: {
      fields: ['name', 'sequence'],
      sortBy: ['sequence'],
    },
  });
}

export async function getOpportunity({opportunityId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.crm.db.Opportunity/${opportunityId}/fetch`,
    data: {
      fields: opportunityFields,
      related: {
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
