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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const project_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.project.db.ProjectTask',
    fields: {
      typeSelect: {
        content: [
          {
            key: 'Task',
            value: 'task',
            title: null,
          },
          {
            key: 'Ticket',
            value: 'ticket',
            title: null,
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.project.db.Project',
    fields: {
      taskStatusManagementSelect: {
        content: [
          {
            key: 'ManageByCategory',
            value: 4,
            title: null,
          },
          {
            key: 'ManageByProject',
            value: 2,
            title: null,
          },
          {
            key: 'NoStatusManagement',
            value: 1,
            title: null,
          },
        ],
      },
      sprintManagementSelect: {
        content: [
          {
            key: 'None',
            value: 'none',
            title: null,
          },
          {
            key: 'Project',
            value: 'project',
            title: null,
          },
          {
            key: 'Version',
            value: 'version',
            title: null,
          },
        ],
      },
      reportingSelect: {
        content: [
          {
            key: 'None',
            value: 'none',
            title: null,
          },
          {
            key: 'Activities',
            value: 'activities',
            title: null,
          },
        ],
      },
    },
  },
];
