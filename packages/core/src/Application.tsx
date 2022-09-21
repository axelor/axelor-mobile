import React, {createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Store} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import Module from './Module';
import RootNavigator from './RootNavigator';

const ApplicationContext = createContext(null);

interface ApplicationProsp {
  modules: [Module];
  store: Store;
}

const Application = ({modules, store}: ApplicationProsp) => {
  return (
    <ApplicationContext.Provider value={{}}>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </ApplicationContext.Provider>
  );
};

export default Application;
