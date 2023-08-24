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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Screen,
  ScrollList,
  HeaderContainer,
  ToggleSwitch,
  getCommonStyles,
  useThemeColor,
  Picker,
  NumberBubble,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseCard} from '../components';
import {
  searchExpenseToValidate,
  searchMyExpense,
} from '../features/expenseSlice';
import {Expense} from '../types';

const My_Expense_Mode = 'myExpenseMode';
const To_Validate_Mode = 'toValidateMode';

const ExpenseListScreen = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    MyexpenseList,
    loadingMyExpense,
    moreLoadingMyExpense,
    isListEndMyExpense,
    loadingExpenseToValidate,
    moreLoadingExpenseToValidate,
    isListEndExpenseToValidate,
    expenseToValidateList,
    totalNumberExpenseToValidate,
  } = useSelector(state => state.expense);

  const [mode, setMode] = useState(My_Expense_Mode);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const expenseStatusListItems = useMemo(() => {
    return Expense.getStatusList(Colors, I18n);
  }, [Colors, I18n]);

  useEffect(() => {
    dispatch(searchExpenseToValidate({page: 0, user: user}));
  }, [dispatch, user]);

  const fetchMyExpenseAPI = useCallback(
    (page = 0) => {
      dispatch(searchMyExpense({page: page, userId: user.id}));
    },
    [dispatch, user.id],
  );
  const fetchExpenseToValidateAPI = useCallback(
    (page = 0) => {
      dispatch(searchExpenseToValidate({page: page, user: user}));
    },
    [dispatch, user],
  );

  const ObjectToDisplay = useMemo(() => {
    if (mode === My_Expense_Mode) {
      return {
        list: MyexpenseList,
        loading: loadingMyExpense,
        moreLoading: moreLoadingMyExpense,
        isListEnd: isListEndMyExpense,
        functionApi: fetchMyExpenseAPI,
      };
    } else {
      return {
        list: expenseToValidateList,
        functionApi: fetchExpenseToValidateAPI,
        loading: loadingExpenseToValidate,
        moreLoading: moreLoadingExpenseToValidate,
        isListEnd: isListEndExpenseToValidate,
      };
    }
  }, [
    MyexpenseList,
    expenseToValidateList,
    fetchExpenseToValidateAPI,
    fetchMyExpenseAPI,
    isListEndExpenseToValidate,
    isListEndMyExpense,
    loadingExpenseToValidate,
    loadingMyExpense,
    mode,
    moreLoadingExpenseToValidate,
    moreLoadingMyExpense,
  ]);

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
    () => filterOnStatus(ObjectToDisplay.list),
    [ObjectToDisplay.list, filterOnStatus],
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
                <NumberBubble
                  number={totalNumberExpenseToValidate}
                  backgroundColor={Colors.secondaryColor_dark.foreground}
                  borderColor={Colors.cautionColor.background_light}
                />
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
        loadingList={ObjectToDisplay.loading}
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
        fetchData={ObjectToDisplay.functionApi}
        moreLoading={ObjectToDisplay.moreLoading}
        isListEnd={ObjectToDisplay.isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
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
});

export default ExpenseListScreen;
