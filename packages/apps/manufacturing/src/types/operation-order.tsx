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

import {
  calculateDiff,
  StopwatchType,
  TranslatorProps,
} from '@axelor/aos-mobile-core';
import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {getDates} from '../utils';

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
          `Status provided with value ${status} is not supported by operation order`,
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

  static getTimerState = (
    operationOrder: any,
    userId?: number,
  ): {status?: number; time?: number} => {
    const _durationList = operationOrder?.operationOrderDurationList?.filter(
      _duration => {
        if (userId != null) {
          return _duration.startedBy?.id === userId;
        }

        return true;
      },
    );

    switch (operationOrder.statusSelect) {
      case OperationOrder.status.Draft:
      case OperationOrder.status.Planned:
        return {
          status: StopwatchType.status.Ready,
          time: 0,
        };
      case OperationOrder.status.InProgress:
        return {
          status: this.getTimerStatus(_durationList),
          time: this.getTotalDuration(_durationList),
        };
      case OperationOrder.status.StandBy:
        return {
          status: this.getTimerStatus(_durationList),
          time: this.getTotalDuration(_durationList),
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
      return 0;
    }

    let totalDuration = 0;

    operationOrderDurationList.forEach(_duration => {
      let diff = calculateDiff(
        _duration.startingDateTime,
        _duration.stoppingDateTime,
      );
      totalDuration += diff;
    });

    return totalDuration;
  };

  private static getTimerStatus = (_durationList: any): number => {
    if (!Array.isArray(_durationList) || _durationList.length === 0) {
      return StopwatchType.status.Ready;
    } else if (
      _durationList.find(_duration => _duration.stoppingDateTime == null) !=
      null
    ) {
      return StopwatchType.status.InProgress;
    } else {
      return StopwatchType.status.Paused;
    }
  };

  static getCalendarListItems = (list: any[], Colors: ThemeColors): any[] => {
    if (list == null || list.length === 0) {
      return [];
    }

    return list.map(_e => {
      return {
        id: _e.id,
        startDate: _e.plannedStartDateT,
        endDate: _e.plannedEndDateT,
        data: {
          id: _e.id,
          name: _e.operationName,
          ref: _e.manufOrder?.manufOrderSeq,
          workCenter: _e.workCenter?.name,
          border: this.getStatusColor(_e.statusSelect, Colors).background,
        },
      };
    });
  };
}

export default OperationOrder;
