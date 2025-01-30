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

class TimeType {
  static statusSelect = {
    Draft: 1,
    InProgress: 2,
    Paused: 3,
    Completed: 4,
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.statusSelect.Draft:
        return Colors.secondaryColor;
      case this.statusSelect.InProgress:
        return Colors.progressColor;
      case this.statusSelect.Paused:
        return Colors.cautionColor;
      case this.statusSelect.Completed:
        return Colors.successColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by TimesheetLine`,
        );
        return null;
    }
  };
}

export default TimeType;
