/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import {axiosApiProvider} from '../apiProviders';

export async function fetchTypeGraph({chartName}: {chartName: string}) {
  return axiosApiProvider.get({url: `/ws/meta/chart/${chartName}`});
}

export async function fetchGraphDataset({chartName}: {chartName: string}) {
  return axiosApiProvider.post({
    url: `/ws/meta/chart/${chartName}`,
    data: {
      data: {
        fromDate: '2023-02-28',
        monthSelect: 12,
        toDate: '2024-02-28',
        todayDate: '2024-02-28',
        // fromDate: '2023-02-28',
        // toDate: '2024-02-28',
      },
      fields: ['dataset'],
    },
  });
}
