import axios from 'axios';

export async function searchStockCorrectionReason() {
  return axios.get('/ws/rest/com.axelor.apps.stock.db.StockCorrectionReason');
}
