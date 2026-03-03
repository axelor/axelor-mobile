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

class StockMove {
  static getStockMoveDate = (status: number, stockMove: any) => {
    const statusSelect = getTypes()?.StockMove?.statusSelect;

    switch (status) {
      case statusSelect.Draft:
        return stockMove?.createdOn;
      case statusSelect.Planned:
        return stockMove?.estimatedDate;
      case statusSelect.Realized:
        return stockMove?.realDate;
      case statusSelect.Canceled:
        return stockMove?.realDate;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stock move`,
        );
        return null;
    }
  };

  static isTrackingNumberSelectVisible = (
    status: number,
    product: any,
    trackingNumber: any,
  ) => {
    const statusSelect = getTypes()?.StockMove?.statusSelect;

    return (
      product?.trackingNumberConfiguration != null &&
      trackingNumber == null &&
      status === statusSelect.Planned
    );
  };
}

export default StockMove;
