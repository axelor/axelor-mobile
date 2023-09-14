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

import React, {useCallback} from 'react';
import {Button} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {Expense} from '../../../types';
import {sendExpense, validateExpense} from '../../../features/expenseSlice';

const ExpenseDetailsValidationButton = ({
  expense,
  onValidate = () => {},
  onSend = () => {},
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  const sendExpenseAPI = useCallback(
    (expenseId, version) => {
      dispatch(
        sendExpense({
          expenseId: expenseId,
          version: version,
          userId: user?.id,
          onExpense: true,
        }),
      );
    },
    [dispatch, user],
  );

  const validateExpenseAPI = useCallback(
    (expenseId, version) => {
      dispatch(
        validateExpense({
          expenseId: expenseId,
          version: version,
          userId: user?.id,
          onExpense: true,
        }),
      );
    },
    [dispatch, user],
  );

  if (expense.statusSelect === Expense.statusSelect.Draft) {
    return (
      <Button
        title={I18n.t('Hr_Send')}
        onPress={() => {
          sendExpenseAPI(expense.id, expense.version);
        }}
      />
    );
  }

  if (
    (user?.employee?.hrManager ||
      expense.employee?.managerUser?.id === user.id) &&
    expense.statusSelect === Expense.statusSelect.WaitingValidation
  ) {
    return (
      <Button
        title={I18n.t('Hr_Validate')}
        onPress={() => {
          validateExpenseAPI(expense.id, expense.version);
        }}
      />
    );
  }

  return null;
};

export default ExpenseDetailsValidationButton;
