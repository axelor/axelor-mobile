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

import {axiosApiProvider} from '@axelor/aos-mobile-core';

export async function getProjectTimeData({projetId}) {
  return axiosApiProvider.post({
    url: 'ws/meta/custom/project-spent-time-custom',
    data: {
      data: {
        _id: projetId,
        _model: 'com.axelor.apps.project.db.Project',
        _domainAction: 'action-project-view-spent-time-custom',
        id: projetId,
      },
    },
  });
}

export async function getProjectFinancialData({projetId}) {
  return axiosApiProvider.post({
    url: 'ws/meta/custom/project-total-invoiced-custom',
    data: {
      data: {
        _id: projetId,
        _model: 'com.axelor.apps.project.db.Project',
        _domainAction: 'action-project-view-total-invoiced-custom',
        id: projetId,
      },
    },
  });
}
