import {axiosApiProvider} from '@axelor/aos-mobile-core';

const opportunityFields = [
  'opportunitySeq',
  'name',
  'expectedCloseDate',
  'opportunityStatus',
  'amount',
  'currency.symbol',
  'opportunityRating',
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
