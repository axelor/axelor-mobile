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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const maintenance_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.maintenance.db.MaintenanceRequest',
    fields: {
      actionSelect: {
        content: [
          {
            key: 'Corrective',
            value: 0,
            title: 'Maintenance_RequestActionType_Corrective',
            color: 'errorColor',
          },
          {
            key: 'Preventive',
            value: 1,
            title: 'Maintenance_RequestActionType_Preventive',
            color: 'cautionColor',
          },
        ],
      },
      statusSelect: {
        content: [
          {
            key: 'Planned',
            value: 0,
            title: 'Maintenance_RequestStatus_Planned',
            color: 'plannedColor',
          },
          {
            key: 'InProgress',
            value: 1,
            title: 'Maintenance_RequestStatus_InProgress',
            color: 'priorityColor',
          },
          {
            key: 'Completed',
            value: 2,
            title: 'Maintenance_RequestStatus_Completed',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 3,
            title: 'Maintenance_RequestStatus_Canceled',
            color: 'cautionColor',
          },
        ],
      },
    },
  },
];
