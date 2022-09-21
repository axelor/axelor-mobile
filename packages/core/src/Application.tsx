import React, {createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Module from './Module';
import RootNavigator from './RootNavigator';

const ApplicationContext = createContext(null);

interface ApplicationProsp {
  modules: [Module];
}

const Application = ({modules}: ApplicationProsp) => {
  return (
    <ApplicationContext.Provider value={{}}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApplicationContext.Provider>
  );
};

export default Application;
