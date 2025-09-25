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
import {PartnerSearchBar, StockLocationSearchBar} from '../components';

const getLogisticalFormStatuses = () => getTypes().LogisticalForm?.statusSelect;

const isCollectedStatus = (status?: number) => {
  const statusSelect = getLogisticalFormStatuses();
  return status != null && status === statusSelect?.Collected;
};

const isReadonlyOutsideProvision = (status?: number) => {
  if (!status) return false;
  const statusSelect = getLogisticalFormStatuses();

  if (status === statusSelect?.Collected) return true;

  return status !== statusSelect?.Provision;
};

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
        titleKey: 'Stock_CarrierPartner',
        type: 'object',
        widget: 'custom',
        customComponent: PartnerSearchBar,
        options: {partnerType: 'carrier', showTitle: true},
        parentPanel: 'carrierPanel',
        readonlyIf: ({objectState}) =>
          isReadonlyOutsideProvision(objectState?.statusSelect),
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
          isReadonlyOutsideProvision(objectState?.statusSelect),
      },
      deliverToCustomerPartner: {
        titleKey: 'Stock_DeliverToCustomerPartner',
        type: 'object',
        widget: 'custom',
        customComponent: PartnerSearchBar,
        options: {partnerType: 'client', showTitle: true},
        hideIf: ({storeState}) =>
          !storeState.appConfig?.supplychain?.logisticalFormMultiClients,
        readonlyIf: ({objectState}) =>
          isReadonlyOutsideProvision(objectState?.statusSelect),
      },
      internalDeliveryComment: {
        titleKey: 'Stock_InternalDeliveryComment',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
        },
        readonlyIf: ({objectState}) =>
          isCollectedStatus(objectState?.statusSelect),
      },
      externalDeliveryComment: {
        titleKey: 'Stock_ExternalDeliveryComment',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
        },
        readonlyIf: ({objectState}) =>
          isReadonlyOutsideProvision(objectState?.statusSelect),
      },
    },
  },
};
