import axios from 'axios';

export async function searchStockCorrection() {
  return axios.get('/ws/rest/com.axelor.apps.stock.db.StockCorrection/');
}
