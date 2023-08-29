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
  searchExpenseLineByIds,
  searchGeneralByIds,
  searchKilometricByIds,
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
    loadingExpenseLineByIds,
    moreLoadingExpenseLineByIds,
    isListEndExpenseLineByIds,
    expenseLineListByIds,
    totalNumberExpenseKilomectric,
    totalNumberExpenseGeneral,
  } = useSelector(state => state.expenseLine);
  const {user} = useSelector(state => state.user);

  const [mode, setMode] = useState(MODE.general);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  useEffect(() => {
    const KilomectricLineIdList = expense.kilometricExpenseLineList?.map(
      item => item.id,
    );
    dispatch(searchKilometricByIds({idList: KilomectricLineIdList, page: 0}));

    const generalLineIdList = expense.generalExpenseLineList?.map(
      item => item.id,
    );
    dispatch(searchGeneralByIds({idList: generalLineIdList, page: 0}));
  }, [
    dispatch,
    expense.generalExpenseLineList,
    expense.kilometricExpenseLineList,
  ]);

  useEffect(() => {
    dispatch(fetchExpenseById({ExpenseId: idExpense}));
  }, [dispatch, idExpense]);

  const ObjectToDisplay = useMemo(() => {
    if (mode === MODE.general) {
      return {
        list: expense.generalExpenseLineList,
      };
    } else {
      return {
        list: expense.kilometricExpenseLineList,
      };
    }
  }, [expense, mode]);

  const idToSend = useMemo(() => {
    let idList = [];
    if (ObjectToDisplay?.list?.length > 0) {
      idList = ObjectToDisplay?.list?.map(item => item.id);
    }
    return idList;
  }, [ObjectToDisplay.list]);

  const fetchExpenseGeneralLineAPI = useCallback(
    (page = 0) => {
      if (idToSend != null) {
        dispatch(searchExpenseLineByIds({idList: idToSend, page: page}));
      }
    },
    [dispatch, idToSend],
  );

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
      {!loadingExpense && (
        <ScrollList
          loadingList={loadingExpenseLineByIds}
          data={expenseLineListByIds}
          renderItem={({item}) => (
            <ExpenseLineDetailCard expense={expense} item={item} />
          )}
          fetchData={fetchExpenseGeneralLineAPI}
          moreLoading={moreLoadingExpenseLineByIds}
          isListEnd={isListEndExpenseLineByIds}
          translator={I18n.t}
        />
      )}
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
  cardIconButton: {
    flex: 1,
    margin: 0,
    marginRight: '2%',
  },
  containerCard: {
    flex: 6,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default ExpenseDetailsScreen;
