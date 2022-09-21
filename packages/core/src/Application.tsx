import React, {createContext, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Store} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import Module from './Module';
import RootNavigator from './RootNavigator';
import Translator from './i18n/component/Translator';
import {configI18n} from './i18n/i18n';
import enTranslation from './i18n/translations/en.json';
import frTranslation from './i18n/translations/fr.json';
import {Text} from '@aos-mobile/ui';

const ApplicationContext = createContext(null);

interface ApplicationProps {
  modules: [Module];
  store: Store;
}

const Application = ({modules, store}: ApplicationProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    configI18n({
      resources: [
        {lng: 'en', translationsObject: enTranslation},
        {lng: 'fr', translationsObject: frTranslation},
      ],
    });
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ApplicationContext.Provider value={{}}>
      <Provider store={store}>
        <Translator />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </ApplicationContext.Provider>
  );
};

export default Application;
