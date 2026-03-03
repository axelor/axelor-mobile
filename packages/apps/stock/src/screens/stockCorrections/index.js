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

import StockCorrectionCreationScreen from './StockCorrectionCreationScreen';
import StockCorrectionDetailsScreen from './StockCorrectionDetailsScreen';
import StockCorrectionListScreen from './StockCorrectionListScreen';

export default {
  StockCorrectionListScreen: {
    title: 'Stock_StockCorrection',
    component: StockCorrectionListScreen,
    actionID: 'stock_stockCorrection_list',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  StockCorrectionDetailsScreen: {
    title: 'Stock_StockCorrection',
    component: StockCorrectionDetailsScreen,
    actionID: 'stock_stockCorrection_details',
    options: {
      shadedHeader: false,
    },
  },
  StockCorrectionCreationScreen: {
    title: 'Stock_StockCorrection',
    component: StockCorrectionCreationScreen,
    isUsableOnShortcut: true,
  },
};

export {StockCorrectionCreationScreen};
export {StockCorrectionDetailsScreen};
export {StockCorrectionListScreen};
