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
  BillableSwitchCard,
  CurrencySearchBar,
  ExpenseTypeSearchBar,
  KilometricAllowParamSearchBar,
  KilometricTypeSelectPicker,
  ProjectSearchBar,
  ToggleSwitchMode,
} from '../components';
import {ExpenseLine} from '../types';
import {updateExpenseDate} from '../features/kilometricAllowParamSlice';

export const hr_formsRegister: FormConfigs = {
  hr_Expenseline: {
    modelName: 'com.axelor.apps.hr.db.ExpenseLine',
    fields: {
      companyName: {
        titleKey: 'User_ActiveCompany',
        type: 'string',
        widget: 'default',
        readonly: true,
        hideIf: ({storeState}) =>
          !storeState.config.baseConfig.enableMultiCompany ||
          storeState.company.companyList?.length === 1,
      },
      manageMode: {
        type: 'string',
        widget: 'custom',
        customComponent: ToggleSwitchMode,
        hideIf: ({objectState}) => objectState.hideToggle,
      },
      justificationMetaFile: {
        titleKey: 'Hr_Justification',
        type: 'object',
        widget: 'file',
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
        options: {
          displayPreview: true,
        },
      },
      expenseDate: {
        titleKey: 'Hr_ExpenseDate',
        type: 'date',
        widget: 'date',
        required: true,
      },
      project: {
        titleKey: 'Hr_Project',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectSearchBar,
      },
      toInvoice: {
        titleKey: 'Hr_ToInvoice',
        type: 'boolean',
        widget: 'custom',
        customComponent: BillableSwitchCard,
      },
      expenseProduct: {
        titleKey: 'Hr_ExpenseType',
        type: 'object',
        widget: 'custom',
        customComponent: ExpenseTypeSearchBar,
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
        requiredIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
      },
      kilometricAllowParam: {
        titleKey: 'Hr_KilometricAllowParam',
        type: 'object',
        widget: 'custom',
        customComponent: KilometricAllowParamSearchBar,
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
        requiredIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
        dependsOn: {
          fieldName: 'expenseDate',
          onChange: ({newValue, dispatch}) => {
            dispatch(updateExpenseDate(newValue));
          },
        },
      },
      kilometricTypeSelect: {
        titleKey: 'Hr_KilometricTypeSelect',
        type: 'object',
        widget: 'custom',
        customComponent: KilometricTypeSelectPicker,
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
        requiredIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
      },
      fromCity: {
        titleKey: 'Hr_FromCity',
        type: 'string',
        widget: 'default',
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
        requiredIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
      },
      toCity: {
        titleKey: 'Hr_ToCity',
        type: 'string',
        widget: 'default',
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
        requiredIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
      },
      distance: {
        titleKey: 'Hr_Distance',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
      },
      currency: {
        titleKey: 'Hr_Currency',
        type: 'object',
        widget: 'custom',
        customComponent: CurrencySearchBar,
        hideIf: ({objectState}) =>
          objectState.manageMode !== ExpenseLine.modes.general,
      },
      totalAmount: {
        titleKey: 'Hr_TotalATI',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
      },
      totalTax: {
        titleKey: 'Hr_TotalTax',
        type: 'number',
        widget: 'increment',
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
      },
      comments: {
        titleKey: 'Hr_Comments',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
          style: {marginBottom: 40, width: '90%', alignSelf: 'center'},
        },
      },
    },
  },
};
