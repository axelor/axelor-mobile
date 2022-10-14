import React from 'react';
import {Application, configGlobalStore} from '@aos-mobile/core';
import StockModule from '@/modules/stock';
import AuthModule from '@/modules/auth';
import ManufacturingModule from '@/modules/manufacturing';
import * as rootReducers from '@/features';
import * as authReducers from '@/modules/auth/features';
import * as stockReducers from '@/modules/stock/features';
import * as manufacturingReducers from '@/modules/manufacturing/features';
import application_properties from '../package.json';

const store = configGlobalStore({
  ...rootReducers,
  ...authReducers,
  ...stockReducers,
  ...manufacturingReducers,
});

const appModules = [StockModule, ManufacturingModule, AuthModule];

const App = () => {
  return (
    <Application
      modules={appModules}
      mainMenu="auth_menu_user"
      store={store}
      version={application_properties.version}
    />
  );
};

export default App;
