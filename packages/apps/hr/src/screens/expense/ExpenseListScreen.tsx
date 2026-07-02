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

import React, {useCallback, useMemo, useState} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {ExpenseCard, ExpenseFilters} from '../../components';
import {
  searchExpenseToValidate,
  searchMyExpense,
  sendExpense,
  validateExpense,
} from '../../features/expenseSlice';
import {Expense as ExpenseType} from '../../types';

const ExpenseListScreen = ({navigation}: any) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

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
  } = useSelector(state => state.expense);

  const [mode, setMode] = useState(ExpenseType.mode.personnal);
  const [selectedStatus, setSelectedStatus] = useState<any[]>();

  const sliceFunctionData = useMemo(
    () => ({
      user,
      userId: user.id,
      companyId: user.activeCompany?.id,
    }),
    [user],
  );

  const sendExpenseAPI = useCallback(
    (expenseId: number, version: number) => {
      dispatch((sendExpense as any)({expenseId, version, userId: user?.id}));
    },
    [dispatch, user],
  );

  const validateExpenseAPI = useCallback(
    (expenseId: number, version: number) => {
      dispatch(
        (validateExpense as any)({
          expenseId,
          version,
          userId: user?.id,
          user,
          mode,
        }),
      );
    },
    [dispatch, user, mode],
  );

  const listToDisplay = useMemo(() => {
    if (mode === ExpenseType.mode.personnal) {
      return {
        list: myExpenseList,
        loading: loadingMyExpense,
        moreLoading: moreLoadingMyExpense,
        isListEnd: isListEndMyExpense,
        sliceFunction: searchMyExpense,
      };
    } else {
      return {
        list: expenseToValidateList,
        loading: loadingExpenseToValidate,
        moreLoading: moreLoadingExpenseToValidate,
        isListEnd: isListEndExpenseToValidate,
        sliceFunction: searchExpenseToValidate,
      };
    }
  }, [
    expenseToValidateList,
    isListEndExpenseToValidate,
    isListEndMyExpense,
    loadingExpenseToValidate,
    loadingMyExpense,
    mode,
    moreLoadingExpenseToValidate,
    moreLoadingMyExpense,
    myExpenseList,
  ]);

  const filterOnStatus = useCallback(
    (list: any[]) => {
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
    () => filterOnStatus(listToDisplay.list),
    [listToDisplay.list, filterOnStatus],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        expandableFilter={false}
        topFixedItems={
          <ExpenseFilters
            onChangeStatus={setSelectedStatus}
            onChangeMode={setMode}
            mode={mode}
          />
        }
        displaySearchBar={mode === ExpenseType.mode.validation}
        searchPlaceholder={I18n.t('Hr_Employee')}
        loading={listToDisplay.loading}
        moreLoading={listToDisplay.moreLoading}
        isListEnd={listToDisplay.isListEnd}
        list={filteredList}
        sliceFunction={listToDisplay.sliceFunction}
        sliceFunctionData={sliceFunctionData}
        renderListItem={({item}) => (
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
      />
    </Screen>
  );
};

export default ExpenseListScreen;
