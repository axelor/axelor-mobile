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
import {calculateDiff, StopwatchType} from '@axelor/aos-mobile-core';

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

  static stopWatchStatus = {
    start: 'start',
    pause: 'pause',
    stop: 'stop',
    reset: 'reset',
    validate: 'validate',
  };

  static timerStatus = {
    inProgress: 1,
    stop: 0,
  };

  static getTotalDuration = (timerHystoryList: any): number => {
    if (timerHystoryList == null) {
      return 0;
    }

    let totalDuration = 0;
    timerHystoryList.forEach(duration => {
      let diff = calculateDiff(duration.startDateT, duration.endDateT);
      totalDuration += diff;
    });

    return totalDuration;
  };

  static getTimerState = (ticketState: number, timerState: number) => {
    if (ticketState === TicketType.status.New) {
      return StopwatchType.status.Ready;
    }
    if (
      ticketState === TicketType.status.In_Progress &&
      timerState === TicketType.timerStatus.stop
    ) {
      return StopwatchType.status.Paused;
    }
    if (
      ticketState === TicketType.status.In_Progress &&
      timerState === TicketType.timerStatus.inProgress
    ) {
      return StopwatchType.status.InProgress;
    }
    if (ticketState === TicketType.status.Closed) {
      return StopwatchType.status.Finished;
    }
    if (ticketState === TicketType.status.Resolved) {
      return StopwatchType.status.Finished;
    }
  };

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

  static getStatusList = (
    Colors: ThemeColors,
    I18n: {t: (key: string) => string},
  ) => {
    return [
      {
        title: I18n.t('Helpdesk_Status_New'),
        color: this.getStatusColor(this.status.New, Colors),
        key: this.status.New,
      },
      {
        title: I18n.t('Helpdesk_Status_In_Progress'),
        color: this.getStatusColor(this.status.In_Progress, Colors),
        key: this.status.In_Progress,
      },
      {
        title: I18n.t('Helpdesk_Status_Resolved'),
        color: this.getStatusColor(this.status.Resolved, Colors),
        key: this.status.Resolved,
      },
      {
        title: I18n.t('Helpdesk_Status_Closed'),
        color: this.getStatusColor(this.status.Closed, Colors),
        key: this.status.Closed,
      },
    ];
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

  static getPriorityList = (
    Colors: ThemeColors,
    I18n: {t: (key: string) => string},
  ) => {
    return [
      {
        title: I18n.t('Helpdesk_Priority_Low'),
        color: this.getPriorityColor(this.priority.Low, Colors),
        key: this.priority.Low,
        isActive: false,
      },
      {
        title: I18n.t('Helpdesk_Priority_Normal'),
        color: this.getPriorityColor(this.priority.Normal, Colors),
        key: this.priority.Normal,
        isActive: false,
      },
      {
        title: I18n.t('Helpdesk_Priority_High'),
        color: this.getPriorityColor(this.priority.High, Colors),
        key: this.priority.High,
        isActive: true,
      },
      {
        title: I18n.t('Helpdesk_Priority_Urgent'),
        color: this.getPriorityColor(this.priority.Urgent, Colors),
        key: this.priority.Urgent,
        isActive: true,
      },
    ];
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
