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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const project_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.project.db.Project',
    fields: {
      projectStatus: {
        content: [
          {
            key: 'New',
            value: 1,
            title: 'Project_Status_New',
            color: 'secondaryColor',
          },
          {
            key: 'InProgress',
            value: 2,
            title: 'Project_Status_InProgress',
            color: 'progressColor',
          },
          {
            key: 'Done',
            value: 3,
            title: 'Project_Status_Done',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 4,
            title: 'Project_Status_Canceled',
            color: 'errorColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.project.db.ProjectTask',
    fields: {
      taskStatus: {
        content: [
          {
            key: 'New',
            value: 1,
            title: 'Project_Status_New',
            color: 'secondaryColor',
          },
          {
            key: 'InProgress',
            value: 2,
            title: 'Project_Status_InProgress',
            color: 'progressColor',
          },
          {
            key: 'Done',
            value: 3,
            title: 'Project_Status_Done',
            color: 'successColor',
          },
          {
            key: 'Canceled',
            value: 4,
            title: 'Project_Status_Canceled',
            color: 'errorColor',
          },
        ],
      },
      priority: {
        content: [
          {
            key: 'Low',
            value: 1,
            title: 'Project_Priority_Low',
            color: 'plannedColor',
          },
          {
            key: 'Normal',
            value: 2,
            title: 'Project_Priority_Normal',
            color: 'priorityColor',
          },
          {
            key: 'High',
            value: 3,
            title: 'Project_Priority_High',
            color: 'cautionColor',
          },
          {
            key: 'Urgent',
            value: 4,
            title: 'Project_Priority_Urgent',
            color: 'errorColor',
          },
        ],
      },
    },
  },
];
