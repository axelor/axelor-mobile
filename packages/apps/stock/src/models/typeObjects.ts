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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const stock_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.base.db.Product',
    fields: {
      procurementMethodSelect: {
        content: [
          {
            key: 'Buy',
            value: 'buy',
            title: 'Stock_Procurement_Buy',
          },
          {
            key: 'Produce',
            value: 'produce',
            title: 'Stock_Procurement_Produce',
          },
          {
            key: 'BuyAndProduce',
            value: 'buyAndProduce',
            title: 'Stock_Procurement_BuyProduce',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.base.db.ProductVariantValue',
    fields: {
      applicationPriceSelect: {
        content: [
          {
            key: 'SalePrice',
            value: 0,
            title: 'Stock_Application_SalePrice',
          },
          {
            key: 'CostPrice',
            value: 1,
            title: 'Stock_Application_CostPrice',
          },
          {
            key: 'PurchasePrice',
            value: 2,
            title: 'Stock_Application_PurchasePrice',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.stock.db.StockCorrection',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Stock_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'Validated',
            value: 2,
            title: 'Stock_Status_Validated',
            color: 'successColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.stock.db.StockLocation',
    fields: {
      typeSelect: {
        content: [
          {
            key: 'internal',
            value: 1,
            title: null,
          },
          {
            key: 'external',
            value: 2,
            title: null,
          },
          {
            key: 'virtual',
            value: 3,
            title: null,
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.stock.db.Inventory',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Stock_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'Planned',
            value: 2,
            title: 'Stock_Status_Planned',
            color: 'plannedColor',
          },
          {
            key: 'InProgress',
            value: 3,
            title: 'Stock_Status_InProgress',
            color: 'progressColor',
          },
          {
            key: 'Completed',
            value: 4,
            title: 'Stock_Status_Completed',
            color: 'priorityColor',
          },
          {
            key: 'Validated',
            value: 5,
            title: 'Stock_Status_Validated',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 6,
            title: 'Stock_Status_Canceled',
            color: 'errorColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.stock.db.StockMove',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Stock_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'Planned',
            value: 2,
            title: 'Stock_Status_Planned',
            color: 'plannedColor',
          },
          {
            key: 'Realized',
            value: 3,
            title: 'Stock_Status_Realized',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 4,
            title: 'Stock_Status_Canceled',
            color: 'errorColor',
          },
        ],
      },
      typeSelect: {
        content: [
          {
            key: 'internal',
            value: 1,
            title: null,
          },
          {
            key: 'outgoing',
            value: 2,
            title: null,
          },
          {
            key: 'incoming',
            value: 3,
            title: null,
          },
        ],
      },
      availableStatusSelect: {
        content: [
          {
            key: 'Available',
            value: 1,
            title: 'Stock_Available',
            color: 'successColor',
          },
          {
            key: 'Partially_available',
            value: 2,
            title: 'Stock_Partially',
            color: 'cautionColor',
          },
          {
            key: 'Unavailable',
            value: 3,
            title: 'Stock_Unavailable',
            color: 'errorColor',
          },
        ],
      },
      conformitySelect: {
        content: [
          {
            key: 'Unknown',
            value: 0,
            title: '',
          },
          {
            key: 'None',
            value: 1,
            title: ' ',
          },
          {
            key: 'Compliant',
            value: 2,
            title: 'Stock_Compliant',
          },
          {
            key: 'Non_Compliant',
            value: 3,
            title: 'Stock_NonCompliant',
          },
        ],
      },
    },
  },
];
