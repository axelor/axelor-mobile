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

import {axiosApiProvider} from '../apiProviders';

export async function fetchDashboard({id}: {id: number}) {
  if (id == null) {
    return null;
  }

  return axiosApiProvider.get({
    url: `/ws/aos/mobiledashboard/${id}`,
  });
}

export async function fetchDashboardConfigs() {
  return axiosApiProvider.get({
    url: 'ws/rest/com.axelor.apps.mobilesettings.db.MobileDashboard',
  });
}

export async function fetchChartById(mobileChartId) {
  return axiosApiProvider.get({
    url: `/ws/aos/mobilechart/${mobileChartId}`,
  });
}
