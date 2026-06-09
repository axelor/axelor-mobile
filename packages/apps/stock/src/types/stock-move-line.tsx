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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {getTypes, TranslatorProps} from '@axelor/aos-mobile-core';

class StockMoveLine {
  static status = {
    NotDone: 'not_done',
    PartiallyDone: 'partially_done',
    Done: 'done',
  };

  static hideLineQty = (line: any, stockMove: any) => {
    const StockMove = getTypes().StockMove;

    return (
      line?.isRealQtyModifiedByUser === false &&
      stockMove?.statusSelect <= StockMove?.statusSelect.Planned
    );
  };

  static getStockMoveLineStatus = (line: any, stockMove: any) => {
    const _realQty = parseFloat(line.realQty);
    const _qty = parseFloat(line.qty);

    if (
      this.hideLineQty(line, stockMove) ||
      _realQty == null ||
      _realQty === 0
    ) {
      return this.status.NotDone;
    }

    if (_realQty < _qty) {
      return this.status.PartiallyDone;
    }

    return this.status.Done;
  };

  static getStockMoveLineStatusColor = (
    status: string,
    Colors: ThemeColors,
  ): Color | undefined => {
    switch (status) {
      case this.status.NotDone:
        return Colors.secondaryColor;
      case this.status.PartiallyDone:
        return Colors.cautionColor;
      case this.status.Done:
        return Colors.successColor;
      default:
        return undefined;
    }
  };

  static getStockMoveLineStatusItems = (
    I18n: TranslatorProps,
    Colors: ThemeColors,
  ) => {
    return Object.entries(this.status).map(([key, value]) => ({
      title: I18n.t(`Stock_${key}`),
      color: this.getStockMoveLineStatusColor(value, Colors),
      key: value,
    }));
  };
}

export default StockMoveLine;
