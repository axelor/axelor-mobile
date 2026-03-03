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

import TaskDetailsScreen from './TaskDetailsScreen';
import TaskFormScreen from './TaskFormScreen';
import TaskListScreen from './TaskListScreen';

export const TaskScreens = {
  TaskListScreen: {
    title: 'Project_Tasks',
    component: TaskListScreen,
    options: {shadedHeader: false},
    actionID: 'project_projectTask_list',
  },
  TaskDetailsScreen: {
    title: 'Project_Task',
    component: TaskDetailsScreen,
    actionID: 'project_projectTask_details',
    options: {shadedHeader: false},
  },
  TaskFormScreen: {
    title: 'Project_Task',
    component: TaskFormScreen,
  },
};

export {TaskListScreen};
export {TaskDetailsScreen};
export {TaskFormScreen};
