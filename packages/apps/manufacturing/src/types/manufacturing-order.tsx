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

import {ThemeColors, Color} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '@axelor/aos-mobile-core';
import {getDates} from '../utils';

class ManufacturingOrder {
  static status = {
    Draft: 1,
    Canceled: 2,
    Planned: 3,
    InProgress: 4,
    StandBy: 5,
    Finished: 6,
    Merged: 7,
  };

  static type = {
    production: 1,
    permanent: 2,
    maintenance: 3,
  };

  static priority = {
    Low: 1,
    Normal: 2,
    High: 3,
    Urgent: 4,
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    if (I18n) {
      switch (select) {
        case this.status.Draft:
          return I18n.t('Manufacturing_Status_Draft');
        case this.status.Planned:
          return I18n.t('Manufacturing_Status_Planned');
        case this.status.InProgress:
          return I18n.t('Manufacturing_Status_InProgress');
        case this.status.StandBy:
          return I18n.t('Manufacturing_Status_StandBy');
        case this.status.Finished:
          return I18n.t('Manufacturing_Status_Finished');
        case this.status.Merged:
          return I18n.t('Manufacturing_Status_Merged');
        case this.status.Canceled:
          return I18n.t('Manufacturing_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by manufacturing order`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Draft:
        return Colors.secondaryColor;
      case this.status.Planned:
        return Colors.plannedColor;
      case this.status.InProgress:
        return Colors.progressColor;
      case this.status.StandBy:
        return Colors.cautionColor;
      case this.status.Finished:
        return Colors.successColor;
      case this.status.Merged:
        return Colors.priorityColor;
      case this.status.Canceled:
        return Colors.errorColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by manufacturing order`,
        );
        return null;
    }
  };

  static getPriority = (select: number, I18n: TranslatorProps): string => {
    if (I18n) {
      switch (select) {
        case this.priority.Low:
          return I18n.t('Manufacturing_Priority_Low');
        case this.priority.Normal:
          return I18n.t('Manufacturing_Priority_Normal');
        case this.priority.High:
          return I18n.t('Manufacturing_Priority_High');
        case this.priority.Urgent:
          return I18n.t('Manufacturing_Priority_Urgent');
        default:
          console.warn(
            `Priority provided with value ${select} is not supported by manufacturing order`,
          );
          return null;
      }
    }
  };

  static getPriorityColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.priority.Low:
        return Colors.plannedColor;
      case this.priority.Normal:
        return Colors.priorityColor;
      case this.priority.High:
        return Colors.cautionColor;
      case this.priority.Urgent:
        return Colors.errorColor;
      default:
        console.warn(
          `Priority provided with value ${status} is not supported by manufacturing order`,
        );
        return null;
    }
  };

  static getDates = (
    status: number,
    plannedStartDate: string,
    plannedEndDate: string,
    realStartDate: string,
    realEndDate: string,
    I18n: TranslatorProps,
  ): {title: string; value: string}[] => {
    return getDates(
      status,
      this.status,
      plannedStartDate,
      plannedEndDate,
      realStartDate,
      realEndDate,
      I18n,
    );
  };
}

export default ManufacturingOrder;
