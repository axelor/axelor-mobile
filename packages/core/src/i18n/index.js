export {postTranslations} from './api/translation';
export {
  default as Translator,
  selectLanguage,
  getTranslations,
} from './component/Translator';
export {
  default as useTranslator,
  TranslatorProps,
} from './hooks/use-translator';
export {i18nProvider, configI18n} from './i18n';
