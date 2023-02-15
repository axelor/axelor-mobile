import {axiosApiProvider} from '@axelor/aos-mobile-core';

const partnerFields = [
  'simpleFullName',
  'name',
  'fullName',
  'partnerSeq',
  'mainAddress',
  'fixedPhone',
  'mobilePhone',
  'emailAddress',
  'emailAddress.address',
  'user',
  'industrySector',
  'partnerCategory',
  'description',
  'webSite',
  'picture',
  'isCustomer',
  'isProspect',
  'salePartnerPriceList',
  'contactPartnerSet',
  'description',
];

export async function getPartner({partnerId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.base.db.Partner/${partnerId}/fetch`,
    data: {
      fields: partnerFields,
    },
  });
}

const createClientAndProspectCriteria = searchValue => {
  let criterias = [];
  criterias.push({
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

export async function searchClientAndProspect({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createClientAndProspectCriteria(searchValue),
          },
        ],
      },
      fields: partnerFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}
