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

export const team_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.team.db.TeamTask',
    fields: {
      priority: {
        content: [
          {
            key: 'Low',
            value: 'low',
            title: 'Team_Priority_Low',
            color: 'infoColor',
          },
          {
            key: 'Normal',
            value: 'normal',
            title: 'Team_Priority_Normal',
            color: 'successColor',
          },
          {
            key: 'High',
            value: 'high',
            title: 'Team_Priority_High',
            color: 'cautionColor',
          },
          {
            key: 'Urgent',
            value: 'urgent',
            title: 'Team_Priority_Urgent',
            color: 'errorColor',
          },
        ],
      },
      status: {
        content: [
          {
            key: 'New',
            value: 'new',
            title: 'Team_TaskStatus_New',
            color: 'plannedColor',
          },
          {
            key: 'InProgress',
            value: 'in-progress',
            title: 'Team_TaskStatus_InProgress',
            color: 'progressColor',
          },
          {
            key: 'Closed',
            value: 'closed',
            title: 'Team_TaskStatus_Closed',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 'canceled',
            title: 'Team_TaskStatus_Canceled',
            color: 'cautionColor',
          },
        ],
      },
    },
  },
];
