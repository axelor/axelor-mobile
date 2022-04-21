import React from 'react';
import {Provider} from 'react-redux';
import {store} from '@/store';
import LoginScreen from '@/modules/auth/screens/LoginScreen';

const App = () => {
  return (
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
};

export default App;
