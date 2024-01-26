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
import {TranslatorProps} from '@axelor/aos-mobile-core';

class ControlEntry {
  static status = {
    Draft: 1,
    InProgress: 2,
    Completed: 3,
    Canceled: 4,
  };

  static sampleResult = {
    NotControlled: 1,
    Compliant: 2,
    NotCompliant: 3,
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    if (I18n) {
      switch (select) {
        case this.status.Draft:
          return I18n.t('Quality_Status_Draft');
        case this.status.InProgress:
          return I18n.t('Quality_Status_InProgress');
        case this.status.Completed:
          return I18n.t('Quality_Status_Completed');
        case this.status.Canceled:
          return I18n.t('Quality_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by control entry`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Draft:
        return Colors.secondaryColor;
      case this.status.InProgress:
        return Colors.progressColor;
      case this.status.Completed:
        return Colors.successColor;
      case this.status.Canceled:
        return Colors.errorColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by control entry`,
        );
        return null;
    }
  };
}

export default ControlEntry;
