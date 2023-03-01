import {SortFields} from '@axelor/aos-mobile-core';

export const stock_sortFields: SortFields = {
  stock_customerDelivery: [
    'statusSelect',
    '-realDate',
    'estimatedDate',
    'stockMoveSeq',
  ],
  stock_internalMove: [
    'statusSelect',
    '-realDate',
    'estimatedDate',
    'stockMoveSeq',
  ],
  stock_inventory: [
    'statusSelect',
    '-validatedOn',
    'plannedStartDateT',
    'inventorySeq',
  ],
  stock_product: ['name'],
  stock_stockCorrection: ['statusSelect', '-validationDateT', 'createdOn'],
  stock_supplierArrival: [
    'statusSelect',
    '-realDate',
    'estimatedDate',
    'stockMoveSeq',
  ],
  stock_trackingNumber: ['trackingNumberSeq'],
};
