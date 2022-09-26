import React, {createContext, useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Store} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {Module} from './Module';
import RootNavigator from './RootNavigator';
import Translator from './i18n/component/Translator';
import {configI18n} from './i18n/i18n';
import enTranslation from './i18n/translations/en.json';
import frTranslation from './i18n/translations/fr.json';
import {lightTheme, ThemeProvider} from '@aos-mobile/ui';
import ErrorBoundary from './ErrorBoundary';

const ApplicationContext = createContext(null);

interface ApplicationProps {
  modules: [Module];
  mainMenu: string;
  store: Store;
}

const Application = ({modules, mainMenu, store}: ApplicationProps) => {
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={[styles.success, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={[styles.error, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
  };

  const [loading, setLoading] = useState(true);

  const appTranslations = useMemo(
    () =>
      modules.reduce(
        (translations, module) => ({...translations, ...module.translations}),
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

  if (loading) {
    return null;
  }

  return (
    <ApplicationContext.Provider value={{}}>
      <Provider store={store}>
        <ThemeProvider>
          <Translator />
          <ErrorBoundary>
            <NavigationContainer>
              <RootNavigator modules={modules} mainMenu={mainMenu} />
            </NavigationContainer>
          </ErrorBoundary>
          <Toast config={toastConfig} />
        </ThemeProvider>
      </Provider>
    </ApplicationContext.Provider>
  );
};

const styles = StyleSheet.create({
  error: {
    borderLeftColor: lightTheme.colors.errorColor,
  },
  success: {
    borderLeftColor: lightTheme.colors.primaryColor,
  },
  toast: {
    width: '90%',
    height: 90,
  },
  toastContent: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    color: lightTheme.colors.text,
    flex: 1,
  },
  detail: {
    fontSize: 16,
    color: lightTheme.colors.text,
    flex: 3,
  },
});

export default Application;
