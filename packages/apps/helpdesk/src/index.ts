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
import MyTicketScreens from './screens/';
import {
  helpdesk_modelAPI,
  helpdesk_searchFields,
  helpdesk_sortFields,
  helpdesk_formsRegister,
  helpdesk_typeObjects,
} from './models';
import * as helpdeskReducers from './features';
import {useHelpdeskHeaders} from './hooks/use-helpdesk-header-actions';

export const HelpDeskModule: Module = {
  name: 'app-helpdesk',
  title: 'Helpdesk_Helpdesk',
  subtitle: 'Helpdesk_Helpdesk',
  icon: 'life-preserver',
  compatibilityAOS: {
    moduleName: 'axelor-helpdesk',
    downToVersion: '7.1.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    helpdesk_menu_myTickets: {
      title: 'Helpdesk_myTickets',
      icon: 'user-tag',
      screen: 'MyTicketListScreen',
    },
    helpdesk_menu_myTeamTickets: {
      title: 'Helpdesk_myTeamTickets',
      icon: 'people-fill',
      screen: 'MyTeamTicketListScreen',
    },
    helpdesk_menu_createTicket: {
      title: 'helpdesk_createTicket',
      icon: 'plus-lg',
      screen: 'TicketFormScreen',
    },
  },
  screens: {
    ...MyTicketScreens,
  },
  reducers: {...helpdeskReducers},
  models: {
    objectFields: {...helpdesk_modelAPI},
    sortFields: {...helpdesk_sortFields},
    searchFields: {...helpdesk_searchFields},
    headerRegisters: useHelpdeskHeaders,
    formsRegister: {...helpdesk_formsRegister},
    typeObjects: helpdesk_typeObjects,
  },
  requiredConfig: ['AppHelpdesk'],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens';
export * from './types';
export * from './utils';
