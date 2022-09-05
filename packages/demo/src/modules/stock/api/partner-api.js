import axios from 'axios';

const partnerFields = [
  'id',
  'partnerSeq',
  'fullName',
  'name',
  'firstName',
  'simpleFullName',
];

export async function searchSuppliers() {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Partner/search', {
    data: {
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
              fieldName: 'isSupplier',
              operator: '=',
              value: true,
            },
          ],
        },
      ],
    },
    fields: partnerFields,
    limit: 50,
    offset: 0,
  });
}

export async function searchSuppliersFilter({searchValue, page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Partner/search', {
    data: {
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
              fieldName: 'isSupplier',
              operator: '=',
              value: true,
            },
            {
              operator: 'or',
              criteria: [
                {
                  fieldName: 'fullName',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'partnerSeq',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'name',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'firstName',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'simpleFullName',
                  operator: 'like',
                  value: searchValue,
                },
              ],
            },
          ],
        },
      ],
    },
    fields: partnerFields,
    limit: 10,
    offset: 10 * page,
  });
}

export async function searchClient() {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Partner/search', {
    data: {
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
              operator: 'or',
              criteria: [
                {
                  fieldName: 'isCustomer',
                  operator: '=',
                  value: true,
                },
                {
                  fieldName: 'isProspect',
                  operator: '=',
                  value: true,
                },
              ],
            },
          ],
        },
      ],
    },
    fields: partnerFields,
    limit: 50,
    offset: 0,
  });
}

export async function searchClientsFilter({searchValue, page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.base.db.Partner/search', {
    data: {
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
              operator: 'or',
              criteria: [
                {
                  fieldName: 'isCustomer',
                  operator: '=',
                  value: true,
                },
                {
                  fieldName: 'isProspect',
                  operator: '=',
                  value: true,
                },
              ],
            },
            {
              operator: 'or',
              criteria: [
                {
                  fieldName: 'fullName',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'partnerSeq',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'name',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'firstName',
                  operator: 'like',
                  value: searchValue,
                },
                {
                  fieldName: 'simpleFullName',
                  operator: 'like',
                  value: searchValue,
                },
              ],
            },
          ],
        },
      ],
    },
    fields: partnerFields,
    limit: 10,
    offset: 10 * page,
  });
}
