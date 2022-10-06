import {axiosApiProvider} from '@aos-mobile/core';

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
