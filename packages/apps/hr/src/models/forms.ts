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
import {
  ExpenseTypeSearchBar,
  KilometricAllowParamSearchBar,
  KilometricTypeSelectPicker,
  ProjectSearchBar,
  ToggleSwitchMode,
} from '../components';

const MODES = {
  general: 'general',
  kilometric: 'kilometric',
};

export const hr_formsRegister: FormConfigs = {
  hr_Expenseline: {
    modelName: 'com.axelor.apps.hr.db.ExpenseLine',
    fields: {
      manageMode: {
        titleKey: 'Hr_Manage_Mode',
        type: 'string',
        widget: 'custom',
        customComponent: ToggleSwitchMode,
      },
      project: {
        titleKey: 'Hr_Project',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectSearchBar,
      },
      expenseType: {
        titleKey: 'Hr_ExpenseType',
        type: 'object',
        widget: 'custom',
        customComponent: ExpenseTypeSearchBar,
        /*hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.kilometric;
        },*/
      },
      kilometricAllowParam: {
        titleKey: 'Hr_KilomectricAllowParam',
        type: 'object',
        widget: 'custom',
        customComponent: KilometricAllowParamSearchBar,
        /*hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.general;
        },*/
        //required:,
      },
      kilometricTypeSelect: {
        titleKey: 'Hr_KilometricTypeSelect',
        type: 'object',
        widget: 'custom',
        customComponent: KilometricTypeSelectPicker,
        /*hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.general;
        },*/
      },
      distance: {
        titleKey: 'Hr_Distance',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.general;
        },
      },
      fromCity: {
        titleKey: 'Hr_FromCity',
        type: 'string',
        widget: 'default',
        hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.general;
        },
      },
      toCity: {
        titleKey: 'Hr_toCity',
        type: 'string',
        widget: 'default',
        hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.general;
        },
      },
      expenseDate: {
        titleKey: 'Hr_ExpenseDate',
        type: 'date',
        widget: 'date',
        required: true,
      },
      totalAmount: {
        titleKey: 'Hr_TotalAmount',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.kilometric;
        },
      },
      totalTax: {
        titleKey: 'Hr_TotalTax',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.kilometric;
        },
      },
      justificationMetaFile: {
        titleKey: 'Hr_Justification',
        type: 'object',
        widget: 'file',
        hideIf: ({objectState}) => {
          console.log(objectState);
          return objectState.manageMode === MODES.kilometric;
        },
      },
      comments: {
        titleKey: 'Hr_Comments',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
        },
      },
    },
  },
};
