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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useSelector,
  useTranslator,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchExpenseById} from '../features/expenseSlice';

const useExpenseDetailsAction = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {expense} = useSelector(state => state.expense);
  const {mobileSettings} = useSelector(state => state.config);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_expense_details', {
      model: 'com.axelor.apps.hr.db.Expense',
      modelId: expense?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      actions: [
        {
          key: 'refreshExpenseDetails',
          order: 10,
          iconName: 'refresh',
          title: I18n.t('Hr_RefreshExpenseDetails'),
          FontAwesome5: false,
          iconColor: Colors.primaryColor.background,
          onPress: () => {
            dispatch(fetchExpenseById({ExpenseId: expense?.id}));
          },
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, dispatch, expense, mobileSettings]);
};

export const useHrHeaders = () => {
  useExpenseDetailsAction();
};
