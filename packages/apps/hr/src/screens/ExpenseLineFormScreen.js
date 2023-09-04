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
  general: 'GeneralMode',
  kilometric: 'KilometricMode',
};

const ExpenseLineFormScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);

  const createExpenseLineAPI = useCallback(
    (expenseLine, dispatch) => {
      const dataToSend = {
        projectId: expenseLine.project?.id,
        expenseProductId: expenseLine.expenseType?.id,
        expenseDate: expenseLine.expenseDate,
        employeeId: user?.employee?.id,
        totalAmount: expenseLine.totalAmount,
        totalTax: expenseLine.totalTax,
        comments: expenseLine.comments,
        justificationFileId: expenseLine.justificationMetaFile?.id,
        //kilometricAllowParamId: number,
        //kilometricTypeSelect: number,
        //distance: number,
        //fromCity: string,
        //toCity: string,
        expenseLineType: expenseLine.manageMode,
        companyId: user?.activeCompany?.id,
      };
      console.log('expenseLine', dataToSend);
      dispatch(createExpenseLine({expenseLine: dataToSend}));
      navigation.navigate('ExpenseLinesListScreen');
    },
    [navigation, user?.activeCompany?.id, user?.employee?.id],
  );

  return (
    <FormView
      defaultValue={{manageMode: MODES.general}}
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
