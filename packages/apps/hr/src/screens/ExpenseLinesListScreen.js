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

import React, {useCallback} from 'react';
import {Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchExpenseLine} from '../features/expenseLineSlice';
import {ExpenseLineCard} from '../components';
import {StyleSheet} from 'react-native';

const ExpenseLinesListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {expenseLineList, loadingExpenseLine, moreLoading, isListEnd} =
    useSelector(state => state.expenseLine);
  const {userId} = useSelector(state => state.auth);

  const fetchExpenseLineAPI = useCallback(
    (page = 0) => {
      dispatch(fetchExpenseLine({userId: userId, page: page}));
    },
    [dispatch, userId],
  );

  return (
    <Screen>
      <ScrollList
        loadingList={loadingExpenseLine}
        data={expenseLineList}
        renderItem={({item}) => (
          <ExpenseLineCard
            style={styles.item}
            expenseDate={item.expenseDate}
            projectName={item.project?.fullName}
            totalAmount={item.totalAmount}
            displayText={
              item.fromCity == null && item.toCity == null
                ? item.expenseProduct?.fullName
                : item.kilometricTypeSelect
            }
          />
        )}
        fetchData={fetchExpenseLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ExpenseLinesListScreen;
