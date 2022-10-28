import {axiosApiProvider} from '@aos-mobile/core';

export async function searchStockCorrectionReason() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.stock.db.StockCorrectionReason',
  });
}
