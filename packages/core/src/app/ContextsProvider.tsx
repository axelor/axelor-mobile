/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {createContext, useEffect, useMemo, useState} from 'react';
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
import {Models, Module} from './Module';
import {configI18n} from '../i18n/i18n';
import enTranslation from '../i18n/translations/en.json';
import frTranslation from '../i18n/translations/fr.json';
import {configGlobalStore} from '../redux/store';
import {useBackgroundFunction} from '../hooks/use-background-function';
import {addModuleModels} from './context.helper';
import {objectFieldsProvider} from '../apiProviders';
import {requestBuilder} from '../apiProviders/Standard/requests.helper';
import {core_modelAPI, core_searchFields, core_sortFields} from '../models';
import {HeaderBandProvider} from '../header';
import {addModuleForms, formConfigsProvider} from '../forms';
import {initSelections} from '../selections';

const ApplicationContext = createContext(null);

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
  themeColorsConfig,
  writingStylesConfig,
  showModulesSubtitle = false,
}: ContextsProviderProps) => {
  const [loading, setLoading] = useState(true);

  const appTranslations = useMemo(
    () =>
      modules
        .filter(_module => _module.translations)
        .reduce(
          (translations, _module) => ({
            en: {...translations.en, ..._module.translations?.en},
            fr: {...translations.fr, ..._module.translations?.fr},
          }),
          {en: enTranslation, fr: frTranslation},
        ),
    [modules],
  );

  useEffect(() => {
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

  const modulesBackgroundFunctions = useMemo(() => {
    return modules
      .filter(_module => _module.backgroundFunctions)
      .flatMap(_module => _module.backgroundFunctions);
  }, [modules]);

  const store = useMemo(
    () => configGlobalStore(externalsReducers),
    [externalsReducers],
  );

  useBackgroundFunction(modulesBackgroundFunctions);

  const modulesObjectFields: Models = useMemo(
    () =>
      modules
        .filter(_module => _module.models)
        .reduce(addModuleModels, {
          objectFields: {...core_modelAPI},
          sortFields: {...core_sortFields},
          searchFields: {...core_searchFields},
          typeObjects: [],
        }),
    [modules],
  );

  const modulesFormsRegisters = useMemo(() => {
    return modules
      .filter(_module => _module.models?.formsRegister)
      .map(_module => _module.models.formsRegister)
      .reduce((forms, _moduleForms) => addModuleForms(forms, _moduleForms), {});
  }, [modules]);

  useEffect(() => {
    objectFieldsProvider.init(modulesObjectFields);
    initSelections(modulesObjectFields.typeObjects);
    requestBuilder.init(defaultRequestLimit);
    formConfigsProvider.init(modulesFormsRegisters);
  }, [defaultRequestLimit, modulesObjectFields, modulesFormsRegisters]);

  if (loading) {
    return null;
  }

  return (
    <ApplicationContext.Provider value={{}}>
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
    </ApplicationContext.Provider>
  );
};

export default ContextsProvider;
