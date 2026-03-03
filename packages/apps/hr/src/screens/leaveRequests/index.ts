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

import LeaveDetailsScreen from './LeaveDetailsScreen';
import LeaveFormScreen from './LeaveFormScreen';
import LeaveListScreen from './LeaveListScreen';
import CompleteRequestScreen from './CompleteRequestScreen';

export default {
  LeaveListScreen: {
    title: 'Hr_Leaves',
    actionID: 'hr_leave_list',
    component: LeaveListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  LeaveDetailsScreen: {
    title: 'Hr_LeaveRequest',
    component: LeaveDetailsScreen,
    actionID: 'hr_leave_details',
    options: {
      shadedHeader: false,
    },
  },
  CompleteRequestScreen: {
    title: 'Hr_CompleteRequest',
    component: CompleteRequestScreen,
    isUsableOnShortcut: true,
  },
  LeaveFormScreen: {
    title: 'Hr_LeaveRequest',
    component: LeaveFormScreen,
  },
};

export {LeaveDetailsScreen};
export {LeaveFormScreen};
export {LeaveListScreen};
export {CompleteRequestScreen};
