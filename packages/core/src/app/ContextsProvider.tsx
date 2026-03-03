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

import React, {useEffect, useMemo, useState} from 'react';
import {Provider} from 'react-redux';
import {
  ConfigProvider,
  OutsideAlerterProvider,
  ThemeProvider,
  WritingThemeProvider,
  Theme,
  Writing,
  ThemeColors,
  WritingStyles,
} from '@axelor/aos-mobile-ui';
import {configI18n} from '../i18n/i18n';
import enTranslation from '../i18n/translations/en.json';
import frTranslation from '../i18n/translations/fr.json';
import {configGlobalStore} from '../redux/store';
import {requestBuilder} from '../apiProviders/Standard/requests.helper';
import {webSocketProvider} from '../websocket';
import {HeaderBandProvider} from '../header';
import {Module} from './modules';

interface ContextsProviderProps {
  modules: Module[];
  additionalsReducers?: any;
  themes?: Theme[];
  defaultTheme?: Theme;
  writingThemes?: Writing[];
  defaultWritingTheme?: Writing;
  children: React.ReactNode;
  defaultLanguage: string;
  defaultRequestLimit: number;
  enableWebSocket: boolean;
  themeColorsConfig?: ThemeColors;
  writingStylesConfig?: WritingStyles;
  showModulesSubtitle?: boolean;
}

const ContextsProvider = ({
  modules,
  additionalsReducers,
  themes,
  defaultTheme,
  writingThemes,
  defaultWritingTheme,
  children,
  defaultLanguage = 'en',
  defaultRequestLimit = 10,
  enableWebSocket = true,
  themeColorsConfig,
  writingStylesConfig,
  showModulesSubtitle = false,
}: ContextsProviderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appTranslations = modules
      .filter(_module => _module.translations)
      .reduce(
        (translations, _module) => {
          return {
            en: {...translations.en, ..._module.translations?.en},
            fr: {...translations.fr, ..._module.translations?.fr},
          };
        },
        {en: enTranslation, fr: frTranslation},
      );

    configI18n({
      resources: [
        {lng: 'en', translationsObject: appTranslations.en},
        {lng: 'fr', translationsObject: appTranslations.fr},
      ],
      defaultLanguage: defaultLanguage,
    });
    setLoading(false);
    // NOTE: I18n should be initialize only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const externalsReducers = useMemo(
    () =>
      modules
        .filter(_module => _module.reducers)
        .reduce((reducers, _module) => ({...reducers, ..._module.reducers}), {
          ...additionalsReducers,
        }),
    [additionalsReducers, modules],
  );

  const store = useMemo(
    () => configGlobalStore(externalsReducers),
    [externalsReducers],
  );

  useEffect(() => {
    requestBuilder.init(defaultRequestLimit);
  }, [defaultRequestLimit]);

  useEffect(() => {
    webSocketProvider.enableWebSocket(enableWebSocket);
  }, [enableWebSocket]);

  if (loading) {
    return null;
  }

  return (
    <Provider store={store} identityFunctionCheck="never">
      <OutsideAlerterProvider>
        <ThemeProvider
          themes={themes}
          defaultTheme={defaultTheme}
          themeColorsConfig={themeColorsConfig}>
          <WritingThemeProvider
            themes={writingThemes}
            defaultTheme={defaultWritingTheme}
            writingStylesConfig={writingStylesConfig}>
            <ConfigProvider showModulesSubtitle={showModulesSubtitle}>
              <HeaderBandProvider>{children}</HeaderBandProvider>
            </ConfigProvider>
          </WritingThemeProvider>
        </ThemeProvider>
      </OutsideAlerterProvider>
    </Provider>
  );
};

export default ContextsProvider;
