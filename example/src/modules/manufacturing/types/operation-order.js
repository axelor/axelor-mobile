import {formatDateTime} from '../utils/time';

class OperationOrder {
  static status = {
    Draft: 1,
    Canceled: 2,
    Planned: 3,
    InProgress: 4,
    StandBy: 5,
    Finished: 6,
    Merged: 7,
  };

  static getStatus = (select, I18n = {t: () => {}}) => {
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
            `Status provided with value ${select} is not supported by operation order`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status, Colors) => {
    switch (status) {
      case this.status.Draft:
        return {
          backgroundColor: Colors.secondaryColor_light,
          borderColor: Colors.secondaryColor,
        };
      case this.status.Planned:
        return {
          backgroundColor: Colors.plannedColor_light,
          borderColor: Colors.plannedColor,
        };
      case this.status.InProgress:
        return {
          backgroundColor: Colors.progressColor_light,
          borderColor: Colors.progressColor,
        };
      case this.status.StandBy:
        return {
          backgroundColor: Colors.cautionColor_light,
          borderColor: Colors.cautionColor,
        };
      case this.status.Finished:
        return {
          backgroundColor: Colors.primaryColor_light,
          borderColor: Colors.primaryColor,
        };
      case this.status.Merged:
        return {
          backgroundColor: Colors.priorityColor_light,
          borderColor: Colors.priorityColor,
        };
      case this.status.Canceled:
        return {
          backgroundColor: Colors.errorColor_light,
          borderColor: Colors.errorColor,
        };
      default:
        console.warn(
          `Status provided with value ${status} is not supported by operation order`,
        );
        return {};
    }
  };

  static getDates = (
    status,
    plannedStartDate,
    plannedEndDate,
    realStartDate,
    realEndDate,
    I18n = {t: () => {}},
  ) => {
    switch (status) {
      case OperationOrder.status.Draft:
      case OperationOrder.status.Planned:
        return [
          {
            title: I18n.t('Manufacturing_PlannedStartDate') + ':',
            value: plannedStartDate
              ? formatDateTime(plannedStartDate, I18n.t('Base_DateTimeFormat'))
              : '',
          },
          {
            title: I18n.t('Manufacturing_PlannedEndDate') + ':',
            value: plannedEndDate
              ? formatDateTime(plannedEndDate, I18n.t('Base_DateTimeFormat'))
              : '',
          },
        ];
      case OperationOrder.status.InProgress:
      case OperationOrder.status.StandBy:
        return [
          {
            title: I18n.t('Manufacturing_RealStartDate') + ':',
            value: realStartDate
              ? formatDateTime(realStartDate, I18n.t('Base_DateTimeFormat'))
              : '',
          },
          {
            title: I18n.t('Manufacturing_PlannedEndDate') + ':',
            value: plannedEndDate
              ? formatDateTime(plannedEndDate, I18n.t('Base_DateTimeFormat'))
              : '',
          },
        ];
      case OperationOrder.status.Finished:
        return [
          {
            title: I18n.t('Manufacturing_RealStartDate') + ':',
            value: plannedStartDate
              ? formatDateTime(plannedStartDate, I18n.t('Base_DateTimeFormat'))
              : '',
          },
          {
            title: I18n.t('Manufacturing_RealEndDate') + ':',
            value: realEndDate
              ? formatDateTime(realEndDate, I18n.t('Base_DateTimeFormat'))
              : '',
          },
        ];
      default:
        console.warn(
          `Status provided with value ${status} is not supported by operation order`,
        );
        return [];
    }
  };
}

export default OperationOrder;
