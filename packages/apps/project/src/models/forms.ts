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

import {FormConfigs, UserSearchBar} from '@axelor/aos-mobile-core';
import {
  ProductSearchBar,
  ProjectSearchBar as HRProjectSearchBar,
  ProjectTaskSearchBar,
} from '@axelor/aos-mobile-hr';
import {
  LogTimeButton,
  CategorySearchBar,
  ParentTaskSearchBar,
  PrioritySearchBar,
  ProgressFormInput,
  ProjectSearchBar,
  SectionSearchBar,
  TagTaskMultieValuePicker,
  TargetVersionSearchBar,
} from '../components';
import {updateProject} from '../features/projectSlice';

export const project_formsRegister: FormConfigs = {
  project_TimesheetLine: {
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
    fields: {
      project: {
        titleKey: 'Hr_Project',
        type: 'object',
        widget: 'custom',
        customComponent: HRProjectSearchBar,
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
        customComponent: LogTimeButton,
      },
    },
  },
  project_task: {
    modelName: 'com.axelor.apps.project.db.ProjectTask',
    fields: {
      name: {
        titleKey: 'Project_Sujet',
        type: 'string',
        required: true,
      },
      ticketNumber: {
        titleKey: 'Project_TicketNumber',
        type: 'string',
        readonly: true,
      },
      project: {
        titleKey: 'Project_Project',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectSearchBar,
        required: true,
        options: {
          differentiateBusinessProjects: false,
        },
      },
      parentTask: {
        titleKey: 'Project_ParentTask',
        type: 'object',
        widget: 'custom',
        customComponent: ParentTaskSearchBar,
        dependsOn: {
          project: ({newValue, dispatch}) => {
            dispatch(updateProject(newValue));
          },
        },
      },
      assignedTo: {
        titleKey: 'Project_AssignedTo',
        type: 'object',
        widget: 'custom',
        customComponent: UserSearchBar,
      },
      projectTaskCategory: {
        titleKey: 'Project_Category',
        type: 'object',
        widget: 'custom',
        customComponent: CategorySearchBar,
      },
      projectTaskSection: {
        titleKey: 'Project_Section',
        type: 'object',
        widget: 'custom',
        customComponent: SectionSearchBar,
      },
      targetVersion: {
        titleKey: 'Project_TargetVersion',
        type: 'object',
        widget: 'custom',
        customComponent: TargetVersionSearchBar,
      },
      priority: {
        titleKey: 'Project_Priority',
        type: 'object',
        widget: 'custom',
        customComponent: PrioritySearchBar,
      },
      taskDate: {
        titleKey: 'Project_StartDate',
        type: 'date',
        widget: 'date',
      },
      taskEndDate: {
        titleKey: 'Project_DueDate',
        type: 'date',
        widget: 'date',
      },
      taskDeadline: {
        titleKey: 'Project_Deadline',
        type: 'date',
        widget: 'date',
      },
      projectTaskTagSet: {
        titleKey: 'Project_Tags',
        type: 'array',
        widget: 'custom',
        customComponent: TagTaskMultieValuePicker,
      },
      progress: {
        titleKey: 'Project_Progress',
        type: 'number',
        widget: 'custom',
        customComponent: ProgressFormInput,
      },
      description: {
        type: 'string',
        widget: 'HTML',
        titleKey: 'Base_Description',
      },
      internalDescription: {
        type: 'string',
        widget: 'HTML',
        titleKey: 'Project_InternalDescription',
      },
    },
  },
};
