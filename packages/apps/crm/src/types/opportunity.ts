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

class Opportunity {
  static getStatusColor = (index: number, Colors: ThemeColors): Color => {
    switch (index) {
      case 0:
        return Colors.primaryColor;
      case 1:
        return Colors.progressColor;
      case 2:
        return Colors.priorityColor;
      case 3:
        return Colors.errorColor;
      case 4:
        return Colors.cautionColor;
      case 5:
        return Colors.plannedColor;
      default:
        return Colors.secondaryColor;
    }
  };
}

export default Opportunity;
