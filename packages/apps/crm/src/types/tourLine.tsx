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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';

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
}

export default TourLineType;
