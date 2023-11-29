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

class TimesheetType {
  static statusSelect = {
    Draft: 1,
    WaitingValidation: 2,
    Validate: 3,
    Refused: 4,
    Canceled: 5,
  };

  static mode = {
    personnal: 'myTimesheetMode',
    validation: 'toValidateMode',
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.statusSelect.Draft:
        return Colors.secondaryColor;
      case this.statusSelect.WaitingValidation:
        return Colors.cautionColor;
      case this.statusSelect.Validate:
        return Colors.primaryColor;
      case this.statusSelect.Refused:
        return Colors.importantColor;
      case this.statusSelect.Canceled:
        return Colors.plannedColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Timesheet`,
        );
        return null;
    }
  };

  static getStatusList = (
    needValidation: boolean,
    Colors: ThemeColors,
    I18n: {t: (key: string) => string},
  ) => {
    if (needValidation) {
      return Object.entries(this.statusSelect).map(([key, value]) => ({
        title: I18n.t(`Hr_Status_${key}`),
        color: this.getStatusColor(value, Colors),
        key: value,
      }));
    } else {
      return [
        {
          title: I18n.t('Hr_Status_Draft'),
          color: this.getStatusColor(this.statusSelect.Draft, Colors),
          key: this.statusSelect.Draft,
        },
        {
          title: I18n.t('Hr_Status_Validate'),
          color: this.getStatusColor(this.statusSelect.Validate, Colors),
          key: this.statusSelect.Validate,
        },
      ];
    }
  };
}

export default TimesheetType;
