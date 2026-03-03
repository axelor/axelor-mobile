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

import {formatDate, formatDateTime} from '../../../utils/formatters';
import {TranslatorProps} from '../../../i18n/hooks/use-translator';
import {formatTime} from '../../../utils/formatters';

class DateInputUtils {
  static mode = {
    Date: 'date',
    DateTime: 'datetime',
    Time: 'time',
  };

  static placeHolder = {
    Date: '__/__/____',
    DateTime: '__/__/____ __:__',
    Time: '__:__',
  };

  static getDateInputPlaceholder = (mode: string): string => {
    switch (mode) {
      case this.mode.Date:
        return this.placeHolder.Date;
      case this.mode.DateTime:
        return this.placeHolder.DateTime;
      case this.mode.Time:
        return this.placeHolder.Time;
      default:
        console.warn(
          `Mode provided with value ${mode} is not supported by date input`,
        );
        return null;
    }
  };

  static formatDate = (
    mode: string,
    date: Date,
    I18n: TranslatorProps,
  ): string => {
    const _date = date.toISOString();
    switch (mode) {
      case this.mode.Date:
        return formatDate(_date, I18n.t('Base_DateFormat'));
      case this.mode.DateTime:
        return formatDateTime(_date, I18n.t('Base_DateTimeFormat'));
      case this.mode.Time:
        return formatTime(_date, I18n.t('Base_TimeFormat'));
      default:
        console.warn(
          `Mode provided with value ${mode} is not supported by date input`,
        );
        return null;
    }
  };

  static getIconName = (mode: string): string => {
    return mode === this.mode.Time ? 'clock' : 'calendar-week';
  };
}
export default DateInputUtils;
