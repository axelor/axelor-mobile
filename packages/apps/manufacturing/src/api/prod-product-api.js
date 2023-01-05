import {axiosApiProvider} from '@axelor/aos-mobile-core';

export async function fetchManufacturingOrderConsumedProducts({
  manufOrderId,
  manufOrderVersion,
}) {
  return axiosApiProvider.post({
    url: '/ws/aos/manuf-order/consumed-products/fetch',
    data: {
      manufOrderId: manufOrderId,
      manufOrderVersion: manufOrderVersion,
    },
  });
}

export async function fetchManufacturingOrderProducedProducts({
  manufOrderId,
  manufOrderVersion,
}) {
  return axiosApiProvider.post({
    url: '/ws/aos/manuf-order/produced-products/fetch',
    data: {
      manufOrderId: manufOrderId,
      manufOrderVersion: manufOrderVersion,
    },
  });
}

export async function createProdProduct({
  manufOrderId,
  manufOrderVersion,
  productId,
  trackingNumberId,
  qty,
  productType,
}) {
  return axiosApiProvider.post({
    url: `ws/aos/manuf-order/${manufOrderId}/add-product`,
    data: {
      version: manufOrderVersion,
      productId: productId,
      trackingNumberId: trackingNumberId,
      qty: qty,
      productType: productType,
    },
  });
}

export async function updateProdProduct({
  stockMoveLineVersion,
  stockMoveLineId,
  prodProductQty,
}) {
  return axiosApiProvider.put({
    url: 'ws/aos/manuf-order/update-product-qty',
    data: {
      version: stockMoveLineVersion,
      stockMoveLineId: stockMoveLineId,
      prodProductQty: prodProductQty,
    },
  });
}
