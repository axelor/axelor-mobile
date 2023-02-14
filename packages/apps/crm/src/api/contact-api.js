import {axiosApiProvider} from '@axelor/aos-mobile-core';

const contactFields = [
  'simpleFullName',
  'fixedPhone',
  'emailAddress.address',
  'mainPartner',
  'mainAddress',
  'partnerSeq',
  'picture',
  'jobTitleFunction',
  'description',
  'webSite',
  'language',
  'mobilePhone',
];

export async function searchContactWithIds(idList) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'in',
            fieldName: 'id',
            value: idList,
          },
        ],
      },
      fields: contactFields,
    },
  });
}

const sortByFields = ['name', 'createdOn'];

const createContactCriteria = searchValue => {
  let criterias = [];
  criterias.push({
    operator: 'and',
    criteria: [
      {
        fieldName: 'isContact',
        operator: '=',
        value: true,
      },
      {
        operator: 'or',
        criteria: [
          {
            fieldName: 'mainPartner.isCustomer',
            operator: '=',
            value: true,
          },
          {
            fieldName: 'mainPartner.isProspect',
            operator: '=',
            value: true,
          },
        ],
      },
    ],
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
          fieldName: 'partnerSeq',
          operator: 'like',
          value: searchValue,
        },
        {
          fieldName: 'mainAddress.fullName',
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

export async function searchContact({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createContactCriteria(searchValue),
          },
        ],
      },
      fields: contactFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getContact({contactId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.base.db.Partner/${contactId}/fetch`,
    data: {
      fields: contactFields,
    },
  });
}
