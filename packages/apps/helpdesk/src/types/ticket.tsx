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

import {calculateDiff} from '@axelor/aos-mobile-core';

class TicketType {
  static stopWatchStatus = {
    start: 'start',
    pause: 'pause',
    stop: 'stop',
    reset: 'reset',
    validate: 'validate',
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
}

export default TicketType;
