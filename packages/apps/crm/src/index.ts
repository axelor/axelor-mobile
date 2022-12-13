import {Module} from '@aos-mobile/core';
import Crm from './screens/crm';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as crmReducers from './features';

export const CrmModule: Module = {
  name: 'Crm',
  title: 'Crm_Crm',
  icon: 'users',
  menus: {
    Crm: {
      title: 'Crm_CrmLeads',
      icon: 'address-card',
      screen: 'LeadListScreen',
    },
  },
  screens: {
    ...Crm,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {...crmReducers},
};

export * from './types';
export * from './components';
export * from './api';
export * from './features/asyncFunctions-index';

export * from './screens/crm';
