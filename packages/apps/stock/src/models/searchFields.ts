import {SearchFields} from '@axelor/aos-mobile-core';

export const stock_searchFields: SearchFields = {
  stock_customerDelivery: ['stockMoveSeq'],
  stock_internalMove: ['stockMoveSeq'],
  stock_inventory: ['inventorySeq'],
  stock_partner: [
    'fullName',
    'partnerSeq',
    'name',
    'firstName',
    'simpleFullName',
  ],
  stock_product: ['name', 'code', 'serialNumber'],
  stock_stockLocation: ['name', 'serialNumber'],
  stock_supplierArrival: ['stockMoveSeq'],
  stock_trackingNumber: ['trackingNumberSeq', 'serialNumber'],
};
