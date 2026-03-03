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
import {TranslatorProps} from '@axelor/aos-mobile-core';

class TourLineType {
  static status = {
    Planned: false,
    Validated: true,
  };

  static getBorderColor = (status: boolean, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Validated:
        return Colors.successColor;
      case this.status.Planned:
        return Colors.secondaryColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by tour Line`,
        );
        return null;
    }
  };

  static getStatusList = (Colors: ThemeColors, I18n: TranslatorProps) => {
    return Object.entries(this.status).map(([key, value]) => ({
      title: I18n.t(`Crm_Status_${key}`),
      color: this.getBorderColor(value, Colors),
      key: value,
    }));
  };
}

export default TourLineType;
