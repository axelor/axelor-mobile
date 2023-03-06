import {
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createContactCriteria = searchValue => {
  return [
    {
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
    },
    getSearchCriterias('crm_contact', searchValue),
  ];
};

export async function searchContactWithIds(idList) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: [
      {
        fieldName: 'id',
        operator: 'in',
        value: idList,
      },
    ],
    fieldKey: 'crm_contact',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function searchContact({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createContactCriteria(searchValue),
    fieldKey: 'crm_contact',
    sortKey: 'crm_contact',
    page,
  });
}

export async function getContact({contactId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: contactId,
    fieldKey: 'crm_contact',
  });
}

export async function updateContact({
  contactId,
  contactVersion,
  contactCivility,
  contactFirstname,
  contactName,
  contactFixedPhone,
  contactMobilePhone,
  contactWebsite,
  contactDescription,
  mainPartnerId,
  contactEmail,
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
          address: contactEmail,
        },
      },
    })
    .then(res =>
      axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        data: {
          data: {
            id: contactId,
            version: contactVersion,
            titleSelect: contactCivility,
            firstName: contactFirstname,
            name: contactName,
            fixedPhone: contactFixedPhone,
            mobilePhone: contactMobilePhone,
            webSite: contactWebsite,
            description: contactDescription,
            mainPartner: {id: mainPartnerId},
          },
        },
      }),
    );
}
