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
  Button,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseCard, ExpenseWaitingValidationSearchBar} from '../components';
import {fetchExpenseById} from '../features/expenseSlice';
import {Expense} from '../types';

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
  const {user} = useSelector(state => state.user);

  const [mode, setMode] = useState(MODE.personnal);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  useEffect(() => {
    dispatch(fetchExpenseById({ExpenseId: idExpense}));
  }, [dispatch, idExpense]);

  const fetchExpenseAPI = useCallback(
    (page = 0) => {
      dispatch(fetchExpenseById({ExpenseId: idExpense}));
    },
    [dispatch, idExpense],
  );

  const ObjectToDisplay = useMemo(() => {
    if (mode === MODE.general) {
      return {
        list: expense.kilometricExpenseLineList,
      };
    } else {
      return {
        list: expense.generalExpenseLineList,
      };
    }
  }, [expense, mode]);

  console.log('expense', expense);

  const filteredList = useMemo(
    () => ObjectToDisplay.list,
    [ObjectToDisplay.list],
  );

  console.log(expense);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<Button title={I18n.t('Hr_send')} onPress={() => {}} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View>
            <View style={styles.headerContainer}>
              <View style={styles.headerChildrenContainer}>
                <View>
                  <Text style={styles.bold}>
                    {`${I18n.t('Hr_TicketNumber')} ${expense.expenseSeq} `}
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
              onSwitch={() =>
                setMode(_mode => {
                  return _mode === MODE.general
                    ? MODE.general
                    : MODE.kilometric;
                })
              }
            />
          </View>
        }
      />
      {/* <ScrollList
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
            employeeName={mode === MODE.validation ? item.employee?.name : null}
          />
        )}
        disabledRefresh={true}
        fetchData={fetchExpenseAPI}
        //moreLoading={ObjectToDisplay.moreLoading}
        //isListEnd={ObjectToDisplay.isListEnd}
        translator={I18n.t}
      />*/}
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
  },
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
