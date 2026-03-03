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

import {getTypes, StopwatchType} from '@axelor/aos-mobile-core';

class InterventionType {
  static getStopwatchStatus = (status: number): number => {
    const Intervention = getTypes().Intervention;

    switch (status) {
      case Intervention?.statusSelect.Planned:
        return StopwatchType.status.Ready;
      case Intervention?.statusSelect.Started:
        return StopwatchType.status.InProgress;
      case Intervention?.statusSelect.Suspended:
        return StopwatchType.status.Paused;
      case Intervention?.statusSelect.Finished:
        return StopwatchType.status.Finished;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Intervention.`,
        );
        return null;
    }
  };
}

export default InterventionType;
