import {Module} from '@aos-mobile/core';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';

export const CrmModule: Module = {
  name: 'Crm',
  title: 'Crm_Crm',
  icon: 'users',
  menus: {},
  screens: {},
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
};

export * from './components';
