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
  cancelExpense,
  deleteExpense,
  returnToDraftStatusExpense,
  sendExpense,
  validateExpense,
} from '../../../features/expenseSlice';
import {ExpenseRefusalPopup} from '../../templates';

interface ExpenseDetailsValidationButtonProps {
  expense: any;
  mode: string;
  isManualCreation?: boolean;
}

const ExpenseDetailsValidationButton = ({
  expense,
  mode,
  isManualCreation = false,
}: ExpenseDetailsValidationButtonProps) => {
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
      (sendExpense as any)({
        expenseId: expense.id,
        version: expense.version,
        onExpense: true,
      }),
    );
  }, [dispatch, expense]);

  const validateExpenseAPI = useCallback(() => {
    dispatch(
      (validateExpense as any)({
        expenseId: expense.id,
        version: expense.version,
        onExpense: true,
        mode: mode,
      }),
    );
  }, [dispatch, mode, expense]);

  const deleteExpenseAPI = useCallback(() => {
    dispatch((deleteExpense as any)({expenseId: expense.id, userId: user.id}));
    navigation.pop();
  }, [dispatch, expense.id, navigation, user.id]);

  const cancelExpenseAPI = useCallback(() => {
    dispatch(
      (cancelExpense as any)({
        expenseId: expense.id,
        version: expense.version,
        mode,
        user,
      }),
    );
  }, [dispatch, expense, mode, user]);

  const returnToDraftStatusExpenseAPI = useCallback(() => {
    dispatch(
      (returnToDraftStatusExpense as any)({
        expenseId: expense.id,
        version: expense.version,
        user,
      }),
    );
  }, [dispatch, expense, user]);

  const renderCancelButton = width => {
    return (
      <Button
        title={I18n.t('Base_Cancel')}
        onPress={cancelExpenseAPI}
        width={width}
        color={Colors.errorColor}
        iconName="x-lg"
      />
    );
  };

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
        {(!canDelete || !isManualCreation) && renderCancelButton('45%')}
        <Button
          title={I18n.t('Hr_Send')}
          onPress={sendExpenseAPI}
          width={canDelete && !isManualCreation ? '94%' : '45%'}
          iconName="send-fill"
        />
      </View>
    );
  }

  if (expense.statusSelect === Expense?.statusSelect.WaitingValidation) {
    return (
      <View style={styles.buttonContainer}>
        {(user?.employee?.hrManager ||
          expense.employee?.managerUser?.id === user.id) && (
          <>
            <Button
              title={I18n.t('Hr_Refuse')}
              onPress={() => setRefusalPopupIsOpen(true)}
              color={Colors.errorColor}
              width="45%"
              iconName="ban"
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
          </>
        )}
        {renderCancelButton('94%')}
      </View>
    );
  }

  if (expense.statusSelect === Expense?.statusSelect.Validate) {
    return (
      <View style={styles.buttonContainer}>{renderCancelButton('94%')}</View>
    );
  }

  if (
    expense.statusSelect === Expense?.statusSelect.Refused ||
    expense.statusSelect === Expense?.statusSelect.Canceled
  ) {
    return (
      <View style={styles.buttonContainer}>
        <Button
          title={I18n.t('Hr_ReturnToDraftStatus')}
          onPress={returnToDraftStatusExpenseAPI}
          width="94%"
          color={Colors.primaryColor}
          iconName="reply-fill"
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ExpenseDetailsValidationButton;
