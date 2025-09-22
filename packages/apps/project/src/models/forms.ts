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

import {
  FormConfigs,
  isEmpty,
  UserSearchBar,
  getTypes,
} from '@axelor/aos-mobile-core';
import {HrModule} from '@axelor/aos-mobile-hr';
import {
  ActiveSprintSearchBar,
  CategorySearchBar,
  LogTimeButton,
  ParentTaskSearchBar,
  PrioritySearchBar,
  ProjectSearchBar,
  TargetVersionSearchBar,
  TaskStatusSearchBar,
  TaskTagMultiValuePicker,
} from '../components';
import {updateProject} from '../features/projectSlice';
import {
  udpateFormCategory,
  updateTargetVersion,
} from '../features/projectTaskSlice';

const hr_TimesheetLineForm = HrModule.models.formsRegister.hr_TimesheetLine;

export const project_formsRegister: FormConfigs = {
  project_TimesheetLine: {
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
    fields: {
      project: {
        ...hr_TimesheetLineForm.fields.project,
        readonly: true,
      },
      projectTask: {
        ...hr_TimesheetLineForm.fields.projectTask,
        readonlyIf: ({objectState}) => objectState?.isTaskLog ?? false,
      },
      product: hr_TimesheetLineForm.fields.product,
      toInvoice: hr_TimesheetLineForm.fields.toInvoice,
      date: hr_TimesheetLineForm.fields.date,
      hoursDuration: hr_TimesheetLineForm.fields.hoursDuration,
      comments: {
        ...hr_TimesheetLineForm.fields.comments,
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
    panels: {
      contextContainer: {
        direction: 'row',
        colSpan: 12,
        order: 2,
      },
      projectContainer: {
        direction: 'row',
        colSpan: 6,
        parent: 'contextContainer',
      },
      parentContainer: {
        direction: 'row',
        colSpan: 6,
        parent: 'contextContainer',
      },
    },
    fields: {
      name: {
        titleKey: 'Project_Subject',
        type: 'string',
        required: true,
        order: 0,
      },
      ticketNumber: {
        titleKey: 'Project_TicketNumber',
        type: 'string',
        readonly: true,
        order: 1,
        hideIf: ({storeState}) =>
          !storeState.appConfig.project?.isEnablePerProjectTaskSequence,
      },
      project: {
        titleKey: 'Project_Project',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectSearchBar,
        readonlyIf: ({objectState}) => objectState?.projectReadonly,
        required: true,
        parentPanel: 'projectContainer',
      },
      parentTask: {
        titleKey: 'Project_ParentTask',
        type: 'object',
        widget: 'custom',
        customComponent: ParentTaskSearchBar,
        readonlyIf: ({storeState}) =>
          isEmpty(storeState.project_project.projectForm),
        dependsOn: {
          project: ({newValue, dispatch}) => {
            dispatch(updateProject(newValue));
            return null;
          },
        },
        parentPanel: 'parentContainer',
      },
      projectTaskCategory: {
        titleKey: 'Project_Category',
        type: 'object',
        widget: 'custom',
        customComponent: CategorySearchBar,
        hideIf: ({storeState}) =>
          !storeState.project_project.projectForm?.isShowTaskCategory,
        requiredIf: ({storeState}) =>
          storeState.project_project.projectForm?.taskStatusManagementSelect ===
          getTypes().Project.taskStatusManagementSelect?.ManageByCategory,
        dependsOn: {
          project: () => {
            return null;
          },
        },
      },
      status: {
        titleKey: 'Project_Status',
        type: 'object',
        widget: 'custom',
        customComponent: TaskStatusSearchBar,
        hideIf: ({storeState}) => {
          return (
            storeState.project_project.projectForm
              ?.taskStatusManagementSelect ===
            getTypes().Project.taskStatusManagementSelect?.NoStatusManagement
          );
        },
        requiredIf: ({storeState}) =>
          storeState.project_project.projectForm?.taskStatusManagementSelect !==
          getTypes().Project.taskStatusManagementSelect?.NoStatusManagement,
        dependsOn: {
          project: () => {
            return null;
          },
          projectTaskCategory: ({newValue, storeState, dispatch}) => {
            if (
              storeState.project_project.projectForm
                ?.taskStatusManagementSelect ===
              getTypes().Project.taskStatusManagementSelect?.ManageByCategory
            ) {
              dispatch(udpateFormCategory(newValue));
              return null;
            }
          },
        },
      },
      priority: {
        titleKey: 'Project_Priority',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: PrioritySearchBar,
        hideIf: ({storeState}) =>
          !storeState.project_project.projectForm?.isShowPriority,
        dependsOn: {
          project: () => {
            return null;
          },
        },
      },
      assignedTo: {
        titleKey: 'Project_AssignedTo',
        type: 'object',
        widget: 'custom',
        customComponent: UserSearchBar,
        required: true,
      },
      targetVersion: {
        titleKey: 'Project_TargetVersion',
        type: 'object',
        widget: 'custom',
        customComponent: TargetVersionSearchBar,
        dependsOn: {
          project: () => {
            return null;
          },
        },
      },
      activeSprint: {
        titleKey: 'Project_ActiveSprint',
        type: 'object',
        widget: 'custom',
        customComponent: ActiveSprintSearchBar,
        dependsOn: {
          targetVersion: ({dispatch, newValue, objectState, storeState}) => {
            dispatch(updateTargetVersion(newValue));
            if (
              storeState.project_project.projectForm?.sprintManagementSelect ===
              getTypes().Project?.sprintManagementSelect.Version
            ) {
              return storeState.project_project.projectForm?.backlogSprint;
            } else {
              return objectState?.activeSprint;
            }
          },
        },
        hideIf: ({objectState, storeState}) =>
          storeState.project_project.projectForm?.sprintManagementSelect ===
            getTypes().Project?.sprintManagementSelect.None ||
          (storeState.project_project.projectForm?.sprintManagementSelect ===
            getTypes().Project?.sprintManagementSelect.Version &&
            objectState?.targetVersion == null),
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
      tagSet: {
        titleKey: 'Project_Tags',
        type: 'array',
        widget: 'custom',
        customComponent: TaskTagMultiValuePicker,
      },
      progress: {
        titleKey: 'Project_Progress',
        type: 'number',
        widget: 'increment',
        dependsOn: {
          status: ({newValue, storeState}) => {
            if (storeState.appConfig.project?.selectAutoProgressOnProjectTask) {
              return parseInt(newValue?.defaultProgress, 10);
            }
          },
        },
        hideIf: ({storeState}) =>
          !storeState.project_project.projectForm?.isShowProgress,
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
