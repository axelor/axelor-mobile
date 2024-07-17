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

import {ThemeColors} from '@axelor/aos-mobile-ui';

class StockIndicator {
  static type = {
    RealQty: 0,
    FutureQty: 1,
    AllocatedQty: 2,
    SaleOrderQty: 3,
    PurchaseOrderQty: 4,
    AvailableStock: 5,
    BuildingQty: 6,
    ConsumedMOQty: 7,
    MissingMOQty: 8,
  };

  static getStockMoveLineInvoicedBadge = (
    qtyInvoiced: number,
    realQty: number,
    I18n: {t: (key: string) => string},
    Colors: ThemeColors,
  ) => {
    if (qtyInvoiced > 0 && qtyInvoiced === realQty) {
      return {title: I18n.t('Stock_Invoiced'), color: Colors.successColor};
    }

    if (qtyInvoiced > 0 && qtyInvoiced < realQty) {
      return {
        title: I18n.t('Stock_PartiallyInvoiced'),
        color: Colors.warningColor,
      };
    }

    return {title: I18n.t('Stock_NotInvoiced'), color: Colors.errorColor};
  };
}

export default StockIndicator;
