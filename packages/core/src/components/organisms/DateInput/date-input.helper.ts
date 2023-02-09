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
    return mode === this.mode.Time ? 'clock' : 'calendar-alt';
  };
}
export default DateInputUtils;
