import axios from 'axios';

export async function searchStockCorrection() {
  return axios.get('/ws/rest/com.axelor.apps.stock.db.StockCorrection/');
}

export async function createStockCorrection(data) {
  return axios.post('ws/aos/stock-correction/', {
    productId: data.productId,
    stockLocationId: data.stockLocationId,
    reasonId: data.reasonId,
    trackingNumberId: data.trackingNumberId,
    status: data.status,
    realQty: data.realQty,
  });
}

export async function updateStockCorrection(data) {
  return axios.put(`/ws/aos/stock-correction/${data.stockCorrectionId}`, {
    realQty: data.realQty,
    status: data.status,
  });
}
