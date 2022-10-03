import React from 'react';
import {Provider} from 'react-redux';
import {Application, configGlobalStore} from '@aos-mobile/core';
import StockModule from '@/modules/stock';
import AuthModule from '@/modules/auth';
import * as rootReducers from '@/features';
import * as authReducers from '@/modules/auth/features';
import * as stockReducers from '@/modules/stock/features';

const store = configGlobalStore({
  ...rootReducers,
  ...authReducers,
  ...stockReducers,
});

const appModules = [StockModule, AuthModule];

const App = () => {
  return (
    <Provider store={store}>
      <Application
        modules={appModules}
        mainMenu="auth_menu_user"
        store={store}
      />
    </Provider>
  );
};

export default App;
