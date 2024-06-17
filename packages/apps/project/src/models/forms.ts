/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import {FormConfigs, getTypes} from '@axelor/aos-mobile-core';
import {
  ProductSearchBar,
  ProjectSearchBar,
  ProjectTaskSearchBar,
  updateProject,
} from '@axelor/aos-mobile-hr';
import {ValidationTimesheetLineButton} from '../components';

export const project_formsRegister: FormConfigs = {
  project_TimesheetLine: {
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
    fields: {
      project: {
        titleKey: 'Hr_Project',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectSearchBar,
        readonly: true,
      },
      projectTask: {
        titleKey: 'Hr_ProjectTask',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectTaskSearchBar,
        hideIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings.fieldsToShowOnTimesheet.find(
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
          !storeState.appConfig.mobileSettings.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'product',
          ),
        dependsOn: {
          projectTask: ({objectState}) => {
            return objectState.projectTask?.product;
          },
        },
        required: true,
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
            .isTimesheetProjectInvoicingEnabled,
      },
      date: {
        titleKey: 'Hr_Date',
        type: 'date',
        widget: 'date',
        readonlyIf: ({storeState}) =>
          !storeState.appConfig.mobileSettings.isEditionOfDateAllowed,
        required: true,
      },
      hoursDuration: {
        titleKey: 'Hr_Duration',
        type: 'number',
        widget: 'increment',
        required: true,
      },
      comments: {
        titleKey: 'Hr_Comments',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
          style: {width: '90%', alignSelf: 'center'},
        },
      },
      validationButton: {
        titleKey: 'Project_Validation',
        type: 'object',
        widget: 'custom',
        customComponent: ValidationTimesheetLineButton,
      },
    },
  },
};
