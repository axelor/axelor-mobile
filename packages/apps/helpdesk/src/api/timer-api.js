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
  createStandardFetch,
  createStandardSearch,
} from '@axelor/aos-mobile-core';

export async function getTimer({timerId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.base.db.Timer',
    id: timerId,
    fieldKey: 'helpdesk_timer',
    provider: 'model',
  });
}

export async function searchTimerHistoryWithId({idTimer}) {
  if (idTimer == null) {
    return null;
  }

  return createStandardSearch({
    model: 'com.axelor.apps.base.db.TimerHistory',
    criteria: [
      {
        fieldName: 'timer.id',
        operator: '=',
        value: idTimer,
      },
    ],
    fieldKey: 'helpdesk_timerHistory',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}
