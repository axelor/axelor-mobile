import {StopwatchType, TranslatorProps, formatDateTime} from '@aos-mobile/core';
import {ThemeColors} from '@aos-mobile/ui';
import {calculateDiff} from '../utils/time';

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
            `Status provided with value ${select} is not supported by operation order`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (
    status: number,
    Colors: ThemeColors,
  ): {backgroundColor?: string; borderColor?: string} => {
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
    status: number,
    plannedStartDate: string,
    plannedEndDate: string,
    realStartDate: string,
    realEndDate: string,
    I18n: TranslatorProps,
  ): {title?: string; value?: string}[] => {
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

  static getTimerState = (
    operationOrder: any,
  ): {status?: number; time?: number} => {
    switch (operationOrder.statusSelect) {
      case OperationOrder.status.Draft:
      case OperationOrder.status.Planned:
        return {
          status: StopwatchType.status.Ready,
          time: 0,
        };
      case OperationOrder.status.InProgress:
        return {
          status: StopwatchType.status.InProgress,
          time: this.getTotalDuration(
            operationOrder?.operationOrderDurationList,
          ),
        };
      case OperationOrder.status.StandBy:
        return {
          status: StopwatchType.status.Paused,
          time: this.getTotalDuration(
            operationOrder?.operationOrderDurationList,
          ),
        };
      case OperationOrder.status.Finished:
        return {
          status: StopwatchType.status.Finished,
          time: operationOrder.realDuration * 1000,
        };
      default:
        console.warn(
          `Status provided with value ${operationOrder.statusSelect} is not supported by operation order`,
        );
        return {};
    }
  };

  static getTotalDuration = (operationOrderDurationList: any): number => {
    if (operationOrderDurationList == null) {
      console.warn('Operation order duration list cannot be null');
      return 0;
    }

    let totalDuration = 0;
    operationOrderDurationList.forEach(duration => {
      let diff = calculateDiff(
        duration.startingDateTime,
        duration.stoppingDateTime,
      );
      totalDuration += diff;
    });
    return totalDuration;
  };
}

export default OperationOrder;
