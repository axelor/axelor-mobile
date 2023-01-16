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

  static getStatusBorderColor = (status: number, Colors: ThemeColors) => {
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
        return {};
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
}

export default EventType;
