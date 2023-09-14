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

import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {Button, FormInput, PopUp, useThemeColor} from '@axelor/aos-mobile-ui';
import {Expense} from '../../../types';
import {sendExpense, validateExpense} from '../../../features/expenseSlice';

const ExpenseDetailsValidationButton = ({expense, mode}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

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
  const Colors = useThemeColor();

  if (expense.statusSelect === Expense.statusSelect.Draft) {
    return <Button title={I18n.t('Hr_Send')} onPress={sendExpenseAPI} />;
  }

  if (
    (user?.employee?.hrManager ||
      expense.employee?.managerUser?.id === user.id) &&
    expense.statusSelect === Expense.statusSelect.WaitingValidation
  ) {
    return (
      <>
        <Button title={I18n.t('Hr_Validate')} onPress={validateExpenseAPI} />
        <Button
          title={I18n.t('Hr_Refused')}
          onPress={() => {
            setRefusalPopupIsOpen(true);
          }}
          color={Colors.errorColor}
        />
        <PopUp visible={refusalPopupIsOpen}>
          <View>
            <FormInput
              title={I18n.t('Hr_ReasonRefusal')}
              multiline={true}
              adjustHeightWithLines={true}
              required={true}
              onChange={setRefusalMessage}
            />
            <Button
              title={'Ok'}
              onPress={() => {
                console.log(refusalMessage);
              }}
              color={
                refusalMessage == null || refusalMessage === ''
                  ? Colors.secondaryColor
                  : Colors.primaryColor
              }
              disabled={refusalMessage == null || refusalMessage === ''}
            />
          </View>
        </PopUp>
      </>
    );
  }

  return null;
};

export default ExpenseDetailsValidationButton;
