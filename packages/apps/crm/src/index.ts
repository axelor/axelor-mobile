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

import {Module} from '@axelor/aos-mobile-core';
import LeadScreens from './screens/lead';
import ProspectScreens from './screens/prospect';
import OpportunityScreens from './screens/opportunity';
import ContactScreens from './screens/contact/';
import ClientScreens from './screens/client';
import CatalogScreen from './screens/catalog';
import EventScreen from './screens/event';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as crmReducers from './features';
import {crm_modelAPI, crm_searchFields, crm_sortFields} from './models';
import {useCRMHeaders} from './hooks/use-crm-header-actions';

export const CrmModule: Module = {
  name: 'app-crm',
  title: 'Crm_Crm',
  subtitle: 'Crm_Crm',
  icon: 'users',
  compatibilityAOS: {
    moduleName: 'axelor-crm',
    downToVersion: '7.1.0',
  },
  menus: {
    crm_menu_lead: {
      title: 'Crm_Leads',
      icon: 'address-card',
      screen: 'LeadListScreen',
    },
    crm_menu_prospect: {
      title: 'Crm_Prospects',
      icon: 'user-tie',
      screen: 'ProspectsListScreen',
    },
    crm_menu_opportunity: {
      title: 'Crm_Opportunities',
      icon: 'search-dollar',
      screen: 'OpportunityListScreen',
    },
    crm_menu_client: {
      title: 'Crm_Clients',
      icon: 'users',
      screen: 'ClientsListScreen',
    },
    crm_menu_contact: {
      title: 'Crm_Contacts',
      icon: 'address-book',
      screen: 'ContactListScreen',
    },
    crm_menu_catalog: {
      title: 'Crm_Catalogs',
      icon: 'swatchbook',
      screen: 'CatalogListScreen',
    },
    crm_menu_event: {
      title: 'Crm_Events',
      icon: 'calendar-alt',
      screen: 'EventPlanningScreen',
    },
  },
  screens: {
    ...LeadScreens,
    ...ProspectScreens,
    ...OpportunityScreens,
    ...ClientScreens,
    ...ContactScreens,
    ...CatalogScreen,
    ...EventScreen,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {...crmReducers},
  models: {
    objectFields: {...crm_modelAPI},
    sortFields: {...crm_sortFields},
    searchFields: {...crm_searchFields},
    headerRegisters: useCRMHeaders,
  },
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './hooks';
export * from './screens/catalog';
export * from './screens/client';
export * from './screens/contact';
export * from './screens/event';
export * from './screens/lead';
export * from './screens/opportunity';
export * from './screens/prospect';
export * from './types';
export * from './utils';
