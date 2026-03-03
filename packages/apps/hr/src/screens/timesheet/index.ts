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

import TimerListScreen from './TimerListScreen';
import TimesheetListScreen from './TimesheetListScreen';
import TimesheetLineFormScreen from './TimesheetLineFormScreen';
import TimesheetDetailsScreen from './TimesheetDetailsScreen';
import TimerFormScreen from './TimerFormScreen';

export default {
  TimerListScreen: {
    title: 'Hr_Timers',
    component: TimerListScreen,
    actionID: 'hr_timers_list',
    isUsableOnShortcut: true,
  },
  TimesheetListScreen: {
    title: 'Hr_Timesheets',
    component: TimesheetListScreen,
    options: {
      shadedHeader: false,
    },
    actionID: 'hr_timesheets_list',
    isUsableOnShortcut: true,
  },
  TimesheetLineFormScreen: {
    title: 'Hr_TimesheetLine',
    component: TimesheetLineFormScreen,
    actionID: 'hr_timesheetLine_details',
  },
  TimesheetDetailsScreen: {
    title: 'Hr_Timesheets',
    component: TimesheetDetailsScreen,
    actionID: 'hr_timesheet_details',
    options: {
      shadedHeader: false,
    },
  },
  ActiveTimerFormScreen: {
    title: 'Hr_ActiveTimer',
    component: TimerFormScreen,
    actionID: 'hr_active_timer',
    isUsableOnShortcut: true,
  },
  TimerFormScreen: {
    title: 'Hr_Timer',
    component: TimerFormScreen,
    actionID: 'hr_timer_details',
    isUsableOnShortcut: true,
  },
};

export {TimerListScreen};
export {TimesheetListScreen};
export {TimesheetLineFormScreen};
export {TimesheetDetailsScreen};
export {TimerFormScreen};
