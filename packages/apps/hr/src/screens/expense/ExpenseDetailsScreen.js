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
import {View} from 'react-native';
import {Screen, ScrollList, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  AnomalyList,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ExpenseDetailsValidationButton,
  ExpenseHeader,
  ExpenseLineDetailCard,
  ExpenseLineSwitchAdd,
} from '../../components';
import {fetchExpenseById} from '../../features/expenseSlice';
import {
  searchGeneralExpenseLines,
  searchKilometricExpenseLines,
} from '../../features/expenseLineSlice';
import {ExpenseLine} from '../../types';

const ExpenseDetailsScreen = ({route, navigation}) => {
  const {idExpense, expenseMode, isManualCreation} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {expense} = useSelector(state => state.expense);
  const {
    loadingGeneralExpenseLine,
    moreLoadingGeneralExpenseLine,
    isListEndGeneralExpenseLine,
    generalExpenseLineList,
    loadingKilometricExpenseLine,
    moreLoadingKilometricExpenseLine,
    isListEndKilometricExpenseLine,
    kilometricExpenseLineList,
  } = useSelector(state => state.expenseLine);

  const [mode, setMode] = useState(ExpenseLine.modes.general);

  useEffect(() => {
    dispatch(fetchExpenseById({ExpenseId: idExpense}));
    dispatch(searchKilometricExpenseLines({expenseId: idExpense, page: 0}));
    dispatch(searchGeneralExpenseLines({expenseId: idExpense, page: 0}));
  }, [dispatch, idExpense]);

  const ObjectToDisplay = useMemo(() => {
    if (mode === ExpenseLine.modes.general) {
      return {
        loading: loadingGeneralExpenseLine,
        moreLoading: moreLoadingGeneralExpenseLine,
        isListEnd: isListEndGeneralExpenseLine,
        list: generalExpenseLineList,
      };
    } else {
      return {
        loading: loadingKilometricExpenseLine,
        moreLoading: moreLoadingKilometricExpenseLine,
        isListEnd: isListEndKilometricExpenseLine,
        list: kilometricExpenseLineList,
      };
    }
  }, [
    generalExpenseLineList,
    isListEndGeneralExpenseLine,
    isListEndKilometricExpenseLine,
    kilometricExpenseLineList,
    loadingGeneralExpenseLine,
    loadingKilometricExpenseLine,
    mode,
    moreLoadingGeneralExpenseLine,
    moreLoadingKilometricExpenseLine,
  ]);

  const fetchExpenseLineAPI = useCallback(
    (page = 0) => {
      dispatch(
        (mode === ExpenseLine.modes.general
          ? searchGeneralExpenseLines
          : searchKilometricExpenseLines)({expenseId: expense?.id, page: page}),
      );
    },
    [dispatch, expense, mode],
  );

  if (expense?.id !== idExpense) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <ExpenseDetailsValidationButton
          expense={expense}
          mode={expenseMode}
          isManualCreation={isManualCreation}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View>
            <ExpenseHeader />
            <ExpenseLineSwitchAdd mode={mode} onChangeSwicth={setMode} />
          </View>
        }
      />
      <AnomalyList objectName="expense" objectId={expense.id} />
      <ScrollList
        loadingList={ObjectToDisplay.loading}
        data={ObjectToDisplay.list}
        renderItem={({item}) => (
          <ExpenseLineDetailCard
            expense={expense}
            item={item}
            onEdit={() =>
              navigation.navigate('ExpenseLineFormScreen', {
                expenseLine: item,
                idExpense: idExpense,
              })
            }
          />
        )}
        fetchData={fetchExpenseLineAPI}
        moreLoading={ObjectToDisplay.moreLoading}
        isListEnd={ObjectToDisplay.isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default ExpenseDetailsScreen;
