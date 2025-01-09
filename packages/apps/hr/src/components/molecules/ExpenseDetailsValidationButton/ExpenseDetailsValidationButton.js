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
import {View, StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  deleteExpense,
  sendExpense,
  validateExpense,
} from '../../../features/expenseSlice';
import {ExpenseRefusalPopup} from '../../templates';

const ExpenseDetailsValidationButton = ({expense, mode, isManualCreation}) => {
  const navigation = useNavigation();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.Expense',
  });
  const {Expense} = useTypes();

  const {user} = useSelector(state => state.user);

  const [refusalPopupIsOpen, setRefusalPopupIsOpen] = useState(false);

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

  const deleteExpenseAPI = useCallback(() => {
    dispatch(deleteExpense({expenseId: expense.id, userId: user.id}));
    navigation.pop();
  }, [dispatch, expense.id, navigation, user.id]);

  if (readonly) {
    return null;
  }

  if (expense.statusSelect === Expense?.statusSelect.Draft) {
    return (
      <View style={styles.buttonContainer}>
        {canDelete && (
          <Button
            title={I18n.t(isManualCreation ? 'Base_Cancel' : 'Hr_Delete')}
            onPress={deleteExpenseAPI}
            width="45%"
            color={Colors.errorColor}
            iconName={isManualCreation ? 'x-lg' : 'trash3-fill'}
          />
        )}
        <Button
          title={I18n.t('Hr_Send')}
          onPress={sendExpenseAPI}
          width="45%"
          iconName="send-fill"
        />
      </View>
    );
  }

  if (
    (user?.employee?.hrManager ||
      expense.employee?.managerUser?.id === user.id) &&
    expense.statusSelect === Expense?.statusSelect.WaitingValidation
  ) {
    return (
      <View style={styles.buttonContainer}>
        <Button
          title={I18n.t('Hr_Refuse')}
          onPress={() => setRefusalPopupIsOpen(true)}
          color={Colors.errorColor}
          width="45%"
          iconName="x-lg"
        />
        <ExpenseRefusalPopup
          isOpen={refusalPopupIsOpen}
          expense={expense}
          expenseMode={mode}
          onCancel={() => setRefusalPopupIsOpen(false)}
        />
        <Button
          title={I18n.t('Hr_Validate')}
          onPress={validateExpenseAPI}
          width="45%"
          iconName="check-lg"
        />
      </View>
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
