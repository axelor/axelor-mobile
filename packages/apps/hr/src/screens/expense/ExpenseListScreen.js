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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Screen,
  ScrollList,
  ToggleSwitch,
  useThemeColor,
  Picker,
  NumberBubble,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
  useActiveFilter,
  FilterContainer,
} from '@axelor/aos-mobile-core';
import {ExpenseCard, ExpenseWaitingValidationSearchBar} from '../../components';
import {
  searchExpenseToValidate,
  searchMyExpense,
  sendExpense,
  validateExpense,
} from '../../features/expenseSlice';
import {searchManagedEmployee} from '../../features/employeeSlice';
import {Expense as ExpenseType} from '../../types';

const ExpenseListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {Expense} = useTypes();
  const {getSelectionItems} = useTypeHelpers();
  const {activeFilter} = useActiveFilter();

  const {user} = useSelector(state => state.user);
  const {
    myExpenseList,
    loadingMyExpense,
    moreLoadingMyExpense,
    isListEndMyExpense,
    loadingExpenseToValidate,
    moreLoadingExpenseToValidate,
    isListEndExpenseToValidate,
    expenseToValidateList,
    totalNumberExpenseToValidate,
  } = useSelector(state => state.expense);
  const {managedEmployeeTotal} = useSelector(state => state.employee);

  const [mode, setMode] = useState(ExpenseType.mode.personnal);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const expenseStatusListItems = useMemo(
    () => getSelectionItems(Expense?.statusSelect),
    [Expense?.statusSelect, getSelectionItems],
  );

  useEffect(() => {
    dispatch(searchManagedEmployee({userId: user.id}));
    dispatch(searchExpenseToValidate({page: 0, user: user}));
  }, [dispatch, user]);

  const fetchMyExpenseAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchMyExpense({
          page: page,
          userId: user.id,
          companyId: user.activeCompany?.id,
          filterDomain: activeFilter,
        }),
      );
    },
    [activeFilter, dispatch, user.activeCompany?.id, user.id],
  );

  const fetchExpenseToValidateAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchExpenseToValidate({
          page: page,
          user: user,
          companyId: user.activeCompany?.id,
          filterDomain: activeFilter,
        }),
      );
    },
    [activeFilter, dispatch, user],
  );

  const sendExpenseAPI = useCallback(
    (expenseId, version) => {
      dispatch(
        sendExpense({expenseId: expenseId, version: version, userId: user?.id}),
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
          user: user,
          mode: mode,
        }),
      );
    },
    [dispatch, user, mode],
  );

  const ObjectToDisplay = useMemo(() => {
    if (mode === ExpenseType.mode.personnal) {
      return {
        list: myExpenseList,
        loading: loadingMyExpense,
        moreLoading: moreLoadingMyExpense,
        isListEnd: isListEndMyExpense,
        functionApi: fetchMyExpenseAPI,
      };
    } else {
      return {
        list: expenseToValidateList,
        loading: loadingExpenseToValidate,
        moreLoading: moreLoadingExpenseToValidate,
        isListEnd: isListEndExpenseToValidate,
        functionApi: fetchExpenseToValidateAPI,
      };
    }
  }, [
    myExpenseList,
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
      if (!Array.isArray(list) || list.length === 0) {
        return [];
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
      <FilterContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            {(user?.employee?.hrManager || managedEmployeeTotal > 0) && (
              <ToggleSwitch
                leftTitle={I18n.t('Hr_MyExpenses')}
                rightTitle={I18n.t('Hr_ToValidate')}
                rigthElement={
                  <NumberBubble
                    style={styles.indicator}
                    number={totalNumberExpenseToValidate}
                    color={Colors.cautionColor}
                    isNeutralBackground={true}
                  />
                }
                onSwitch={() =>
                  setMode(_mode => {
                    setSelectedStatus(null);
                    return _mode === ExpenseType.mode.personnal
                      ? ExpenseType.mode.validation
                      : ExpenseType.mode.personnal;
                  })
                }
              />
            )}
            {mode === ExpenseType.mode.personnal ? (
              <Picker
                listItems={expenseStatusListItems}
                title={I18n.t('Hr_Status')}
                onValueChange={setSelectedStatus}
                labelField="title"
                valueField="key"
              />
            ) : (
              <ExpenseWaitingValidationSearchBar
                showDetailsPopup={false}
                oneFilter={true}
                isFocus={true}
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
            onPress={() =>
              navigation.navigate('ExpenseDetailsScreen', {
                idExpense: item.id,
                expenseMode: mode,
              })
            }
            statusSelect={item.statusSelect}
            expenseId={item.id}
            expenseSeq={item.expenseSeq}
            periodeCode={item.period?.code}
            inTaxTotal={item.inTaxTotal}
            companyInTaxTotal={item.companyInTaxTotal}
            currency={item.currency}
            employeeManagerId={item.employee?.managerUser?.id}
            employeeName={
              mode === ExpenseType.mode.validation ? item.employee?.name : null
            }
            onSend={() => sendExpenseAPI(item.id, item.version)}
            onValidate={() => validateExpenseAPI(item.id, item.version)}
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
  headerContainer: {
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    right: '5%',
  },
});

export default ExpenseListScreen;
