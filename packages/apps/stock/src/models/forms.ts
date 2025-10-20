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

import {FormConfigs, getTypes} from '@axelor/aos-mobile-core';
import {
  PartnerSearchBar,
  StockLocationSearchBar,
  LogisticalFormPackagingLineTypeToggle,
  LogisticalFormPackagingProductSearch,
  LogisticalFormPackagingStockMoveLineSearch,
} from '../components';

const getLogisticalFormStatuses = () => getTypes().LogisticalForm?.statusSelect;

const isCollectedStatus = (status?: number) =>
  status === getLogisticalFormStatuses()?.Collected;

const isProvisionStatus = (status?: number) =>
  status === getLogisticalFormStatuses()?.Provision;

export const stock_formsRegister: FormConfigs = {
  stock_logisticalForm: {
    modelName: 'com.axelor.apps.stock.db.LogisticalForm',
    panels: {
      logisticalHeader: {direction: 'row', colSpan: 12},
      carrierPanel: {
        direction: 'column',
        colSpan: 6,
        parent: 'logisticalHeader',
      },
      locationPanel: {
        direction: 'column',
        colSpan: 6,
        parent: 'logisticalHeader',
      },
    },
    fields: {
      collectionDate: {
        titleKey: 'Stock_CollectionDate',
        type: 'date',
        widget: 'date',
        required: true,
        readonlyIf: ({objectState}) =>
          isCollectedStatus(objectState?.statusSelect),
      },
      carrierPartner: {
        titleKey: 'Stock_Carrier',
        type: 'object',
        widget: 'custom',
        customComponent: PartnerSearchBar,
        options: {partnerType: 'carrier', showTitle: true},
        parentPanel: 'carrierPanel',
        readonlyIf: ({objectState}) =>
          !isProvisionStatus(objectState?.statusSelect),
      },
      stockLocation: {
        titleKey: 'Stock_StockLocation',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: StockLocationSearchBar,
        options: {showTitle: true},
        parentPanel: 'locationPanel',
        readonlyIf: ({objectState}) =>
          !isProvisionStatus(objectState?.statusSelect),
      },
      deliverToCustomerPartner: {
        titleKey: 'Stock_DeliverToCustomerPartner',
        type: 'object',
        widget: 'custom',
        customComponent: PartnerSearchBar,
        options: {partnerType: 'client', showTitle: true},
        hideIf: ({storeState}) =>
          !storeState.user?.user?.activeCompany?.stockConfig
            ?.isLogisticalFormMultiClientsEnabled,
        readonlyIf: ({objectState}) =>
          !isProvisionStatus(objectState?.statusSelect),
      },
      internalDeliveryComment: {
        titleKey: 'Stock_InternalDeliveryComment',
        type: 'string',
        widget: 'default',
        options: {multiline: true, adjustHeightWithLines: true},
        readonlyIf: ({objectState}) =>
          isCollectedStatus(objectState?.statusSelect),
      },
      externalDeliveryComment: {
        titleKey: 'Stock_ExternalDeliveryComment',
        type: 'string',
        widget: 'default',
        options: {multiline: true, adjustHeightWithLines: true},
        readonlyIf: ({objectState}) =>
          !isProvisionStatus(objectState?.statusSelect),
      },
    },
  },
  stock_logisticalFormPackagingItem: {
    modelName: 'com.axelor.apps.supplychain.db.Packaging',
    fields: {
      lineType: {
        type: 'string',
        widget: 'custom',
        customComponent: LogisticalFormPackagingLineTypeToggle,
        hideIf: ({objectState}) => objectState?.id != null,
      },
      packageUsed: {
        titleKey: 'Stock_PackagingUsed',
        type: 'object',
        widget: 'custom',
        customComponent: LogisticalFormPackagingProductSearch,
        hideIf: ({objectState}) => objectState.lineType !== 'packaging',
      },
      stockMoveLine: {
        titleKey: 'Stock_StockMoveLine',
        type: 'object',
        widget: 'custom',
        customComponent: LogisticalFormPackagingStockMoveLineSearch,
        hideIf: ({objectState}) => objectState.lineType !== 'product',
      },
      qty: {
        titleKey: 'Stock_Quantity',
        type: 'number',
        widget: 'default',
        dependsOn: {
          stockMoveLine: ({newValue}) => newValue?.qtyRemainingToPackage,
        },
        hideIf: ({objectState}) => objectState.lineType !== 'product',
      },
    },
  },
};
