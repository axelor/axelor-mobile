import {SearchFields} from '@axelor/aos-mobile-core';

export const manufacturing_searchFields: SearchFields = {
  manufacturing_machine: ['name'],
  manufacturing_manufacturingOrder: ['manufOrderSeq'],
  manufacturing_operationOrder: ['manufOrder.manufOrderSeq'],
  manufacturing_workCenter: ['name'],
};
