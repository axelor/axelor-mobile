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

class Inventory {
  static getDate = (item: any): string => {
    const statusSelect = getTypes().Inventory?.statusSelect;

    switch (item.statusSelect) {
      case statusSelect.Draft:
        return item.createdOn;
      case statusSelect.Planned:
        return item.plannedStartDateT;
      case statusSelect.InProgress:
        return item.plannedStartDateT;
      case statusSelect.Completed:
        return item.updatedOn;
      case statusSelect.Validated:
        return item.validatedOn;
      case statusSelect.Canceled:
        return item.updatedOn;
      default:
        console.warn(
          `Status provided with value ${item.statusSelect} is not supported by inventory`,
        );
        return null;
    }
  };

  static isTrackingNumberSelectVisible = (
    status: number,
    product: any,
    trackingNumber: any,
  ) => {
    const statusSelect = getTypes().Inventory?.statusSelect;

    return (
      product?.trackingNumberConfiguration != null &&
      trackingNumber == null &&
      !(status >= statusSelect.Completed)
    );
  };
}

export default Inventory;
