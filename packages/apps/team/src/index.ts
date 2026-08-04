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
import {default as TeamScreens} from './screens';
import * as teamReducers from './features';
import {
  team_formsRegister,
  team_modelAPI,
  team_searchFields,
  team_sortFields,
  team_typeObjects,
} from './models';
import {useTeamHeaders} from './hooks/use-team-header';

export const TeamModule: Module = {
  name: 'app-team',
  title: 'Team_Team',
  subtitle: 'Team_Team',
  icon: 'person-fill',
  compatibilityAOS: {moduleName: 'axelor-core', downToVersion: '8.2.0'},
  translations: {en: enTranslations, fr: frTranslations},
  menus: {
    team_menu_teamTasks: {
      title: 'Team_Tasks',
      icon: 'card-list',
      screen: 'TeamTaskListScreen',
    },
  },
  screens: TeamScreens,
  reducers: teamReducers,
  models: {
    formsRegister: team_formsRegister,
    objectFields: team_modelAPI,
    searchFields: team_searchFields,
    sortFields: team_sortFields,
    typeObjects: team_typeObjects,
    headerRegisters: useTeamHeaders,
  },
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens';
