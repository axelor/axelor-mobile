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

import {Module} from '../app';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as authReducers from './features';
import {
  ProcessesHistroyListScreen,
  SettingsScreen,
  UserScreen,
} from './screens';
import {auth_modelAPI} from './models';
import {useAuthHeaders} from './hooks/use-auth-headers';

export const authModule: Module = {
  name: 'Auth',
  title: 'User_User',
  subtitle: 'User_User',
  icon: 'person-fill',
  menus: {
    auth_menu_user: {
      title: 'User_UserProfile',
      icon: 'person-fill',
      screen: 'UserScreen',
      isDefault: true,
    },
  },
  screens: {
    UserScreen: {
      title: 'User_UserProfile',
      component: UserScreen,
      actionID: 'auth_user_profile',
    },
    SettingsScreen: {
      title: 'User_Settings',
      component: SettingsScreen,
    },
    ProcessesHistroyListScreen: {
      title: 'User_ProcessHistory',
      component: ProcessesHistroyListScreen,
    },
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...authReducers,
  },
  models: {
    objectFields: {...auth_modelAPI},
    headerRegisters: useAuthHeaders,
  },
  requiredConfig: ['AppBase', 'AppMobileSettings'],
};

export * from './screens';
export * from './api';
export * from './features/asyncFunctionsIndex';
export * from './storage/ProcessStorage';
