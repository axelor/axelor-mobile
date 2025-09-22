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

import ProjectDetailsScreen from './ProjectDetailsScreen';
import ActiveProjectScreen from './ActiveProjectScreen';
import ProjectListScreen from './ProjectListScreen';

export const ProjectScreens = {
  ProjectListScreen: {
    title: 'Project_Projects',
    component: ProjectListScreen,
    options: {shadedHeader: false},
    actionID: 'project_project_list',
  },
  ActiveProjectScreen: {
    title: 'Project_ActiveProject',
    component: ActiveProjectScreen,
    actionID: 'project_project_details',
    options: {shadedHeader: false},
  },
  ProjectDetailsScreen: {
    title: 'Project_Projects',
    component: ProjectDetailsScreen,
    actionID: 'project_project_details',
    options: {shadedHeader: false},
  },
};

export {ActiveProjectScreen};
export {ProjectListScreen};
export {ProjectDetailsScreen};
