import React from 'react';
import {Provider} from 'react-redux';
import {store} from '@/store';
import Scanner from '@/components/molecules/Scanner/Scanner';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigators/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <Scanner />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
