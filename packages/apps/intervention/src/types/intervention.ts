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

class InterventionType {
  static status = {
    Planned: 20,
    Started: 30,
    Suspended: 40,
    Finished: 50,
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Planned:
        return Colors.plannedColor;
      case this.status.Started:
        return Colors.progressColor;
      case this.status.Suspended:
        return Colors.cautionColor;
      case this.status.Finished:
        return Colors.successColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Intervention.`,
        );
        return null;
    }
  };
}

export default InterventionType;
