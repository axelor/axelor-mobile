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

import i18next, {i18n} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {formatResources} from './helpers/langages';

export interface resourcesBinding {
  lng: string;
  translationsObject: any;
}

export interface langagesResources {
  resources: resourcesBinding[];
  defaultLanguage: string;
}

class I18nProvider {
  private resources: any;
  private i18next: i18n;

  constructor() {
    this.resources = [];
    this.i18next = i18next;
  }

  get i18n() {
    return this.i18next;
  }

  configI18n({resources, defaultLanguage}: langagesResources) {
    this.resources = formatResources({resources});
    this.initI18n(defaultLanguage);
  }

  initI18n = defaultLanguage => {
    this.i18next.use(initReactI18next).init({
      compatibilityJSON: 'v4',
      lng: defaultLanguage,
      fallbackLng: 'en',
      resources: this.resources,
      react: {
        bindI18nStore: 'added',
      },
    });
  };
}

export const i18nProvider = new I18nProvider();

export const configI18n = ({
  resources,
  defaultLanguage = 'en',
}: langagesResources) => i18nProvider.configI18n({resources, defaultLanguage});
