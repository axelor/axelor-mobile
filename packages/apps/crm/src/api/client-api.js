import {axiosApiProvider} from '@axelor/aos-mobile-core';

const clientFields = [
  'simpleFullName',
  'name',
  'fullName',
  'partnerSeq',
  'mainAddress',
  'fixedPhone',
  'mobilePhone',
  'leadScoring',
  'emailAddress',
  'emailAddress.address',
  'user',
  'industrySector',
  'partnerCategory',
  'description',
  'webSite',
  'contactPartnerSet',
  'picture',
  'salePartnerPriceList',
];

const sortByFields = ['name', 'partnerSeq', 'createdOn'];

const createClientCriteria = searchValue => {
  let criterias = [];
  criterias.push({
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

export async function searchClient({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createClientCriteria(searchValue),
          },
        ],
      },
      fields: clientFields,
      sortBy: sortByFields,
      limit: 10,
      offset: 10 * page,
    },
  });
}

export async function getClient({clientId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.base.db.Partner/${clientId}/fetch`,
    data: {
      fields: clientFields,
    },
  });
}

export async function updateClient({
  clientId,
  clientVersion,
  clientName,
  clientFixedPhone,
  clientWebsite,
  clientDescription,
  clientEmail,
  emailId,
  emailVersion,
}) {
  return axiosApiProvider
    .post({
      url: '/ws/rest/com.axelor.apps.message.db.EmailAddress',
      data: {
        data: {
          id: emailId,
          version: emailVersion,
          address: clientEmail,
        },
      },
    })
    .then(res =>
      axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        data: {
          data: {
            id: clientId,
            version: clientVersion,
            name: clientName,
            fixedPhone: clientFixedPhone,
            webSite: clientWebsite,
            description: clientDescription,
          },
        },
      }),
    );
}
