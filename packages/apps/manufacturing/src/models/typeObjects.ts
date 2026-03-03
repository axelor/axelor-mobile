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

export const manufacturing_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.production.db.ManufOrder',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Manufacturing_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'Canceled',
            value: 2,
            title: 'Manufacturing_Status_Canceled',
            color: 'errorColor',
          },
          {
            key: 'Planned',
            value: 3,
            title: 'Manufacturing_Status_Planned',
            color: 'plannedColor',
          },
          {
            key: 'InProgress',
            value: 4,
            title: 'Manufacturing_Status_InProgress',
            color: 'progressColor',
          },
          {
            key: 'StandBy',
            value: 5,
            title: 'Manufacturing_Status_StandBy',
            color: 'cautionColor',
          },
          {
            key: 'Finished',
            value: 6,
            title: 'Manufacturing_Status_Finished',
            color: 'successColor',
          },
          {
            key: 'Merged',
            value: 7,
            title: 'Manufacturing_Status_Merged',
            color: 'priorityColor',
          },
        ],
      },
      typeSelect: {
        content: [
          {
            key: 'production',
            value: 1,
            title: null,
          },
          {
            key: 'permanent',
            value: 2,
            title: null,
          },
          {
            key: 'maintenance',
            value: 3,
            title: null,
          },
        ],
      },
      prioritySelect: {
        content: [
          {
            key: 'Low',
            value: 1,
            title: 'Manufacturing_Priority_Low',
            color: 'plannedColor',
          },
          {
            key: 'Normal',
            value: 2,
            title: 'Manufacturing_Priority_Normal',
            color: 'priorityColor',
          },
          {
            key: 'High',
            value: 3,
            title: 'Manufacturing_Priority_High',
            color: 'cautionColor',
          },
          {
            key: 'Urgent',
            value: 4,
            title: 'Manufacturing_Priority_Urgent',
            color: 'errorColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.production.db.OperationOrder',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Manufacturing_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'Canceled',
            value: 2,
            title: 'Manufacturing_Status_Canceled',
            color: 'errorColor',
          },
          {
            key: 'Planned',
            value: 3,
            title: 'Manufacturing_Status_Planned',
            color: 'plannedColor',
          },
          {
            key: 'InProgress',
            value: 4,
            title: 'Manufacturing_Status_InProgress',
            color: 'progressColor',
          },
          {
            key: 'StandBy',
            value: 5,
            title: 'Manufacturing_Status_StandBy',
            color: 'cautionColor',
          },
          {
            key: 'Finished',
            value: 6,
            title: 'Manufacturing_Status_Finished',
            color: 'successColor',
          },
          {
            key: 'Merged',
            value: 7,
            title: 'Manufacturing_Status_Merged',
            color: 'priorityColor',
          },
        ],
      },
    },
  },
];
