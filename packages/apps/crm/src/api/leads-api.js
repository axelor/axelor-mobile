import {axiosApiProvider} from '@aos-mobile/core';

const crmLeadsFields = [
  'enterpriseName',
  'fullName',
  'fixedPhone',
  'firstName',
  'leadStatus',
  'mobilePhone',
  'fixedPhone',
  'primaryPostalCode',
  'emailAddress',
  'emailAddress.address',
  'primaryAddress',
  'leadScoring',
  'simpleFullName',
  'user',
  'isDoNotSendEmail',
  'isDoNotCall',
  'jobTitleFunction',
  'description',
  'webSite',
  'type',
  'industrySector',
  'eventList',
];

const sortByFields = ['leadStatus', 'enterpriseName', 'createdOn'];

const createLeadCriteria = searchValue => {
  let criterias = [];
  criterias.push({
    fieldName: 'leadStatus.isOpen',
    operator: '=',
    value: true,
  });
  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'simpleFullName',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'enterpriseName',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'primaryAddress',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'mobilePhone',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'fixedPhone',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'emailAddress.name',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  return criterias;
};

export async function searchLeads({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Lead/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createLeadCriteria(searchValue),
          },
        ],
      },
      fields: crmLeadsFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getLeadStatus() {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.LeadStatus/search',
    data: {
      data: {
        criteria: [
          {
            fieldName: 'isOpen',
            operator: '=',
            value: true,
          },
        ],
      },
    },
  });
}
