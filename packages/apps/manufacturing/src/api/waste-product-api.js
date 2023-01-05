import {axiosApiProvider} from '@axelor/aos-mobile-core';
import {fetchManufacturingOrder} from './manufacturing-order-api';

const createWasteProductCriteria = wasteProdProductList => {
  let criterias = [];
  if (wasteProdProductList != null && wasteProdProductList.length > 0) {
    wasteProdProductList.forEach(proProduct => {
      criterias.push({fieldName: 'id', operator: '=', value: proProduct?.id});
    });
  }
  return criterias;
};

export async function fetchManufacturingOrderWasteProducts({
  manufOrderId,
  page,
}) {
  return axiosApiProvider
    .get({
      url: `/ws/rest/com.axelor.apps.production.db.ManufOrder/${manufOrderId}`,
    })
    .then(res => {
      const manufOrder = res?.data?.data ? res?.data?.data[0] : null;
      if (
        manufOrder != null &&
        manufOrder.wasteProdProductList != null &&
        manufOrder.wasteProdProductList.length > 0
      ) {
        return axiosApiProvider.post({
          url: '/ws/rest/com.axelor.apps.production.db.ProdProduct/search',
          data: {
            data: {
              criteria: [
                {
                  operator: 'or',
                  criteria: createWasteProductCriteria(
                    manufOrder.wasteProdProductList,
                  ),
                },
              ],
            },
            fields: ['id', 'product', 'qty', 'unit'],
            limit: 10,
            offset: 10 * page,
          },
        });
      } else {
        return {data: {data: []}};
      }
    });
}

export async function createManufacturingOrderWasteProduct({
  manufOrderVersion,
  manufOrderId,
  productId,
  qty,
}) {
  return axiosApiProvider.post({
    url: `ws/aos/manuf-order/${manufOrderId}/waste-product`,
    data: {
      version: manufOrderVersion,
      productId: productId,
      qty: qty,
    },
  });
}

export async function updateManufacturingOrderWasteProduct({
  prodProductVersion,
  prodProductId,
  qty,
}) {
  return axiosApiProvider.put({
    url: `ws/aos/manuf-order/waste-product/${prodProductId}`,
    data: {
      version: prodProductVersion,
      qty: qty,
    },
  });
}

export async function declareManufacturingOrderWasteProduct({
  manufOrderVersion,
  manufOrderId,
}) {
  return axiosApiProvider
    .post({
      url: 'ws/action/',
      data: {
        action:
          'com.axelor.apps.production.web.ManufOrderController:generateWasteStockMove',
        data: {
          context: {
            _model: 'com.axelor.apps.production.db.ManufOrder',
            id: manufOrderId,
            version: manufOrderVersion,
          },
        },
        model: 'com.axelor.apps.production.db.ManufOrder',
      },
    })
    .then(result => {
      if (result?.data?.status === 0) {
        return fetchManufacturingOrder({manufOrderId}).then(
          manufOrderResult => {
            const manufOrder =
              manufOrderResult?.data?.data && manufOrderResult?.data?.data[0];
            return {
              data: {
                messageStatus: `Waste products declared in stock move ${manufOrder?.wasteStockMove?.stockMoveSeq}`,
                data: [
                  {
                    stockMoveCreated: true,
                    wasteStockMove: manufOrder?.wasteStockMove,
                  },
                ],
              },
            };
          },
        );
      } else {
        return {
          data: {
            messageStatus: 'Could not declare waste products',
            data: [{stockMoveCreated: false, wasteStockMove: null}],
          },
        };
      }
    });
}
