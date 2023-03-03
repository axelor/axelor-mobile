import {
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createProspectCriteria = searchValue => {
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
          fieldName: 'isProspect',
          operator: '=',
          value: true,
        },
      ],
    },
    getSearchCriterias('crm_prospect', searchValue),
  ];
};

export async function searchProspect({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createProspectCriteria(searchValue),
    fieldKey: 'crm_prospect',
    sortKey: 'crm_prospect',
    page,
  });
}

export async function getProspect({partnerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Partner',
    id: partnerId,
    fieldKey: 'crm_prospect',
  });
}

export async function updateProspectScoring({
  partnerId,
  partnerVersion,
  newScore,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner',
    data: {
      data: {
        id: partnerId,
        version: partnerVersion,
        leadScoringSelect: newScore,
      },
    },
  });
}

export async function updateProspect({
  prospectId,
  prospectVersion,
  prospectScore,
  prospectName,
  prospectFixedPhone,
  prospectEmail,
  prospectWebsite,
  prospectDescription,
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
          address: prospectEmail,
        },
      },
    })
    .then(res =>
      axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.base.db.Partner',
        data: {
          data: {
            id: prospectId,
            version: prospectVersion,
            leadScoringSelect: prospectScore,
            name: prospectName,
            fixedPhone: prospectFixedPhone,
            webSite: prospectWebsite,
            description: prospectDescription,
          },
        },
      }),
    );
}
