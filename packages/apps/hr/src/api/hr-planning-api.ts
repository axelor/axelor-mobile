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

import {axiosApiProvider} from '@axelor/aos-mobile-core';

/**
 * Non-working days of an employee over a period.
 *
 * Provided by the HR enterprise module: the server resolves the weekly
 * planning and the public holiday events planning, so part-time patterns are
 * handled without any client-side computation.
 *
 * Response shape (HRDayPlanning):
 * {
 *   holidays: {"<holidayId>": ["2026-07-14"]},
 *   weekends: {"<weekendId>": ["2026-06-06"]},
 *   employeeDayPlanning: {"<employeeId>": {holidayId, weekendId}}
 * }
 */
export async function fetchNonWorkingDays({
  employeeId,
  fromDate,
  toDate,
}: {
  employeeId: number;
  fromDate: string;
  toDate: string;
}) {
  return axiosApiProvider
    .get({
      url: `ws/aos/hr/fetch-non-working-days?employeeIds=${employeeId}&from=${fromDate}&to=${toDate}&manager=false`,
    })
    .then(response => ({...response, data: {object: response?.data}}));
}
