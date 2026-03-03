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

const createStockQtyCriteria = (
  status,
  isAllocatedQty,
  productId,
  stockLocationId,
) => {
  const criteria = [
    {
      fieldName: 'stockMove.statusSelect',
      operator: '=',
      value: status,
    },
    {
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    },
  ];

  if (isAllocatedQty) {
    criteria.push({
      fieldName: 'reservedQty',
      operator: '>',
      value: 0,
    });
  }

  if (stockLocationId != null) {
    criteria.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'toStockLocation.id',
          operator: '=',
          value: stockLocationId,
        },
        {
          fieldName: 'fromStockLocation.id',
          operator: '=',
          value: stockLocationId,
        },
      ],
    });
  }

  return criteria;
};

const createSaleOrderQtyCriteria = productId => {
  const SaleOrder = getTypes().Stock_SaleOrder;
  const SaleOrderLine = getTypes().Stock_SaleOrderLine;

  const criteria = [
    {
      fieldName: 'saleOrder.statusSelect',
      operator: '=',
      value: SaleOrder?.statusSelect.OrderConfirmed,
    },
    {
      fieldName: 'deliveryState',
      operator: '!=',
      value: SaleOrderLine?.deliveryState.Delivered,
    },
    {
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    },
  ];

  return criteria;
};

const createPurchaseOrderQtyCriteria = productId => {
  const PurchaseOrder = getTypes().Stock_PurchaseOrder;
  const PurchaseOrderLine = getTypes().Stock_PurchaseOrderLine;

  const criteria = [
    {
      fieldName: 'purchaseOrder.statusSelect',
      operator: '=',
      value: PurchaseOrder?.statusSelect.Validated,
    },
    {
      fieldName: 'receiptState',
      operator: '!=',
      value: PurchaseOrderLine?.receiptState.Received,
    },
    {
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    },
  ];

  return criteria;
};

const createAvailableStockCriteria = productId => {
  const StockLocation = getTypes().StockLocation;

  const criteria = [
    {
      fieldName: 'stockLocation.typeSelect',
      operator: '!=',
      value: StockLocation?.typeSelect.virtual,
    },
    {
      fieldName: 'stockLocation.isNotInCalculStock',
      operator: '=',
      value: false,
    },
    {
      operator: 'or',
      criteria: [
        {
          fieldName: 'currentQty',
          operator: '>',
          value: 0,
        },
        {
          fieldName: 'futureQty',
          operator: '>',
          value: 0,
        },
      ],
    },
    {
      fieldName: 'product.id',
      operator: '=',
      value: productId,
    },
  ];

  return criteria;
};

export async function fetchStockQtyIndicator({
  status,
  isAllocatedQty,
  productId,
  stockLocationId,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockMoveLine',
    companyId,
    companyFieldName: 'stockMove.company',
    criteria: createStockQtyCriteria(
      status,
      isAllocatedQty,
      productId,
      stockLocationId,
    ),
    fieldKey: 'stock_stockQtyIndicator',
    sortKey: 'stock_stockQtyIndicator',
    page,
    provider: 'model',
  });
}

export async function fetchSaleOrderQtyIndicator({
  productId,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrderLine',
    companyId,
    companyFieldName: 'saleOrder.company',
    criteria: createSaleOrderQtyCriteria(productId),
    fieldKey: 'stock_saleOrderQtyIndicator',
    sortKey: 'stock_saleOrderQtyIndicator',
    page,
    provider: 'model',
  });
}

export async function fetchPurchaseOrderQtyIndicator({
  productId,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.purchase.db.PurchaseOrderLine',
    companyId,
    companyFieldName: 'purchaseOrder.company',
    criteria: createPurchaseOrderQtyCriteria(productId),
    fieldKey: 'stock_purchaseOrderQtyIndicator',
    sortKey: 'stock_purchaseOrderQtyIndicator',
    page,
    provider: 'model',
  });
}

export async function fetchAvailableStockIndicator({
  productId,
  companyId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.stock.db.StockLocationLine',
    companyId,
    companyFieldName: 'stockLocation.company',
    criteria: createAvailableStockCriteria(productId),
    fieldKey: 'stock_stockLocationLine',
    sortKey: 'stock_stockLocationLine',
    page,
    provider: 'model',
  });
}
