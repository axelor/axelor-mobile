import {FormConfigs} from '@axelor/aos-mobile-core';
import {
  ManufOrderSearchBar,
  OperationOrderSearchBar,
  ProductSearchBar,
  ProjectSearchBar,
  ProjectTaskSearchBar,
  Timesheet,
  updateManufOrder,
  updateProject,
} from '@axelor/aos-mobile-hr';

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
        hideIf: ({storeState}) =>
          storeState.user.user.employee?.timesheetImputationSelect !==
            Timesheet.imputation.Project ||
          !storeState.appConfig.mobileSettings.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'project',
          ),
      },
      projectTask: {
        titleKey: 'Hr_ProjectTask',
        type: 'object',
        widget: 'custom',
        customComponent: ProjectTaskSearchBar,
        hideIf: ({objectState, storeState}) =>
          objectState.project == null ||
          storeState.user.user.employee?.timesheetImputationSelect !==
            Timesheet.imputation.Project ||
          !storeState.appConfig.mobileSettings.fieldsToShowOnTimesheet.find(
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
          storeState.user.user.employee?.timesheetImputationSelect !==
            Timesheet.imputation.ManufOrder ||
          !storeState.appConfig.mobileSettings.fieldsToShowOnTimesheet.find(
            (field: string) => field === 'manufOrder',
          ),
      },
      operationOrder: {
        titleKey: 'Hr_OperationOrder',
        type: 'object',
        widget: 'custom',
        customComponent: OperationOrderSearchBar,
        hideIf: ({storeState}) =>
          storeState.user.user.employee?.timesheetImputationSelect !==
            Timesheet.imputation.ManufOrder ||
          !storeState.appConfig.mobileSettings.fieldsToShowOnTimesheet.find(
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
          style: {marginBottom: 100, width: '90%', alignSelf: 'center'},
        },
      },
    },
  },
};
