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

class EventType {
  static status = {
    Planned: 1,
    Realized: 2,
    Canceled: 3,
  };
  static category = {
    Event: 0,
    Call: 1,
    Meeting: 2,
    Task: 3,
    Leave: 4,
    Note: 5,
  };

  static getStatus = (select: number, I18n: {t: (key: string) => string}) => {
    if (I18n) {
      switch (select) {
        case this.status.Planned:
          return I18n.t('Crm_Event_Status_Planned');
        case this.status.Realized:
          return I18n.t('Crm_Event_Status_Realized');
        case this.status.Canceled:
          return I18n.t('Crm_Event_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by Event`,
          );
          return null;
      }
    }
  };

  static getStatusBorderColor = (
    status: number,
    Colors: ThemeColors,
  ): string => {
    switch (status) {
      case this.status.Planned:
        return Colors.secondaryColor.background;
      case this.status.Realized:
        return Colors.primaryColor.background;
      case this.status.Canceled:
        return Colors.cautionColor.background;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Event`,
        );
        return null;
    }
  };

  static getCategory = (
    select: number,
    I18n: {t: (key: string) => string},
  ): string => {
    if (I18n) {
      switch (select) {
        case this.category.Event:
          return I18n.t('Crm_Event_Category_Event');
        case this.category.Call:
          return I18n.t('Crm_Event_Category_Call');
        case this.category.Meeting:
          return I18n.t('Crm_Event_Category_Meeting');
        case this.category.Task:
          return I18n.t('Crm_Event_Category_Task');
        case this.category.Leave:
          return I18n.t('Crm_Event_Category_Leave');
        case this.category.Note:
          return I18n.t('Crm_Event_Category_Note');
        default:
          console.warn(
            `Category provided with value ${select} is not supported by Event`,
          );
          return '';
      }
    }
  };

  static getCategoryColor = (category: number, Colors: ThemeColors): Color => {
    switch (category) {
      case this.category.Event:
        return Colors.plannedColor;
      case this.category.Call:
        return Colors.priorityColor;
      case this.category.Meeting:
        return Colors.primaryColor;
      case this.category.Task:
        return Colors.progressColor;
      case this.category.Leave:
        return Colors.secondaryColor;
      case this.category.Note:
        return Colors.importantColor;
      default:
        console.warn(
          `Status provided with value ${category} is not supported by Event`,
        );
        return Colors.warningColor;
    }
  };

  static getCalendarListItems = (list: any[], Colors: ThemeColors): any[] => {
    if (list == null || list.length === 0) {
      return [];
    }

    return list.map(_e => {
      return {
        id: _e.id,
        startDate: _e.startDateTime,
        endDate: _e.endDateTime,
        data: {
          id: _e.id,
          subject: _e.subject,
          contactPartner: _e.contactPartner?.fullName,
          location: _e.location,
          border: this.getCategoryColor(_e.typeSelect, Colors).background,
        },
      };
    });
  };
}

export default EventType;
