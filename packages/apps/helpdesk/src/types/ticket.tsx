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

class TicketType {
  static status = {
    New: 0,
    In_Progress: 1,
    Resolved: 2,
    Closed: 3,
  };
  static priority = {
    Low: 1,
    Normal: 2,
    High: 3,
    Urgent: 4,
  };

  static statusList = [
    {name: 'Helpdesk_Status_New', id: this.status.New},
    {name: 'Helpdesk_Status_In_Progress', id: this.status.In_Progress},
    {name: 'Helpdesk_Status_Resolved', id: this.status.Resolved},
    {name: 'Helpdesk_Status_Closed', id: this.status.Closed},
  ];

  static getStatus = (select: number, I18n: {t: (key: string) => string}) => {
    if (I18n) {
      switch (select) {
        case this.status.New:
          return I18n.t('Helpdesk_Status_New');
        case this.status.In_Progress:
          return I18n.t('Helpdesk_Status_In_Progress');
        case this.status.Resolved:
          return I18n.t('Helpdesk_Status_Resolved');
        case this.status.Closed:
          return I18n.t('Helpdesk_Status_Closed');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by Ticket`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors) => {
    switch (status) {
      case this.status.New:
        return Colors.plannedColor;
      case this.status.In_Progress:
        return Colors.progressColor;
      case this.status.Resolved:
        return Colors.primaryColor;
      case this.status.Closed:
        return Colors.cautionColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Ticket`,
        );
        return null;
    }
  };

  static getPriority = (select: number, I18n: {t: (key: string) => string}) => {
    if (I18n) {
      switch (select) {
        case this.priority.Low:
          return I18n.t('Helpdesk_Priority_Low');
        case this.priority.Normal:
          return I18n.t('Helpdesk_Priority_Normal');
        case this.priority.High:
          return I18n.t('Helpdesk_Priority_High');
        case this.priority.Urgent:
          return I18n.t('Helpdesk_Priority_Urgent');
        default:
          console.warn(
            `Priority provided with value ${select} is not supported by Ticket`,
          );
          return null;
      }
    }
  };

  static getPriorityColor = (status: number, Colors: ThemeColors) => {
    switch (status) {
      case this.priority.Low:
        return Colors.primaryColor;
      case this.priority.Normal:
        return Colors.priorityColor;
      case this.priority.High:
        return Colors.cautionColor;
      case this.priority.Urgent:
        return Colors.importantColor;
      default:
        console.warn(
          `Priority provided with value ${status} is not supported by Ticket`,
        );
        return null;
    }
  };

  static getTypeColor = (index: number, Colors: ThemeColors): Color => {
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

export default TicketType;
