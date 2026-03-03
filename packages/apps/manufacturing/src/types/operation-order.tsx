/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  getTypes,
  StopwatchType,
  TranslatorProps,
} from '@axelor/aos-mobile-core';
import {getDates} from '../utils';

class OperationOrder {
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
      getTypes()?.OperationOrder?.statusSelect,
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
    const statusSelect = getTypes()?.OperationOrder?.statusSelect;
    const _durationList = operationOrder?.operationOrderDurationList?.filter(
      _duration => {
        if (userId != null) {
          return _duration.startedBy?.id === userId;
        }

        return true;
      },
    );

    switch (operationOrder.statusSelect) {
      case statusSelect.Draft:
      case statusSelect.Planned:
        return {
          status: StopwatchType.status.Ready,
          time: 0,
        };
      case statusSelect.InProgress:
        return {
          status: this.getTimerStatus(_durationList),
          time: this.getTotalDuration(_durationList),
        };
      case statusSelect.StandBy:
        return {
          status: this.getTimerStatus(_durationList),
          time: this.getTotalDuration(_durationList),
        };
      case statusSelect.Finished:
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
}

export default OperationOrder;
