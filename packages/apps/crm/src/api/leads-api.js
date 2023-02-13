import {axiosApiProvider} from '@axelor/aos-mobile-core';

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
  'leadScoringSelect',
  'name',
  'titleSelect',
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

export async function getLead({leadId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.crm.db.Lead/${leadId}/fetch`,
    data: {
      fields: crmLeadsFields,
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

export async function updateLeadScoring({leadId, leadVersion, newScore}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Lead',
    data: {
      data: {
        id: leadId,
        version: leadVersion,
        leadScoringSelect: newScore,
      },
    },
  });
}

export async function updateLead({
  leadId,
  leadVersion,
  leadCivility,
  leadFirstname,
  leadName,
  leadNoCall,
  leadNoEmail,
  leadCompany,
  leadJob,
  leadAdress,
  leadFixedPhone,
  leadMobilePhone,
  leadEmail,
  leadWebsite,
  leadDescription,
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
          address: leadEmail,
        },
      },
    })
    .then(res =>
      axiosApiProvider.post({
        url: '/ws/rest/com.axelor.apps.crm.db.Lead',
        data: {
          data: {
            id: leadId,
            version: leadVersion,
            titleSelect: leadCivility,
            firstName: leadFirstname,
            name: leadName,
            isDoNotSendEmail: leadNoEmail,
            isDoNotCall: leadNoCall,
            enterpriseName: leadCompany,
            primaryAddress: leadAdress,
            jobTitleFunction: {
              id: leadJob,
            },
            fixedPhone: leadFixedPhone,
            mobilePhone: leadMobilePhone,
            webSite: leadWebsite,
            description: leadDescription,
          },
        },
      }),
    );
}
