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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  useSelector,
  useTranslator,
  useDispatch,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchExpenseById, quickCreateExpense} from '../features/expenseSlice';
import {Expense} from '../types';

export const useHrHeaders = () => {
  useExpenseAction();
  useExpenseDetailsAction();
  useTimerListAction();
  useActiveTimerAction();
  useTimesheetDetailsAction();
  useLeaveDetailsAction();
};

const useExpenseAction = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.Expense',
  });

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {userId} = useSelector(state => state.auth);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_expenses_list', {
      actions: [
        {
          key: 'newExpense',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Hr_CreateExpense'),
          iconColor: Colors.primaryColor.background,
          hideIf:
            !mobileSettings?.isManualCreationOfExpenseAllowed || !canCreate,
          onPress: () =>
            dispatch(quickCreateExpense({userId})).then(
              res =>
                mobileSettings?.isLineCreationOfExpenseDetailsAllowed &&
                navigation.navigate('ExpenseDetailsScreen', {
                  idExpense: res.payload.expenseId,
                  expenseMode: Expense.mode.personnal,
                  isManualCreation: true,
                }),
            ),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, dispatch, I18n, mobileSettings, navigation, userId, canCreate]);
};

const useExpenseDetailsAction = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {expense} = useSelector(state => state.expense);
  const {mobileSettings} = useSelector(state => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_expense_details', {
      model: 'com.axelor.apps.hr.db.Expense',
      modelId: expense?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      actions: [
        {
          key: 'refreshExpenseDetails',
          order: 10,
          iconName: 'arrow-repeat',
          title: I18n.t('Hr_RefreshExpenseDetails'),
          iconColor: Colors.primaryColor.background,
          onPress: () => {
            dispatch(fetchExpenseById({ExpenseId: expense?.id}));
          },
          showInHeader: true,
        },
      ],
    });
  }, [Colors, dispatch, expense, I18n, mobileSettings]);
};

const useTimerListAction = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TSTimer',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('hr_timers_list', {
      actions: [
        {
          key: 'newTimer',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Hr_CreateTimer'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () =>
            navigation.navigate('TimerFormScreen', {isCreation: true}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useActiveTimerAction = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TSTimer',
  });

  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_active_timer', {
      actions: [
        {
          key: 'newTimer',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Hr_CreateTimer'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate || !timesheetConfig?.isMultipleTimerEnabled,
          onPress: () =>
            navigation.navigate('TimerFormScreen', {isCreation: true}),
          showInHeader: true,
        },
      ],
    });
  }, [
    Colors,
    canCreate,
    I18n,
    navigation,
    timesheetConfig?.isMultipleTimerEnabled,
  ]);
};

const useTimesheetDetailsAction = () => {
  const {timesheet} = useSelector(state => state.timesheet);
  const {mobileSettings} = useSelector(state => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_timesheet_details', {
      model: 'com.axelor.apps.hr.db.Timesheet',
      modelId: timesheet?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [timesheet, mobileSettings]);
};

const useLeaveDetailsAction = () => {
  const {leave} = useSelector(state => state.hr_leave);
  const {mobileSettings} = useSelector(state => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_leave_details', {
      model: 'com.axelor.apps.hr.db.LeaveRequest',
      modelId: leave?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [leave, mobileSettings]);
};
