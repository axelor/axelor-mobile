import {
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createCustomerCriteria = searchValue => {
  return [
    {
      fieldName: 'isCustomer',
      operator: '=',
      value: true,
    },
    getSearchCriterias('helpdesk_customer', searchValue),
  ];
};

export async function searchCustomer({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createCustomerCriteria(searchValue),
    fieldKey: 'helpdesk_customer',
    sortKey: 'helpdesk_customer',
    numberElementsByPage: null,
    page: 0,
  });
}
