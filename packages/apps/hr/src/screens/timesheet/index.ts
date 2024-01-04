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

import TimerListScreen from './TimerListScreen';
import TimesheetListScreen from './TimesheetListScreen';
import TimesheetLineFormScreen from './TimesheetLineFormScreen';
import TimesheetDetailsScreen from './TimesheetDetailsScreen';
import ActiveTimerFormScreen from './ActiveTimerFormScreen';

export default {
  TimerListScreen: {
    title: 'Hr_Timers',
    component: TimerListScreen,
    actionID: 'hr_timers_list',
  },
  TimesheetListScreen: {
    title: 'Hr_Timesheets',
    component: TimesheetListScreen,
  },
  TimesheetLineFormScreen: {
    title: 'Hr_TimesheetLine',
    component: TimesheetLineFormScreen,
  },
  TimesheetDetailsScreen: {
    title: 'Hr_Timesheets',
    component: TimesheetDetailsScreen,
  },
  ActiveTimerFormScreen: {
    title: 'Hr_ActiveTimer',
    component: ActiveTimerFormScreen,
    actionID: 'hr_active_timer',
  },
  NewTimerFormScreen: {
    title: 'Hr_NewTimer',
    component: ActiveTimerFormScreen,
  },
};

export {TimerListScreen};
export {TimesheetListScreen};
export {TimesheetLineFormScreen};
export {TimesheetDetailsScreen};
export {ActiveTimerFormScreen};
