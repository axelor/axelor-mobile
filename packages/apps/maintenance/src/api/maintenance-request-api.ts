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
  createStandardSearch,
  Criteria,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createMaintenanceRequestCriterias = ({
  searchValue,
  statusList,
  actionType,
  userId,
  machineId,
}) => {
  const criteria: Criteria[] = [
    getSearchCriterias('maintenance_maintenanceRequest', searchValue),
  ];

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(({value}) => ({
        fieldName: 'statusSelect',
        operator: '=',
        value: value,
      })),
    });
  }

  if (actionType != null) {
    criteria.push({
      fieldName: 'actionSelect',
      operator: '=',
      value: actionType,
    });
  }

  if (userId != null) {
    criteria.push({
      fieldName: 'requestBy.id',
      operator: '=',
      value: userId,
    });
  }

  if (machineId != null) {
    criteria.push({
      fieldName: 'machine.id',
      operator: '=',
      value: machineId,
    });
  }

  return criteria;
};

export async function searchMaintenanceRequests({
  searchValue,
  statusList,
  actionType,
  userId,
  machineId,
  page = 0,
  filterDomain,
}: {
  searchValue?: string;
  statusList?: any[];
  actionType?: number;
  userId?: number;
  machineId?: number;
  page?: number;
  filterDomain?: any;
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.maintenance.db.MaintenanceRequest',
    criteria: createMaintenanceRequestCriterias({
      searchValue,
      statusList,
      actionType,
      userId,
      machineId,
    }),
    fieldKey: 'maintenance_maintenanceRequest',
    sortKey: 'maintenance_maintenanceRequest',
    page,
    filter: filterDomain,
  });
}
