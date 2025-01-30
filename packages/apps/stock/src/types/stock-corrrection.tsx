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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '@axelor/aos-mobile-core';

class StockCorrection {
  static status = {
    Draft: 1,
    Validated: 2,
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    switch (select) {
      case this.status.Draft:
        return I18n.t('Stock_Status_Draft');
      case this.status.Validated:
        return I18n.t('Stock_Status_Validated');
      default:
        console.warn(
          `Status provided with value ${select} is not supported by stock correction`,
        );
        return null;
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Draft:
        return Colors.secondaryColor;
      case this.status.Validated:
        return Colors.primaryColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stock correction`,
        );
        return null;
    }
  };
}

export default StockCorrection;
