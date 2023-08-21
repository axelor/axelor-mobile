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

import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  useThemeColor,
  PopUp,
  Button,
  LabelText,
  Picker,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {searchExpenseDraft} from '../../../features/expenseSlice';

const ExpenseAddPopup = ({style, visible, onClose}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {expenseDraftList} = useSelector(state => state.expense);

  const [expenseSelected, setExpenseSelected] = useState(null);

  useEffect(() => {
    dispatch(searchExpenseDraft());
  }, [dispatch]);

  return (
    <PopUp style={[style, styles.popup]} visible={visible}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            pickerStyle={styles.picker}
            listItems={expenseDraftList}
            onValueChange={setExpenseSelected}
            labelField="fullName"
            valueField="id"
            title={I18n.t('Hr_Expense')}
          />
        </View>
        <View style={styles.labelText}>
          <TouchableOpacity onPress={() => console.log('addExpense')}>
            <LabelText
              iconName="plus"
              color={Colors.primaryColor.background}
              title={I18n.t('Hr_NewExpense')}
              size={16}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={I18n.t('Base_Cancel')}
            color={Colors.secondaryColor}
            style={styles.button}
            onPress={onClose}
          />
          <Button
            title={I18n.t('Base_Add')}
            style={styles.button}
            onPress={() => console.log(expenseSelected)}
          />
        </View>
      </View>
    </PopUp>
  );
};

const styles = StyleSheet.create({
  popup: {
    alignItems: 'flex-start',
  },
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  pickerContainer: {
    marginHorizontal: -18,
  },
  picker: {
    width: '110%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '140%',
    justifyContent: 'space-evenly',
    marginLeft: -10,
    marginTop: 4,
  },
  labelText: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  button: {
    width: '50%',
    marginHorizontal: 12,
  },
});

export default ExpenseAddPopup;
