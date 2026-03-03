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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const hr_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.hr.db.Expense',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Hr_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'WaitingValidation',
            value: 2,
            title: 'Hr_Status_WaitingValidation',
            color: 'cautionColor',
          },
          {
            key: 'Validate',
            value: 3,
            title: 'Hr_Status_Validate',
            color: 'successColor',
          },
          {
            key: 'Reimbursed',
            value: 4,
            title: 'Hr_Status_Reimbursed',
            color: 'priorityColor',
          },
          {
            key: 'Refused',
            value: 5,
            title: 'Hr_Status_Refused',
            color: 'importantColor',
          },
          {
            key: 'Canceled',
            value: 6,
            title: 'Hr_Status_Canceled',
            color: 'plannedColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.hr.db.ExpenseLine',
    fields: {
      kilometricTypeSelect: {
        content: [
          {
            key: 'OneWay',
            value: 1,
            title: 'Hr_KilomectricTypeSelect_OneWay',
          },
          {
            key: 'RoundTrip',
            value: 2,
            title: 'Hr_KilomectricTypeSelect_RoundTrip',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.hr.db.TSTimer',
    specificKey: 'Timer',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: null,
            color: 'secondaryColor',
          },
          {
            key: 'Start',
            value: 2,
            title: null,
            color: 'progressColor',
          },
          {
            key: 'Pause',
            value: 3,
            title: null,
            color: 'cautionColor',
          },
          {
            key: 'Stop',
            value: 4,
            title: null,
            color: 'successColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.hr.db.Timesheet',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Hr_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'WaitingValidation',
            value: 2,
            title: 'Hr_Status_WaitingValidation',
            color: 'cautionColor',
          },
          {
            key: 'Validate',
            value: 3,
            title: 'Hr_Status_Validate',
            color: 'successColor',
          },
          {
            key: 'Refused',
            value: 4,
            title: 'Hr_Status_Refused',
            color: 'importantColor',
          },
          {
            key: 'Canceled',
            value: 5,
            title: 'Hr_Status_Canceled',
            color: 'plannedColor',
          },
        ],
      },
      timeLoggingPreferenceSelect: {
        content: [
          {
            key: 'Days',
            value: 'days',
            title: 'Hr_TimeLoggingPreference_Days',
          },
          {
            key: 'Hours',
            value: 'hours',
            title: 'Hr_TimeLoggingPreference_Hours',
          },
          {
            key: 'Minutes',
            value: 'minutes',
            title: 'Hr_TimeLoggingPreference_Minutes',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.hr.db.Employee',
    fields: {
      timesheetImputationSelect: {
        content: [
          {
            key: 'Project',
            value: 1,
            title: null,
          },
          {
            key: 'ManufOrder',
            value: 2,
            title: null,
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Draft',
            value: 1,
            title: 'Hr_Status_Draft',
            color: 'secondaryColor',
          },
          {
            key: 'WaitingValidation',
            value: 2,
            title: 'Hr_Status_WaitingValidation',
            color: 'cautionColor',
          },
          {
            key: 'Validate',
            value: 3,
            title: 'Hr_Status_Validate',
            color: 'successColor',
          },
          {
            key: 'Refused',
            value: 4,
            title: 'Hr_Status_Refused',
            color: 'importantColor',
          },
          {
            key: 'Canceled',
            value: 5,
            title: 'Hr_Status_Canceled',
            color: 'plannedColor',
          },
        ],
      },
      startOnSelect: {
        content: [
          {
            key: 'Morning',
            value: 1,
            title: 'Hr_StartOn_Morning',
          },
          {
            key: 'Afternoon',
            value: 2,
            title: 'Hr_StartOn_Afternoon',
          },
        ],
      },
      endOnSelect: {
        content: [
          {
            key: 'Morning',
            value: 1,
            title: 'Hr_EndOn_Morning',
          },
          {
            key: 'Afternoon',
            value: 2,
            title: 'Hr_EndOn_Afternoon',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.hr.db.LeaveReason',
    fields: {
      unitSelect: {
        content: [
          {
            key: 'Days',
            value: 1,
            title: 'Hr_TimeUnit_Days',
          },
          {
            key: 'Hours',
            value: 2,
            title: 'Hr_TimeUnit_Hours',
          },
        ],
      },
      leaveReasonTypeSelect: {
        content: [
          {
            key: 'LeaveManagedEveryMonth',
            value: 1,
            title: null,
          },
          {
            key: 'ExceptionalLeave',
            value: 2,
            title: null,
          },
          {
            key: 'LeaveManagedEveryYear',
            value: 3,
            title: null,
          },
        ],
      },
    },
  },
];
