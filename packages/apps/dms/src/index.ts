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

import {getLoggedUser, Module, modulesProvider} from '@axelor/aos-mobile-core';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import DmsScreens from './screens';
import * as dmsReducers from './features';
import {
  dms_formsRegister,
  dms_modelAPI,
  dms_searchFields,
  dms_sortFields,
} from './models';
import {useDMSHeaders} from './hooks/use-dms-header-actions';
import {createMenusScreen} from './utils';

export const DmsModule: Module = {
  name: 'app-dms',
  title: 'Dms_Dms',
  subtitle: 'Dms_Dms',
  icon: 'inboxes-fill',
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    dms_menu_allDocuments: {
      title: 'Dms_AllDocuments',
      icon: 'folder',
      screen: 'AllDocumentsScreen',
    },
  },
  screens: {
    ...DmsScreens,
  },
  reducers: {
    ...dmsReducers,
  },
  models: {
    objectFields: {...dms_modelAPI},
    searchFields: {...dms_searchFields},
    sortFields: {...dms_sortFields},
    formsRegister: {...dms_formsRegister},
    headerRegisters: useDMSHeaders,
  },
  moduleRegister: async (userId: number) => {
    const user = await getLoggedUser(userId)
      .then(res => res?.data?.data?.[0])
      .catch(() => ({}));

    const {menus, screens} = createMenusScreen({
      favouriteFolderSet: user?.favouriteFolderSet,
      favouriteFileSet: user?.favouriteFileSet,
    });

    modulesProvider.registerModule({
      name: 'app-dms-favorites',
      menus,
      screens,
    });
  },
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens';
export * from './types';
export * from './utils';
