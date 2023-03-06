import {
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createClientCriteria = searchValue => {
  return [
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
    getSearchCriterias('crm_client', searchValue),
  ];
};

export async function searchClient({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createClientCriteria(searchValue),
    fieldKey: 'crm_client',
    sortKey: 'crm_client',
    page,
  });
}

export async function getClient({clientId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: clientId,
    fieldKey: 'crm_client',
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
