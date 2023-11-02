/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

class TimesheetLineType {
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
        return Colors.infoColor;
      case this.statusSelect.Completed:
        return Colors.primaryColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by TimesheetLine`,
        );
        return null;
    }
  };

  static getUnitDuration = (
    unitDuration: string,
    I18n: {t: (key: string) => string},
  ): string => {
    if (I18n) {
      switch (unitDuration) {
        case 'days':
          return I18n.t('Hr_Days');
        case 'hours':
          return I18n.t('Hr_Hours');
        case 'minutes':
          return I18n.t('Hr_Minutes');
        default:
          console.warn(
            `Unit duration provided with value ${unitDuration} is not supported by TimesheetLine`,
          );
          return null;
      }
    }
  };
}

export default TimesheetLineType;
