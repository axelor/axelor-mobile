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

import {TranslatorProps} from '@axelor/aos-mobile-core';

class Product {
  static procurementMethod = {
    Buy: 'buy',
    Produce: 'produce',
    BuyAndProduce: 'buyAndProduce',
  };

  static applicationPriceSelect = {
    SalePrice: 0,
    CostPrice: 1,
    PurchasePrice: 2,
  };

  static getProcurementMethod = (
    option: string,
    I18n: TranslatorProps,
  ): string => {
    if (I18n) {
      switch (option) {
        case this.procurementMethod.Buy:
          return I18n.t('Stock_Procurement_Buy');
        case this.procurementMethod.Produce:
          return I18n.t('Stock_Procurement_Produce');
        case this.procurementMethod.BuyAndProduce:
          return I18n.t('Stock_Procurement_BuyProduce');
        default:
          console.warn(
            `Procurement method provided with value ${option} is not supported by product.`,
          );
          return null;
      }
    }
    return null;
  };

  static getApplicationPriceSelect = (
    option: number,
    I18n: TranslatorProps,
  ): string => {
    if (I18n) {
      switch (option) {
        case this.applicationPriceSelect.SalePrice:
          return I18n.t('Stock_Application_SalePrice');
        case this.applicationPriceSelect.CostPrice:
          return I18n.t('Stock_Application_CostPrice');
        case this.applicationPriceSelect.PurchasePrice:
          return I18n.t('Stock_Application_PurchasePrice');
        default:
          console.warn(
            `Application price provided with value ${option} is not supported by product.`,
          );
          return null;
      }
    }
  };
}

export default Product;
