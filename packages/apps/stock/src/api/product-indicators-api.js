/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

const createStockMoveQtyCriteria = (
  status,
  isAllocatedQty,
  productId,
  stockLocationId,
  companyId,
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
          value: stockLocationId.id,
        },
        {
          fieldName: 'fromStockLocation.id',
          operator: '=',
          value: stockLocationId.id,
        },
      ],
    });
  }

  if (companyId != null) {
    criteria.push({
      fieldName: 'stockMove.company.id',
      operator: '=',
      value: companyId,
    });
  }

  return criteria;
};

const createSaleOrderQtyCriteria = productId => {
  const SaleOrder = getTypes().SaleOrder;
  const SaleOrderLine = getTypes().SaleOrderLine;

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
  const PurchaseOrder = getTypes().PurchaseOrder;
  const PurchaseOrderLine = getTypes().PurchaseOrderLine;

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
    criteria: createStockMoveQtyCriteria(
      status,
      isAllocatedQty,
      productId,
      stockLocationId,
      companyId,
    ),
    fieldKey: 'stock_stockQtyIndicator',
    page,
  });
}

export async function fetchSaleOrderQtyIndicator({productId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrderLine',
    criteria: createSaleOrderQtyCriteria(productId),
    fieldKey: 'stock_saleOrderQtyIndicator',
    page,
  });
}

export async function fetchPurchaseOrderQtyIndicator({productId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.purchase.db.PurchaseOrderLine',
    criteria: createPurchaseOrderQtyCriteria(productId),
    fieldKey: 'stock_purchaseOrderQtyIndicator',
    page,
  });
}
