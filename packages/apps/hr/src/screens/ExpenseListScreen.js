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

import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  Screen,
  ScrollList,
  HeaderContainer,
  ToggleSwitch,
  getCommonStyles,
  useThemeColor,
  Picker,
  Text,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseCard} from '../components';
import {searchExpense} from '../features/expenseSlice';
import {Expense} from '../types';

const My_Expense_Mode = 'myExpenseMode';
const To_Validate_Mode = 'toValidateMode';

const ExpenseListScreen = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {loadingExpense, moreLoading, isListEnd, expenseList} = useSelector(
    state => state.expense,
  );

  const [mode, setMode] = useState(My_Expense_Mode);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const expenseStatusListItems = useMemo(() => {
    return Expense.getStatusList(Colors, I18n);
  }, [Colors, I18n]);

  const fetchExpenseAPI = useCallback(
    (page = 0) => {
      dispatch(searchExpense({page: page}));
    },
    [dispatch],
  );

  const numberToValidate = useMemo(() => {
    if (expenseList == null || expenseList === []) {
      return 0;
    }
    if (user?.employee?.hrManager) {
      const filterList = expenseList?.filter(
        item => item.statusSelect === Expense.statusSelect.WaitingValidation,
      );
      return filterList.length;
    } else {
      const filterList = expenseList?.filter(item => {
        return (
          user.employee?.managerUser?.id === user.id &&
          item.statusSelect === Expense.statusSelect.WaitingValidation
        );
      });
      return filterList.length;
    }
  }, [
    expenseList,
    user.employee?.hrManager,
    user.employee?.managerUser?.id,
    user.id,
  ]);

  const filterOnMode = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (mode === My_Expense_Mode) {
          return list?.filter(item => {
            return item['employee.user.id'] === user.id;
          });
        }
        if (mode === To_Validate_Mode) {
          if (user?.employee?.hrManager) {
            return list?.filter(
              item =>
                item.statusSelect === Expense.statusSelect.WaitingValidation,
            );
          } else {
            return list?.filter(item => {
              return (
                user.employee?.managerUser?.id === user.id &&
                item.statusSelect === Expense.statusSelect.WaitingValidation
              );
            });
          }
        }
      }
    },
    [mode, user.employee?.hrManager, user.employee?.managerUser?.id, user.id],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (selectedStatus != null) {
          return list?.filter(item => item?.statusSelect === selectedStatus);
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnMode(filterOnStatus(expenseList)),
    [filterOnMode, filterOnStatus, expenseList],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleSwitch
              styleContainer={[commonStyles.filter, commonStyles.filterSize]}
              styleToogle={styles.toggle}
              leftTitle={I18n.t('Hr_MyExpenses')}
              rightTitle={I18n.t('Hr_ToValidate')}
              rigthElement={
                <View style={styles.bubble}>
                  <Text>{numberToValidate}</Text>
                </View>
              }
              onSwitch={() =>
                setMode(_mode => {
                  setSelectedStatus(null);
                  return _mode === My_Expense_Mode
                    ? To_Validate_Mode
                    : My_Expense_Mode;
                })
              }
            />
            {mode === My_Expense_Mode && (
              <Picker
                listItems={expenseStatusListItems}
                title={I18n.t('Hr_Status')}
                onValueChange={statusList => setSelectedStatus(statusList)}
                labelField="title"
                valueField="key"
              />
            )}
          </View>
        }
      />
      <ScrollList
        loadingList={loadingExpense}
        data={filteredList}
        renderItem={({item}) => (
          <ExpenseCard
            style={styles.item}
            statusSelect={item.statusSelect}
            expenseSeq={item.expenseSeq}
            periodeCode={item['period.code']}
            inTaxTotal={item.inTaxTotal}
            employeeManagerId={item['employee.managerUser']?.id}
          />
        )}
        fetchData={fetchExpenseAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    item: {
      marginVertical: 4,
    },
    headerContainer: {
      alignItems: 'center',
    },
    toggleSwitchContainer: {
      width: '90%',
      height: 40,
    },
    toggle: {
      width: '54%',
      height: 38,
      borderRadius: 13,
    },
    bubble: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 2,
      borderColor: Colors.cautionColor.background_light,
      borderRadius: Dimensions.get('window').width * 0.07,
      width: Dimensions.get('window').width * 0.07,
      height: Dimensions.get('window').width * 0.07,
      position: 'absolute',
      right: '5%',
    },
  });

export default ExpenseListScreen;
