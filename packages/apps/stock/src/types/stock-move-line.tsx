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

import {ThemeColors} from '@axelor/aos-mobile-ui';
import {getTypes, TranslatorProps} from '@axelor/aos-mobile-core';

class StockMoveLine {
  static status = {
    Done: 'done',
    PartiallyDone: 'partially_done',
    NotDone: 'not_done',
  };

  static hideLineQty = (line, stockMove) => {
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

  static getStockMoveLineStatusItems = (
    I18n: TranslatorProps,
    Colors: ThemeColors,
  ) => {
    return [
      {
        title: I18n.t('Stock_NotDone'),
        color: Colors.secondaryColor,
        key: this.status.NotDone,
      },
      {
        title: I18n.t('Stock_PartiallyDone'),
        color: Colors.cautionColor,
        key: this.status.PartiallyDone,
      },
      {
        title: I18n.t('Stock_Done'),
        color: Colors.successColor,
        key: this.status.Done,
      },
    ];
  };
}

export default StockMoveLine;
