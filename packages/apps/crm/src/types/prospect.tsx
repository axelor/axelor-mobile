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

class Prospect {
  static partnerTypeSelect = {
    Individual: 2,
    Company: 1,
  };

  static getStatusColor = (index: number, Colors: ThemeColors): Color => {
    if (index === 0) {
      return Colors.primaryColor;
    } else if (index === 1) {
      return Colors.progressColor;
    } else if (index === 2) {
      return Colors.priorityColor;
    } else if (index === 3) {
      return Colors.errorColor;
    } else if (index === 4) {
      return Colors.cautionColor;
    } else if (index === 5) {
      return Colors.plannedColor;
    } else if (index === 6) {
      return Colors.secondaryColor;
    } else {
      Colors.primaryColor;
    }
  };
}

export default Prospect;
