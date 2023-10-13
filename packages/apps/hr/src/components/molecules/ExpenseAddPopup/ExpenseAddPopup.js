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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Alert, useThemeColor, LabelText, Picker} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  useDispatch,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {
  createExpense,
  searchExpenseDraft,
  updateExpense,
} from '../../../features/expenseSlice';

const ExpenseAddPopup = ({style, visible, onClose, selectedItems}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {expenseDraftList} = useSelector(state => state.expense);
  const {user} = useSelector(state => state.user);

  const [expenseSelected, setExpenseSelected] = useState(null);

  useEffect(() => {
    dispatch(searchExpenseDraft({userId: user?.id}));
  }, [dispatch, user?.id]);

  const createExpenseAPI = useCallback(() => {
    const _expense = {
      expenseLineIdList: selectedItems,
      employeeId: user?.employee?.id,
      companyId: user?.activeCompany?.id,
      currencyId: user?.activeCompany?.currency?.id,
    };
    dispatch(createExpense({expense: _expense, userId: user.id}));
    onClose();
    navigation.navigate('ExpenseListScreen');
  }, [dispatch, onClose, navigation, selectedItems, user]);

  const updateExpenseAPI = useCallback(() => {
    dispatch(
      updateExpense({
        expenseId: expenseSelected.id,
        version: expenseSelected.version,
        userId: user.id,
        expenseLineIdList: selectedItems,
      }),
    );
    navigation.navigate('ExpenseListScreen');
    onClose();
  }, [dispatch, onClose, expenseSelected, navigation, selectedItems, user.id]);

  return (
    <Alert
      style={style}
      visible={visible}
      cancelButtonConfig={{onPress: onClose}}
      confirmButtonConfig={{
        title: I18n.t('Base_Add'),
        onPress: updateExpenseAPI,
        disabled: expenseSelected == null,
      }}
      translator={I18n.t}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            pickerStyle={styles.picker}
            listItems={expenseDraftList}
            onValueChange={setExpenseSelected}
            labelField="expenseSeq"
            valueField="id"
            title={I18n.t('Hr_Expense')}
            isValueItem={true}
          />
        </View>
        <View style={styles.labelText}>
          <TouchableOpacity onPress={createExpenseAPI}>
            <LabelText
              iconName="plus"
              color={Colors.primaryColor.background}
              title={I18n.t('Hr_NewExpense')}
              size={16}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  pickerContainer: {
    marginHorizontal: -18,
  },
  picker: {
    width: '90%',
  },
  labelText: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
});

export default ExpenseAddPopup;
