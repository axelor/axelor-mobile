import i18next from 'i18next';
import enTranslation from './i18n/en.json';
import frTranslation from './i18n/fr.json';

i18next.init({
  compatibilityJSON: 'v3',
  lng: ['en', 'fr'],
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
});

export const I18n = i18next;

export default lng => i18next.getFixedT(lng);
