import axios from 'axios';

export async function searchStockLocation() {
  return axios.get('/ws/rest/com.axelor.apps.stock.db.StockLocation/');
}
