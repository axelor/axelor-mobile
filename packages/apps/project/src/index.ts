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

import {Module} from '@axelor/aos-mobile-core';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import Screens from './screens';
import * as projectReducers from './features';
import {
  project_formsRegister,
  project_modelAPI,
  project_searchFields,
  project_sortFields,
  project_typeObjects,
} from './models';
import {useProjectHeaders} from './hooks/use-project-header-actions';

export const ProjectModule: Module = {
  name: 'app-project',
  title: 'Project_Project',
  subtitle: 'Project_Project',
  icon: 'ui-checks',
  compatibilityAOS: {
    moduleName: 'axelor-project',
    downToVersion: '8.2.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    project_menu_activeProject: {
      title: 'Project_ActiveProject',
      icon: 'clipboard2-check',
      screen: 'ActiveProjectScreen',
    },
    project_menu_projects: {
      title: 'Project_Projects',
      icon: 'clipboard2-data',
      screen: 'ProjectListScreen',
    },
    project_menu_tasks: {
      title: 'Project_Tasks',
      icon: 'card-list',
      screen: 'TaskListScreen',
    },
  },
  screens: Screens,
  reducers: {
    ...projectReducers,
  },
  models: {
    objectFields: {...project_modelAPI},
    searchFields: {...project_searchFields},
    sortFields: {...project_sortFields},
    formsRegister: {...project_formsRegister},
    headerRegisters: useProjectHeaders,
    typeObjects: project_typeObjects,
  },
  requiredConfig: ['AppProject'],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './hooks';
export * from './screens/CheckListItem';
export * from './screens/Project';
export * from './screens/Task';
export * from './types';
