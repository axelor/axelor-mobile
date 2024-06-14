import {createStandardFetch} from '@axelor/aos-mobile-core';

export async function fetchSaleConfig({companyId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.sale.db.SaleConfig',
    id: companyId,
    fieldKey: 'sale_saleConfig',
  });
}
