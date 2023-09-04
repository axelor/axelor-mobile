/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {ToggleSwitchMode} from '../components';

export const hr_formsRegister: FormConfigs = {
  hr_Expenseline: {
    modelName: 'com.axelor.apps.hr.db.ExpenseLine',
    fields: {
      manageMode: {
        titleKey: 'Hr_Manage_Mode',
        type: 'object',
        widget: 'custom',
        customComponent: ToggleSwitchMode,
      },
      name: {
        titleKey: 'test',
        type: 'string',
        dependsOn: {
          fieldName: 'manageMode',
          onChange: e => {
            console.log(e);
          },
        },
      },
    },
  },
};
