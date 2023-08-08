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

import React, {useEffect} from 'react';
import {Screen, Text} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchExpenseLine} from '../features/expenseLineSlice';

const ExpenseLinesListScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {expenseLineList} = useSelector(state => state.expenseLine);
  const {userId} = useSelector(state => state.auth);

  console.log(expenseLineList);

  useEffect(() => {
    dispatch(fetchExpenseLine({userId: userId}));
  }, [dispatch, userId]);

  return (
    <Screen>
      <Text>Test</Text>
    </Screen>
  );
};

export default ExpenseLinesListScreen;
