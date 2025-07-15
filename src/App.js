/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {Application} from '@axelor/aos-mobile-core';
import {StockModule} from '@axelor/aos-mobile-stock';
import {ManufacturingModule} from '@axelor/aos-mobile-manufacturing';
import {CrmModule} from '@axelor/aos-mobile-crm';
import {HelpDeskModule} from '@axelor/aos-mobile-helpdesk';
import {HrModule} from '@axelor/aos-mobile-hr';
import {QualityModule} from '@axelor/aos-mobile-quality';
import {InterventionModule} from '@axelor/aos-mobile-intervention';
import {SaleModule} from '@axelor/aos-mobile-sale';
import {ProjectModule} from '@axelor/aos-mobile-project';
import {PurchaseModule} from '@axelor/aos-mobile-purchase';
import {DmsModule} from '@axelor/aos-mobile-dms';
import {MessageModule} from '@axelor/aos-mobile-message';
import {MaintenanceModule} from '@axelor/aos-mobile-maintenance';
import application_properties from '../package.json';
import {app_config} from './app.config';

const App = () => {
  return (
    <Application
      modules={[
        StockModule,
        ManufacturingModule,
        CrmModule,
        HelpDeskModule,
        HrModule,
        QualityModule,
        InterventionModule,
        SaleModule,
        ProjectModule,
        DmsModule,
        PurchaseModule,
        MessageModule,
        MaintenanceModule,
      ]}
      mainMenu="auth_menu_user"
      version={application_properties.version}
      configuration={app_config}
    />
  );
};

export default App;
