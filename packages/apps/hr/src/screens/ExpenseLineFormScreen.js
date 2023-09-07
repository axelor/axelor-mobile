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
import {FormView} from '@axelor/aos-mobile-core';
import {createExpenseLine} from '../features/expenseLineSlice';
import {useSelector} from '@axelor/aos-mobile-core';

const MODES = {
  general: 'general',
  kilometric: 'kilometric',
};

const ExpenseLineFormScreen = ({route, navigation}) => {
  const expenseLine = route?.params?.expenseLine;
  const mode = route?.params?.mode;

  const {user} = useSelector(state => state.user);

  console.log(expenseLine);
  console.log('mode', mode);

  const createExpenseLineAPI = useCallback(
    (_expenseLine, dispatch) => {
      const dataToSend = {
        projectId: _expenseLine.project?.id,
        expenseProductId: _expenseLine.expenseType?.id,
        expenseDate: _expenseLine.expenseDate,
        employeeId: user?.employee?.id,
        totalAmount: _expenseLine.totalAmount,
        totalTax: _expenseLine.totalTax,
        comments: _expenseLine.comments,
        justificationFileId: _expenseLine.justificationMetaFile?.id,
        kilometricAllowParamId: _expenseLine.kilometricAllowParam?.id,
        kilometricTypeSelect: _expenseLine.kilometricTypeSelect?.key,
        distance: _expenseLine.distance,
        fromCity: _expenseLine.fromCity,
        toCity: _expenseLine.toCity,
        expenseLineType: _expenseLine.manageMode,
        companyId: user?.activeCompany?.id,
      };
      dispatch(createExpenseLine({expenseLine: dataToSend}));
      navigation.navigate('ExpenseLinesListScreen');
    },
    [navigation, user?.activeCompany?.id, user?.employee?.id],
  );

  return (
    <FormView
      defaultValue={{
        manageMode: expenseLine != null ? mode : MODES.general,
        fromCity: expenseLine != null ? expenseLine.fromCity : null,
        toCity: expenseLine != null ? expenseLine.toCity : null,
      }}
      actions={[
        {
          key: 'create-expenseLine',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) =>
            createExpenseLineAPI(objectState, dispatch),
        },
      ]}
      formKey="hr_Expenseline"
    />
  );
};

export default ExpenseLineFormScreen;
