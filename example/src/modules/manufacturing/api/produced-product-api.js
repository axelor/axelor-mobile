import {axiosApiProvider} from '@aos-mobile/core';

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
