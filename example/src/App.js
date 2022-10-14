import React from 'react';
import {Application} from '@aos-mobile/core';
import StockModule from '@/modules/stock';
import AuthModule from '@/modules/auth';
import ManufacturingModule from '@/modules/manufacturing';
import * as rootReducers from '@/features';
import application_properties from '../package.json';

const appModules = [StockModule, ManufacturingModule, AuthModule];

const App = () => {
  return (
    <Application
      modules={appModules}
      mainMenu="auth_menu_user"
      additionalsReducers={{...rootReducers}}
      version={application_properties.version}
    />
  );
};

export default App;
