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

class StopwatchType {
  static status = {
    Ready: 1,
    InProgress: 2,
    Paused: 3,
    Finished: 4,
    Canceled: 5,
  };

  static getStatus = (select, I18n: {t: (key: string) => string}) => {
    if (I18n) {
      switch (select) {
        case this.status.Ready:
          return I18n.t('Stopwatch_Status_Ready');
        case this.status.InProgress:
          return I18n.t('Stopwatch_Status_InProgress');
        case this.status.Paused:
          return I18n.t('Stopwatch_Status_Paused');
        case this.status.Finished:
          return I18n.t('Stopwatch_Status_Finished');
        case this.status.Canceled:
          return I18n.t('Stopwatch_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by stopwatch`,
          );
          return null;
      }
    }
  };

  static getStatusBorderColor = (status, Colors) => {
    switch (status) {
      case this.status.Ready:
        return Colors.secondaryColor.background;
      case this.status.InProgress:
        return Colors.progressColor.background;
      case this.status.Paused:
        return Colors.cautionColor.background;
      case this.status.Finished:
        return Colors.successColor.background;
      case this.status.Canceled:
        return Colors.errorColor.background;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by stopwatch`,
        );
        return {};
    }
  };
}

export default StopwatchType;
