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

import {axiosApiProvider} from '../../../apiProviders';

export async function fetchActionView({actionViewName}) {
  return axiosApiProvider.post({
    url: `/ws/action/${actionViewName}`,
    data: {
      data: {
        context: {
          _id: null,
        },
      },
      model: 'com.axelor.meta.db.MetaAction',
    },
  });
}

export async function fetchTypeChart({chartName}: {chartName: string}) {
  return axiosApiProvider.get({url: `/ws/meta/chart/${chartName}`});
}

export async function fetchChartDataset({chartName, parameter, context}) {
  return axiosApiProvider.post({
    url: `/ws/meta/chart/${chartName}`,
    data: {
      data: {...parameter, ...context},
      fields: ['dataset'],
    },
  });
}

export async function getChartParameter({action, chartName, context}) {
  return axiosApiProvider.post({
    url: 'ws/action',
    data: {
      action: action,
      data: {
        context: {
          ...context,
          _chart: chartName,
        },
      },
      model: 'com.axelor.script.ScriptBindings',
    },
  });
}
