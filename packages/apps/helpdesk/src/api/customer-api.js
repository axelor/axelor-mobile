import {createStandardSearch} from '@axelor/aos-mobile-core';

const createCustomerCriteria = () => {
  return [
    {
      fieldName: 'isCustomer',
      operator: '=',
      value: true,
    },
  ];
};

export async function searchCustomer() {
  return createStandardSearch({
    model: 'com.axelor.apps.base.db.Partner',
    criteria: createCustomerCriteria(),
    fieldKey: 'helpdesk_customer',
    sortKey: 'helpdesk_customer',
    numberElementsByPage: null,
    page: 0,
  });
}
