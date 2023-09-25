/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {useCallback, useEffect} from 'react';
import {
  headerActionsProvider,
  useSelector,
  useNavigation,
  useTranslator,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchExpenseById} from '../features/expenseSlice';

const useExpenseDetailsAction = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {expense} = useSelector(state => state.expense);

  const fetchExpenseLineAPI = useCallback(() => {
    dispatch(fetchExpenseById({ExpenseId: expense.id}));
  }, [dispatch, expense.id]);

  useEffect(() => {
    headerActionsProvider.registerModel('hr_expense_details', {
      actions: [
        {
          key: 'refreshExpenseDetails',
          order: 10,
          iconName: 'refresh',
          title: I18n.t('Hr_RefreshExpenseDetails'),
          FontAwesome5: false,
          iconColor: Colors.primaryColor.background,
          onPress: () => fetchExpenseLineAPI(),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, fetchExpenseLineAPI, navigation]);
};

export const useHrHeaders = () => {
  useExpenseDetailsAction();
};
