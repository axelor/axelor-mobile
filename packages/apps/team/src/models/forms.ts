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

import {FormConfigs, UserSearchBar} from '@axelor/aos-mobile-core';
import {
  TaskPriorityPicker,
  TaskStatusPicker,
  TeamSearchBar,
} from '../components';

export const team_formsRegister: FormConfigs = {
  team_teamTask: {
    modelName: 'com.axelor.team.db.TeamTask',
    fields: {
      name: {
        titleKey: 'Team_Name',
        type: 'string',
        required: true,
      },
      team: {
        titleKey: 'Team_Team',
        type: 'object',
        widget: 'custom',
        customComponent: TeamSearchBar,
      },
      priority: {
        titleKey: 'Team_Priority',
        type: 'string',
        widget: 'custom',
        customComponent: TaskPriorityPicker,
      },
      status: {
        titleKey: 'Team_Status',
        type: 'string',
        widget: 'custom',
        customComponent: TaskStatusPicker,
      },
      taskDate: {
        titleKey: 'Team_TaskDate',
        type: 'date',
      },
      taskDeadline: {
        titleKey: 'Team_TaskDeadline',
        type: 'date',
      },
      assignedTo: {
        titleKey: 'Team_AssignedTo',
        type: 'object',
        widget: 'custom',
        customComponent: UserSearchBar,
      },
      description: {
        titleKey: 'Team_Description',
        type: 'string',
        widget: 'HTML',
      },
    },
  },
};
