/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {DurationInput} from '@axelor/aos-mobile-ui';
import {
  AvailableQtyInput,
  BillableSwitchCard,
  CityFormInput,
  CurrencySearchBar,
  DistanceIncrement,
  DraftExpensePicker,
  DurationIncrement,
  DurationTimeSheetLine,
  ExpenseTypeSearchBar,
  InvitedCollaboratorViewAllList,
  KilometricAllowParamSearchBar,
  KilometricTypeSelectPicker,
  LeavePeriodInput,
  LeaveReasonSearchBar,
  ManufOrderSearchBar,
  OperationOrderSearchBar,
  ProductSearchBar,
  ProjectSearchBar,
  ProjectTaskSearchBar,
  TimerStopwatch,
  ToggleSwitchMode,
} from '../components';
import {updateExpenseDate} from '../features/kilometricAllowParamSlice';
import {updateManufOrder} from '../features/manufOrderSlice';
import {updateProject} from '../features/projectSlice';
import {ExpenseLine} from '../types';
import {checkUserImputationMode, getImputationMode} from '../utils';

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
          !storeState.appConfig.base?.enableMultiCompany ||
          storeState.company.companyList?.length === 1,
      },
      expense: {
        titleKey: 'Hr_Expense',
        type: 'object',
        widget: 'custom',
        customComponent: DraftExpensePicker,
        hideIf: ({objectState}) => !objectState.isFromExpense,
      },
      manageMode: {
        type: 'string',
        widget: 'custom',
        customComponent: ToggleSwitchMode,
        hideIf: ({objectState, storeState}) =>
          objectState.hideToggle ||
          !storeState.appConfig.mobileSettings?.isKilometricExpenseLineAllowed,
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
        options: {
          inProgress: true,
          isMemberRequired: true,
        },
        hideIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings
            ?.isExpenseProjectInvoicingEnabled,
        dependsOn: {
          projectTask: ({newValue}) => {
            return newValue?.project;
          },
        },
      },
      projectTask: {
        titleKey: 'Hr_ProjectTask',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectTaskSearchBar,
        options: {
          isMemberRequired: true,
        },
        hideIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings
            ?.isExpenseProjectInvoicingEnabled,
        dependsOn: {
          project: ({newValue, dispatch}) => {
            dispatch(updateProject(newValue));
          },
        },
      },
      toInvoice: {
        titleKey: 'Hr_ToInvoice',
        type: 'boolean',
        widget: 'custom',
        customComponent: BillableSwitchCard,
        hideIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings
            ?.isExpenseProjectInvoicingEnabled,
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
          expenseDate: ({newValue, dispatch}) => {
            dispatch(updateExpenseDate(newValue));
          },
        },
      },
      kilometricTypeSelect: {
        titleKey: 'Hr_KilometricTypeSelect',
        type: 'number',
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
        widget: 'custom',
        customComponent: CityFormInput,
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
        requiredIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
      },
      toCity: {
        titleKey: 'Hr_ToCity',
        type: 'string',
        widget: 'custom',
        customComponent: CityFormInput,
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
        requiredIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.kilometric,
      },
      distance: {
        titleKey: 'Hr_Distance',
        type: 'number',
        widget: 'custom',
        customComponent: DistanceIncrement,
        hideIf: ({objectState}) =>
          objectState.manageMode === ExpenseLine.modes.general,
      },
      currency: {
        titleKey: 'Hr_Currency',
        type: 'object',
        widget: 'custom',
        customComponent: CurrencySearchBar,
        hideIf: ({objectState, storeState}) =>
          objectState.manageMode !== ExpenseLine.modes.general ||
          !storeState.appConfig.mobileSettings?.isMultiCurrencyEnabled,
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
        readonlyIf: ({objectState}) =>
          objectState?.expenseProduct?.blockExpenseTax === true,
        dependsOn: {
          expenseProduct: ({objectState, newValue}) => {
            if (newValue?.blockExpenseTax === true) {
              return 0;
            } else {
              return objectState?.totalTax;
            }
          },
        },
      },
      invitedCollaboratorSet: {
        titleKey: 'Hr_InvitedCollaborators',
        type: 'array',
        widget: 'custom',
        customComponent: InvitedCollaboratorViewAllList,
        hideIf: ({objectState}) =>
          !objectState?.expenseProduct?.deductLunchVoucher,
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
  hr_TimesheetLine: {
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
    fields: {
      project: {
        titleKey: 'Hr_Project',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectSearchBar,
        hideIf: ({storeState}) =>
          checkUserImputationMode(storeState, getImputationMode().Project) ||
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'project',
          ),
        options: {
          manageTimeSpent: true,
          isMemberRequired: true,
        },
      },
      projectTask: {
        titleKey: 'Hr_ProjectTask',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectTaskSearchBar,
        hideIf: ({objectState, storeState}) =>
          objectState.project == null ||
          checkUserImputationMode(storeState, getImputationMode().Project) ||
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'projectTask',
          ),
        dependsOn: {
          project: ({newValue, dispatch}) => {
            dispatch(updateProject(newValue));
          },
        },
      },
      manufOrder: {
        titleKey: 'Hr_ManufOrder',
        type: 'object',
        widget: 'custom',
        customComponent: ManufOrderSearchBar,
        hideIf: ({storeState}) =>
          checkUserImputationMode(storeState, getImputationMode().ManufOrder) ||
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'manufOrder',
          ),
      },
      operationOrder: {
        titleKey: 'Hr_OperationOrder',
        type: 'object',
        widget: 'custom',
        customComponent: OperationOrderSearchBar,
        hideIf: ({storeState}) =>
          checkUserImputationMode(storeState, getImputationMode().ManufOrder) ||
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'operationOrder',
          ),
        dependsOn: {
          manufOrder: ({newValue, dispatch}) => {
            dispatch(updateManufOrder(newValue));
          },
        },
      },
      product: {
        titleKey: 'Hr_Product',
        type: 'object',
        widget: 'custom',
        customComponent: ProductSearchBar,
        hideIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'product',
          ) || !storeState.appConfig.timesheet?.enableActivity,
        dependsOn: {
          projectTask: ({objectState}) => {
            return objectState.projectTask?.product;
          },
        },
      },
      toInvoice: {
        titleKey: 'Hr_ToInvoice',
        type: 'boolean',
        widget: 'checkbox',
        options: {
          style: {width: '90%', alignSelf: 'center'},
        },
        hideIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings
            ?.isTimesheetProjectInvoicingEnabled,
      },
      date: {
        titleKey: 'Hr_Date',
        type: 'date',
        widget: 'date',
        readonlyIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings?.isEditionOfDateAllowed,
        required: true,
      },
      hoursDuration: {
        titleKey: 'Hr_DurationHours',
        type: 'number',
        widget: 'increment',
        requiredIf: ({objectState}) => !objectState.useDuration,
        hideIf: ({objectState}) => objectState.useDuration,
      },
      duration: {
        titleKey: 'Hr_Duration',
        type: 'number',
        widget: 'custom',
        customComponent: DurationTimeSheetLine,
        requiredIf: ({objectState}) => objectState.useDuration,
        hideIf: ({objectState}) => !objectState.useDuration,
      },
      comments: {
        titleKey: 'Hr_Comments',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
          style: {marginBottom: 100, width: '90%', alignSelf: 'center'},
        },
      },
    },
  },
  hr_Timer: {
    modelName: 'com.axelor.apps.hr.db.TSTimer',
    fields: {
      startDateTime: {
        titleKey: 'Hr_Date',
        type: 'datetime',
        widget: 'date',
        required: true,
      },
      project: {
        titleKey: 'Hr_Project',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectSearchBar,
        hideIf: ({storeState}) =>
          checkUserImputationMode(storeState, getImputationMode().Project) ||
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'project',
          ),
        options: {
          manageTimeSpent: true,
        },
      },
      projectTask: {
        titleKey: 'Hr_ProjectTask',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectTaskSearchBar,
        options: {
          isAssignedToRequired: true,
        },
        hideIf: ({storeState}) =>
          checkUserImputationMode(storeState, getImputationMode().Project) ||
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'projectTask',
          ),
        dependsOn: {
          project: ({newValue, dispatch}) => {
            dispatch(updateProject(newValue));
          },
        },
      },
      product: {
        titleKey: 'Hr_Product',
        type: 'object',
        widget: 'custom',
        customComponent: ProductSearchBar,
        hideIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings?.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'product',
          ),
        dependsOn: {
          projectTask: ({objectState}) => {
            return objectState.projectTask?.product;
          },
        },
        required: true,
      },
      updatedDuration: {
        titleKey: 'Hr_UpdatedDuration',
        type: 'string',
        widget: 'custom',
        customComponent: DurationInput,
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
      stopwatch: {
        type: 'object',
        widget: 'custom',
        customComponent: TimerStopwatch,
      },
    },
  },
  hr_Leave: {
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
    fields: {
      perdiodDate: {
        type: 'object',
        widget: 'custom',
        customComponent: LeavePeriodInput,
      },
      perdiodDateError: {
        type: 'string',
        validationOptions: {
          required: {
            customErrorKey: 'Hr_PeriodDateError',
          },
        },
        dependsOn: {
          perdiodDate: ({newValue}) => {
            if (newValue.isDateError || newValue.isStartEndError) {
              return '';
            } else {
              return 'OK';
            }
          },
        },
        hideIf: () => true,
      },
      leaveReason: {
        titleKey: 'Hr_LeaveReason',
        type: 'object',
        widget: 'custom',
        customComponent: LeaveReasonSearchBar,
      },
      availableQty: {
        titleKey: 'Hr_AvailableQty',
        type: 'number',
        widget: 'custom',
        customComponent: AvailableQtyInput,
      },
      duration: {
        titleKey: 'Hr_Duration',
        type: 'number',
        readonly: true,
        widget: 'custom',
        customComponent: DurationIncrement,
      },
      comments: {
        titleKey: 'Hr_Comments',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
          style: {marginBottom: 100, width: '90%', alignSelf: 'center'},
        },
      },
    },
  },
};
