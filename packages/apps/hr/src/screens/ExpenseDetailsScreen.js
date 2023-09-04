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
  NumberBubble,
  Text,
  Badge,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  ExpenseDetailsValidationButton,
  ExpenseLineDetailCard,
} from '../components';
import {fetchExpenseById} from '../features/expenseSlice';
import {Expense} from '../types';
import {
  searchGeneralExpenseLines,
  searchKilometricExpenseLines,
} from '../features/expenseLineSlice';

const MODE = {
  general: 'GeneralMode',
  kilometric: 'KilometricMode',
};

const ExpenseDetailsScreen = ({route}) => {
  const {idExpense} = route.params;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loadingExpense, expense} = useSelector(state => state.expense);
  const {
    generalExpenseLineList,
    isListEndGeneralExpenseLine,
    moreLoadingGeneralExpenseLine,
    loadingGeneralExpenseLine,
    totalNumberExpenseGeneral,

    loadingKilometricExpenseLine,
    moreLoadingKilometricExpenseLine,
    isListEndKilometricExpenseLine,
    kilometricExpenseLineList,
    totalNumberExpenseKilomectric,
  } = useSelector(state => state.expenseLine);
  const {user} = useSelector(state => state.user);

  const [mode, setMode] = useState(MODE.general);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  useEffect(() => {
    dispatch(searchKilometricExpenseLines({expenseId: expense?.id, page: 0}));

    dispatch(searchGeneralExpenseLines({expenseId: expense?.id, page: 0}));
  }, [
    dispatch,
    expense.generalExpenseLineList,
    expense?.id,
    expense.kilometricExpenseLineList,
  ]);

  useEffect(() => {
    dispatch(fetchExpenseById({ExpenseId: idExpense}));
  }, [dispatch, idExpense]);

  const ObjectToDisplay = useMemo(() => {
    if (mode === MODE.general) {
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
      if (mode === MODE.general) {
        dispatch(
          searchGeneralExpenseLines({expenseId: expense?.id, page: page}),
        );
      }

      if (mode === MODE.kilometric) {
        dispatch(
          searchKilometricExpenseLines({expenseId: expense?.id, page: page}),
        );
      }
    },
    [dispatch, expense, mode],
  );

  if (expense?.id !== idExpense) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<ExpenseDetailsValidationButton expense={expense} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View>
            <View style={styles.headerContainer}>
              <View style={styles.headerChildrenContainer}>
                <View>
                  <Text style={styles.bold}>
                    {`${I18n.t('Hr_ExpenseNumber')} ${expense.expenseSeq} `}
                  </Text>
                </View>
                {!loadingExpense && (
                  <Badge
                    color={Expense.getStatusColor(expense.statusSelect, Colors)}
                    title={Expense.getStatus(expense.statusSelect, I18n)}
                  />
                )}
              </View>
              <Text>{`${I18n.t('Hr_TotalTTC')}: ${expense.inTaxTotal} ${
                user?.activeCompany?.currency?.symbol != null
                  ? user?.activeCompany?.currency?.symbol
                  : user?.activeCompany?.currency?.code
              }`}</Text>
            </View>
            <ToggleSwitch
              styleContainer={[
                commonStyles.filter,
                commonStyles.filterSize,
                styles.toogleContainer,
              ]}
              styleToogle={styles.toggle}
              leftTitle={I18n.t('Hr_General')}
              rightTitle={I18n.t('Hr_Kilometric')}
              leftElement={
                <NumberBubble
                  style={styles.indicator}
                  number={totalNumberExpenseGeneral}
                  color={Colors.inverseColor}
                  isNeutralBackground={true}
                />
              }
              rigthElement={
                <NumberBubble
                  style={styles.indicator}
                  number={totalNumberExpenseKilomectric}
                  color={Colors.inverseColor}
                  isNeutralBackground={true}
                />
              }
              onSwitch={() => {
                setMode(_mode => {
                  return _mode === MODE.general
                    ? MODE.kilometric
                    : MODE.general;
                });
              }}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={ObjectToDisplay.loading}
        data={ObjectToDisplay.list}
        renderItem={({item}) => (
          <ExpenseLineDetailCard expense={expense} item={item} />
        )}
        fetchData={fetchExpenseLineAPI}
        moreLoading={ObjectToDisplay.moreLoading}
        isListEnd={ObjectToDisplay.isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 24,
  },
  headerChildrenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toogleContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
  indicator: {
    position: 'absolute',
    right: '5%',
  },
});

export default ExpenseDetailsScreen;
