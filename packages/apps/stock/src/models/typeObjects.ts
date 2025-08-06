/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
      modeOfTransport: {
        content: [
          {
            key: 'TRANSPORT_BY_SEA',
            value: 'TRANSPORT_BY_SEA',
            title: 'Stock_ModeOfTransport_TransportBySea',
          },
          {
            key: 'TRANSPORT_BY_RAIL',
            value: 'TRANSPORT_BY_RAIL',
            title: 'Stock_ModeOfTransport_TransportByRail',
          },
          {
            key: 'TRANSPORT_BY_ROAD',
            value: 'TRANSPORT_BY_ROAD',
            title: 'Stock_ModeOfTransport_TransportByRoad',
          },
          {
            key: 'TRANSPORT_BY_AIR',
            value: 'TRANSPORT_BY_AIR',
            title: 'Stock_ModeOfTransport_TransportByAir',
          },
          {
            key: 'CONSIGNMENTS_BY_POST',
            value: 'CONSIGNMENTS_BY_POST',
            title: 'Stock_ModeOfTransport_ConsignmentsByPost',
          },
          {
            key: 'FIXED_TRANSPORT_INSTALLATIONS',
            value: 'FIXED_TRANSPORT_INSTALLATIONS',
            title: 'Stock_ModeOfTransport_FixedTransportInstallations',
          },
          {
            key: 'TRANSPORT_BY_INLAND_WATERWAY',
            value: 'TRANSPORT_BY_INLAND_WATERWAY',
            title: 'Stock_ModeOfTransport_TransportByInlandWaterway',
          },
          {
            key: 'OWN_PROPULSION',
            value: 'OWN_PROPULSION',
            title: 'Stock_ModeOfTransport_OwnPropulsion',
          },
        ],
      },
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
            title: 'Stock_InternalMove',
          },
          {
            key: 'outgoing',
            value: 2,
            title: 'Stock_OutgoingMove',
          },
          {
            key: 'incoming',
            value: 3,
            title: 'Stock_IncomingMove',
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
  {
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
    fields: {
      availableStatus: {
        content: [
          {
            key: 'Available',
            value: 1,
            title: null,
          },
          {
            key: 'AvailableForProduct',
            value: 2,
            title: null,
          },
          {
            key: 'Missing',
            value: 3,
            title: null,
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.sale.db.SaleOrder',
    specificKey: 'Stock_SaleOrder',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'DraftQuotation',
            value: 1,
            title: null,
          },
          {
            key: 'FinalizedQuotation',
            value: 2,
            title: null,
          },
          {
            key: 'OrderConfirmed',
            value: 3,
            title: null,
          },
          {
            key: 'OrderCompleted',
            value: 4,
            title: null,
          },
          {
            key: 'Canceled',
            value: 5,
            title: null,
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.sale.db.SaleOrderLine',
    specificKey: 'Stock_SaleOrderLine',
    fields: {
      deliveryState: {
        content: [
          {
            key: 'NotDelivered',
            value: 1,
            title: 'Stock_Status_NotDelivered',
            color: 'errorColor',
          },
          {
            key: 'PariallyDelivered',
            value: 2,
            title: 'Stock_Status_PariallyDelivered',
            color: 'cautionColor',
          },
          {
            key: 'Delivered',
            value: 3,
            title: 'Stock_Status_Delivered',
            color: 'successColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.purchase.db.PurchaseOrder',
    specificKey: 'Stock_PurchaseOrder',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: null,
          },
          {
            key: 'Requested',
            value: 2,
            title: null,
          },
          {
            key: 'Validated',
            value: 3,
            title: null,
          },
          {
            key: 'Finished',
            value: 4,
            title: null,
          },
          {
            key: 'Canceled',
            value: 5,
            title: null,
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.purchase.db.PurchaseOrderLine',
    specificKey: 'Stock_PurchaseOrderLine',
    fields: {
      receiptState: {
        content: [
          {
            key: 'NotReceived',
            value: 1,
            title: 'Stock_Status_NotReceived',
            color: 'errorColor',
          },
          {
            key: 'PariallyReceived',
            value: 2,
            title: 'Stock_Status_PariallyReceived',
            color: 'cautionColor',
          },
          {
            key: 'Received',
            value: 3,
            title: 'Stock_Status_Received',
            color: 'successColor',
          },
        ],
      },
    },
  },
];
