import {Color, ThemeColors} from '@aos-mobile/ui';
import {TranslatorProps} from '@aos-mobile/core';

class Inventory {
  static status = {
    Draft: 1,
    Planned: 2,
    InProgress: 3,
    Completed: 4,
    Validated: 5,
    Canceled: 6,
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    if (I18n) {
      switch (select) {
        case this.status.Draft:
          return I18n.t('Stock_Status_Draft');
        case this.status.Planned:
          return I18n.t('Stock_Status_Planned');
        case this.status.InProgress:
          return I18n.t('Stock_Status_InProgress');
        case this.status.Completed:
          return I18n.t('Stock_Status_Completed');
        case this.status.Validated:
          return I18n.t('Stock_Status_Validated');
        case this.status.Canceled:
          return I18n.t('Stock_Status_Canceled');
        default:
          console.warn(
            `Status provided with value ${select} is not supported by inventory`,
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
      case this.status.Completed:
        return Colors.priorityColor;
      case this.status.Validated:
        return Colors.primaryColor;
      case this.status.Canceled:
        return Colors.errorColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by inventory`,
        );
        return null;
    }
  };

  static getDate = (item: any): string => {
    switch (item.statusSelect) {
      case this.status.Draft:
        return item.createdOn;
      case this.status.Planned:
        return item.plannedStartDateT;
      case this.status.InProgress:
        return item.plannedStartDateT;
      case this.status.Completed:
        return item.updatedOn;
      case this.status.Validated:
        return item.validatedOn;
      case this.status.Canceled:
        return item.updatedOn;
      default:
        console.warn(
          `Status provided with value ${item.statusSelect} is not supported by inventory`,
        );
        return null;
    }
  };
}
export default Inventory;
