import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {StockModule} from '@axelor/aos-mobile-stock';
import {ManufacturingModule} from '@axelor/aos-mobile-manufacturing';
import application_properties from '../package.json';

const App = () => {
  return (
    <Application
      modules={[StockModule, ManufacturingModule]}
      mainMenu="auth_menu_user"
      version={application_properties.version}
    />
  );
};

export default App;
