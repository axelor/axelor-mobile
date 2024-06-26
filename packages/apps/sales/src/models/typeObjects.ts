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

export const sale_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.sale.db.SaleOrder',
    fields: {
      saleOrderTypeSelect: {
        content: [
          {
            key: 'Standard',
            value: 1,
            title: null,
          },
          {
            key: 'Subscription',
            value: 2,
            title: null,
          },
        ],
      },
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Sales_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'Finalized',
            value: 2,
            title: 'Sales_Status_Finalized',
            color: 'plannedColor',
          },
          {
            key: 'Confirmed',
            value: 3,
            title: 'Sales_Status_Confirmed',
            color: 'infoColor',
          },
          {
            key: 'Completed',
            value: 4,
            title: 'Sales_Status_Completed',
            color: 'successColor',
          },
        ],
      },
      deliveryState: {
        content: [
          {
            key: 'NotDelivered',
            value: 1,
            title: null,
          },
          {
            key: 'PartiallyDelivered',
            value: 2,
            title: null,
          },
          {
            key: 'Delivered',
            value: 3,
            title: null,
          },
        ],
      },
      invoicingState: {
        content: [
          {
            key: 'NotInvoiced',
            value: 1,
            title: null,
          },
          {
            key: 'PartiallyInvoiced',
            value: 2,
            title: null,
          },
          {
            key: 'Invoiced',
            value: 3,
            title: null,
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.sale.db.SaleOrderLine',
    fields: {
      typeSelect: {
        content: [
          {
            key: 'Standard',
            value: 0,
            title: 'Sales_SOLineType_Standard',
          },
          {
            key: 'Title',
            value: 1,
            title: 'Sales_SOLineType_Title',
          },
          {
            key: 'StartOfPack',
            value: 2,
            title: 'Sales_SOLineType_StartOfPack',
          },
          {
            key: 'EndOfPack',
            value: 3,
            title: 'Sales_SOLineType_EndOfPack',
          },
        ],
      },
    },
  },
];
