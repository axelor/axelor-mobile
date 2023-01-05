import React, {createContext, useEffect, useMemo, useState} from 'react';
import {Provider} from 'react-redux';
import {
  ConfigProvider,
  OutsideAlerterProvider,
  ThemeProvider,
  WritingThemeProvider,
  Theme,
  Writing,
} from '@axelor/aos-mobile-ui';
import {Module} from './Module';
import {configI18n} from '../i18n/i18n';
import enTranslation from '../i18n/translations/en.json';
import frTranslation from '../i18n/translations/fr.json';
import {configGlobalStore} from '../redux/store';

const ApplicationContext = createContext(null);

interface ContextsProviderProps {
  modules: [Module];
  additionalsReducers?: any;
  themes?: Theme[];
  defaultTheme?: Theme;
  writingThemes?: Writing[];
  defaultWritingTheme?: Writing;
  children: React.ReactNode;
}

const ContextsProvider = ({
  modules,
  additionalsReducers,
  themes,
  defaultTheme,
  writingThemes,
  defaultWritingTheme,
  children,
}: ContextsProviderProps) => {
  const [loading, setLoading] = useState(true);

  const appTranslations = useMemo(
    () =>
      modules.reduce(
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
    });
    setLoading(false);
    // I18n should be initialize only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const externalsReducers = useMemo(
    () =>
      modules.reduce(
        (reducers, _module) => ({...reducers, ..._module.reducers}),
        {
          ...additionalsReducers,
        },
      ),
    [additionalsReducers, modules],
  );

  const store = useMemo(
    () => configGlobalStore(externalsReducers),
    [externalsReducers],
  );

  if (loading) {
    return null;
  }

  return (
    <ApplicationContext.Provider value={{}}>
      <Provider store={store}>
        <OutsideAlerterProvider>
          <ThemeProvider themes={themes} defaultTheme={defaultTheme}>
            <WritingThemeProvider
              themes={writingThemes}
              defaultTheme={defaultWritingTheme}>
              <ConfigProvider>{children}</ConfigProvider>
            </WritingThemeProvider>
          </ThemeProvider>
        </OutsideAlerterProvider>
      </Provider>
    </ApplicationContext.Provider>
  );
};

export default ContextsProvider;
