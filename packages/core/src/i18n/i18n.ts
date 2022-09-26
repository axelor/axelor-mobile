import i18next, {i18n} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {formatResources, getSupportedLangages} from './helpers/langages';

export interface resourcesBinding {
  lng: string;
  translationsObject: any;
}

export interface langagesResources {
  resources: resourcesBinding[];
}

class I18nProvider {
  private supportedLng: string[];
  private resources: any;
  private i18next: i18n;

  constructor() {
    this.supportedLng = [];
    this.resources = [];
    this.i18next = i18next;
  }

  get i18n() {
    return this.i18next;
  }

  configI18n({resources}: langagesResources) {
    this.supportedLng = getSupportedLangages({resources});
    this.resources = formatResources({resources});
    this.initI18n();
  }

  initI18n = () => {
    this.i18next.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      lng: 'en',
      fallbackLng: 'en',
      supportedLngs: this.supportedLng,
      resources: this.resources,
      react: {
        bindI18nStore: 'added',
      },
    });
  };
}

export const i18nProvider = new I18nProvider();

export const configI18n = ({resources}: langagesResources) =>
  i18nProvider.configI18n({resources});
