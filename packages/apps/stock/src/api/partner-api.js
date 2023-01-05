import {axiosApiProvider} from '@axelor/aos-mobile-core';

const partnerFields = [
  'id',
  'partnerSeq',
  'fullName',
  'name',
  'firstName',
  'simpleFullName',
];

export async function searchSuppliersFilter({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search',
    data: {
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
    },
  });
}

export async function searchClientsFilter({searchValue, page = 0}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search',
    data: {
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
    },
  });
}
