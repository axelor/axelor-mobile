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

import BuisnessProjectScreen from './BuisnessProjectScreen';
import ProjectDetailsScreen from './ProjectDetailsScreen';
import ActiveProjectScreen from './ActiveProjectScreen';
import ProjectScreen from './ProjectScreen';
import TaskDetailsScreen from './TaskDetailsScreen';
import TaskFormScreen from './TaskFormScreen';
import TaskListScreen from './TaskListScreen';

export default {
  BuisnessProjectScreen: {
    title: 'Project_BuisnessProjects',
    component: BuisnessProjectScreen,
    options: {
      shadedHeader: false,
    },
    actionID: 'project_buisnessProject_list',
  },
  ActiveProjectScreen: {
    title: 'Project_ActiveProject',
    component: ActiveProjectScreen,
    options: {
      shadedHeader: false,
    },
  },
  ProjectScreen: {
    title: 'Project_Projects',
    component: ProjectScreen,
    options: {
      shadedHeader: false,
    },
    actionID: 'project_project_list',
  },
  ProjectDetailsScreen: {
    title: 'Project_Projects',
    component: ProjectDetailsScreen,
    actionID: 'project_project_details',
    options: {
      shadedHeader: false,
    },
  },
  TaskListScreen: {
    title: 'Project_Tasks',
    component: TaskListScreen,
    options: {
      shadedHeader: false,
    },
  },
  TaskDetailsScreen: {
    title: 'Project_Task',
    component: TaskDetailsScreen,
    actionID: 'project_projectTask_details',
    options: {
      shadedHeader: false,
    },
  },
  TaskFormScreen: {
    title: 'Project_Task',
    component: TaskFormScreen,
  },
};

export {ActiveProjectScreen};
export {ProjectScreen};
export {BuisnessProjectScreen};
export {ProjectDetailsScreen};
export {TaskListScreen};
export {TaskDetailsScreen};
export {TaskFormScreen};
