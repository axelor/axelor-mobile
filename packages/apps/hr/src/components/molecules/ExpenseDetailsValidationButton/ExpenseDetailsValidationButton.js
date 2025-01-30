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

import React, {useCallback, useState} from 'react';
import {View} from 'react-native';

import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {Expense} from '../../../types';
import {sendExpense, validateExpense} from '../../../features/expenseSlice';
import ExpenseRefusalPopup from '../ExpenseRefusalPopup/ExpenseRefusalPopup';
import {StyleSheet} from 'react-native';

const ExpenseDetailsValidationButton = ({expense, mode}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {user} = useSelector(state => state.user);

  const [refusalPopupIsOpen, setRefusalPopupIsOpen] = useState(false);
  const [refusalMessage, setRefusalMessage] = useState('');

  const sendExpenseAPI = useCallback(() => {
    dispatch(
      sendExpense({
        expenseId: expense.id,
        version: expense.version,
        onExpense: true,
      }),
    );
  }, [dispatch, expense]);

  const validateExpenseAPI = useCallback(() => {
    dispatch(
      validateExpense({
        expenseId: expense.id,
        version: expense.version,
        onExpense: true,
        mode: mode,
      }),
    );
  }, [dispatch, mode, expense]);

  if (expense.statusSelect === Expense.statusSelect.Draft) {
    return (
      <Button
        title={I18n.t('Hr_Send')}
        onPress={sendExpenseAPI}
        iconName="paper-plane"
      />
    );
  }

  if (
    (user?.employee?.hrManager ||
      expense.employee?.managerUser?.id === user.id) &&
    expense.statusSelect === Expense.statusSelect.WaitingValidation
  ) {
    return (
      <>
        <View style={styles.buttonContainer}>
          <Button
            title={I18n.t('Hr_Refuse')}
            onPress={() => {
              setRefusalPopupIsOpen(true);
            }}
            color={Colors.errorColor}
            width="45%"
            iconName="times"
          />
          <Button
            title={I18n.t('Hr_Validate')}
            onPress={validateExpenseAPI}
            width="45%"
            iconName="check"
          />
        </View>
        <ExpenseRefusalPopup
          expense={expense}
          mode={mode}
          refusalMessage={refusalMessage}
          refusalPopupIsOpen={refusalPopupIsOpen}
          setRefusalMessage={setRefusalMessage}
          onClose={() => {
            setRefusalMessage('');
            setRefusalPopupIsOpen(false);
          }}
        />
      </>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ExpenseDetailsValidationButton;
