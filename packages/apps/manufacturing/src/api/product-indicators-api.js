/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {createStandardSearch, getTypes} from '@axelor/aos-mobile-core';
import {ProductIndicator} from '../types';

const createManufacturingQtyCriteria = (indicatorType, productId) => {
  const StockMove = getTypes().StockMove;
  const StockMoveLine = getTypes().StockMoveLine;
  const StockLocation = getTypes().StockLocation;
  const ManufOrder = getTypes().ManufOrder;
  const OperationOrder = getTypes().OperationOrder;

  const defaultCriteria = [
    {
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    },
    {
      fieldName: 'stockMove.statusSelect',
      operator: '=',
      value: StockMove?.statusSelect.Planned,
    },
  ];

  if (indicatorType === ProductIndicator.type.BuildingQty) {
    const buildingCriteria = [
      {
        fieldName: 'toStockLocation.typeSelect',
        operator: '!=',
        value: StockLocation?.typeSelect.virtual,
      },
      {
        fieldName: 'producedManufOrder.statusSelect',
        operator: 'in',
        value: [
          ManufOrder?.statusSelect.Planned,
          ManufOrder?.statusSelect.InProgress,
          ManufOrder?.statusSelect.StandBy,
        ],
      },
    ];

    return defaultCriteria.concat(buildingCriteria);
  } else {
    const MOCriteria = [
      {
        fieldName: 'fromStockLocation.typeSelect',
        operator: '!=',
        value: StockLocation?.typeSelect.virtual,
      },
      {
        operator: 'or',
        criteria: [
          {
            fieldName: 'consumedManufOrder.statusSelect',
            operator: 'in',
            value: [
              ManufOrder?.statusSelect.Planned,
              ManufOrder?.statusSelect.InProgress,
              ManufOrder?.statusSelect.StandBy,
            ],
          },
          {
            fieldName: 'consumedOperationOrder.statusSelect',
            operator: 'in',
            value: [
              OperationOrder?.statusSelect.Planned,
              OperationOrder?.statusSelect.InProgress,
              OperationOrder?.statusSelect.StandBy,
            ],
          },
        ],
      },
    ];

    if (indicatorType === ProductIndicator.type.MissingMOQty) {
      MOCriteria.push({
        fieldName: 'availableStatus',
        operator: '=',
        value: StockMoveLine?.availableStatus.Missing,
      });
    }

    return defaultCriteria.concat(MOCriteria);
  }
};

export async function fetchManufacturingQtyIndicator({
  indicatorType,
  productId,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    companyId,
    companyFieldName: 'stockMove.company',
    criteria: createManufacturingQtyCriteria(indicatorType, productId),
    fieldKey: 'manufacturing_manufacturingQtyIndicator',
    page,
    provider: 'model',
  });
}
