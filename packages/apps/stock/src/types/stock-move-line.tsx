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

import {ThemeColors} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '@axelor/aos-mobile-core';
import StockMove from './stock-move';

class StockMoveLine {
  static status = {
    Done: 'done',
    PartiallyDone: 'partially_done',
    NotDone: 'not_done',
  };

  static hideLineQty = (line, stockMove) => {
    return (
      line?.isRealQtyModifiedByUser === false &&
      stockMove?.statusSelect <= StockMove.status.Planned
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
        color: Colors.primaryColor,
        key: this.status.Done,
      },
    ];
  };
}

export default StockMoveLine;
