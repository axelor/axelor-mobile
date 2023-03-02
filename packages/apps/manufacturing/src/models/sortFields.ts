import {SortFields} from '@axelor/aos-mobile-core';

export const manufacturing_sortFields: SortFields = {
  manufacturing_manufacturingOrder: [
    'statusSelect',
    '-realStartDateT',
    'plannedStartDateT',
    'manufOrderSeq',
  ],
  manufacturing_operationOrder: [
    'manufOrder.manufOrderSeq',
    'statusSelect',
    'priority',
  ],
  manufacturing_operationOrderPlanning: [
    'plannedStartDateT',
    'manufOrder.manufOrderSeq',
    'statusSelect',
  ],
  manufacturing_productionFile: ['sequence'],
};
