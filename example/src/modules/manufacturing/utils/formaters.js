import {splitInTwo} from '@aos-mobile/core';

export function splitSaleOrderRef(saleOrderRef) {
  const saleOrderDetails = splitInTwo(saleOrderRef, '-');
  return {ref: saleOrderDetails[0], client: saleOrderDetails[1]};
}
