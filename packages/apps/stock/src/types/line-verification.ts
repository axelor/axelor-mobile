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

import {getTypes} from '@axelor/aos-mobile-core';

class LineVerification {
  static type = {
    internal: 'internal',
    outgoing: 'outgoing',
    incoming: 'incoming',
    inventory: 'inventory',
  };

  static getLineVerificationConfig = (
    type: keyof typeof LineVerification.type,
  ): any => {
    const {Inventory} = getTypes();

    switch (type) {
      case this.type.internal:
        return {
          item: 'internalMove',
          itemLine: 'internalMoveLine',
          lineDetailsScreen: 'InternalMoveLineDetailsScreen',
          selectTrackingScreen: 'InternalMoveSelectTrackingScreen',
          selectProductScreen: 'InternalMoveSelectProductScreen',
          configName: 'isVerifyInternalMoveLineEnabled',
        };
      case this.type.outgoing:
        return {
          item: 'customerDelivery',
          itemLine: 'customerDeliveryLine',
          lineDetailsScreen: 'CustomerDeliveryLineDetailScreen',
          selectTrackingScreen: 'CustomerDeliverySelectTrackingScreen',
          selectProductScreen: 'CustomerDeliverySelectProductScreen',
          configName: 'isVerifyCustomerDeliveryLineEnabled',
        };
      case this.type.incoming:
        return {
          item: 'supplierArrival',
          itemLine: 'supplierArrivalLine',
          lineDetailsScreen: 'SupplierArrivalLineDetailScreen',
          selectTrackingScreen: 'SupplierArrivalSelectTrackingScreen',
          selectProductScreen: 'SupplierArrivalSelectProductScreen',
          skipTrackingNumberVerification: true,
          configName: 'isVerifySupplierArrivalLineEnabled',
        };
      case this.type.inventory:
        return {
          item: 'inventory',
          itemLine: 'inventoryLine',
          lineDetailsScreen: 'InventoryLineDetailsScreen',
          selectTrackingScreen: 'InventorySelectTrackingScreen',
          selectProductScreen: 'InventorySelectProductScreen',
          detailStatus: Inventory?.statusSelect.Validated,
          configName: 'isVerifyInventoryLineEnabled',
        };
      default:
        return {};
    }
  };
}

export default LineVerification;
