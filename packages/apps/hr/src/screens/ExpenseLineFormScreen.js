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

import React, {useCallback, useMemo} from 'react';
import {FormView} from '@axelor/aos-mobile-core';
import {
  createExpenseLine,
  updateExpenseLine,
} from '../features/expenseLineSlice';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../types';

const MODES = {
  general: 'general',
  kilometric: 'kilometric',
};

const ExpenseLineFormScreen = ({route, navigation}) => {
  const expenseLine = route?.params?.expenseLine;
  const mode = route?.params?.mode;
  const idExpense = route?.params?.idExpense;
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);

  console.log('expenseLine', expenseLine);

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
      dispatch(createExpenseLine({expenseLine: dataToSend, userId: user?.id}));
      navigation.navigate('ExpenseLinesListScreen');
    },
    [navigation, user?.activeCompany?.id, user?.employee?.id, user?.id],
  );

  const updateExpenseLineAPI = useCallback(
    (_expenseLine, dispatch) => {
      const dataToSend = {
        mode: mode,
        id: expenseLine?.id,
        expenseId: idExpense,
        version: expenseLine?.version,
        project: {id: _expenseLine.project?.id},
        expenseProduct: {id: _expenseLine.expenseType?.id},
        expenseDate: _expenseLine.expenseDate,
        employeeId: user?.employee?.id,
        totalAmount: _expenseLine.totalAmount,
        totalTax: _expenseLine.totalTax,
        comments: _expenseLine.comments,
        justificationMetaFile:
          mode === ExpenseLine.modes.general
            ? {id: _expenseLine.justificationMetaFile?.id}
            : null,
        kilometricAllowParam: {id: _expenseLine.kilometricAllowParam?.id},
        kilometricTypeSelect: _expenseLine.kilometricTypeSelect?.key,
        distance: _expenseLine.distance,
        fromCity: _expenseLine.fromCity,
        toCity: _expenseLine.toCity,
        expenseLineType: _expenseLine.manageMode,
        companyId: user?.activeCompany?.id,
      };
      dispatch(updateExpenseLine({expenseLine: dataToSend}));
      navigation.navigate('ExpenseDetailsScreen', {idExpense: idExpense});
    },
    [
      expenseLine?.id,
      expenseLine?.version,
      idExpense,
      mode,
      navigation,
      user?.activeCompany?.id,
      user?.employee?.id,
    ],
  );

  const defaultValue = useMemo(() => {
    if (expenseLine !== null) {
      if (mode === MODES.general) {
        return {
          manageMode: expenseLine != null ? mode : MODES.general,
          hideToggle: true,
          expenseDate: expenseLine != null ? expenseLine.expenseDate : null,
          project: expenseLine != null ? expenseLine.project : null,
          expenseType:
            expenseLine != null
              ? {
                  id: expenseLine.expenseProduct?.id,
                  name: expenseLine['expenseProduct.name'],
                }
              : null,
          totalAmount: expenseLine != null ? expenseLine.totalAmount : 0,
          totalTax: expenseLine != null ? expenseLine.totalTax : 0,

          justificationMetaFile:
            expenseLine != null ? expenseLine.justificationMetaFile : null,
          comments: expenseLine != null ? expenseLine.comments : null,
        };
      }
      if (mode === MODES.kilometric) {
        return {
          manageMode: expenseLine != null ? mode : MODES.general,
          hideToggle: true,
          expenseDate: expenseLine != null ? expenseLine.expenseDate : null,
          fromCity: expenseLine != null ? expenseLine.fromCity : null,
          toCity: expenseLine != null ? expenseLine.toCity : null,
          project: expenseLine != null ? expenseLine.project : null,
          kilometricAllowParam:
            expenseLine != null ? expenseLine.kilometricAllowParam : null,
          kilometricTypeSelect:
            expenseLine != null && mode === MODES.kilometric
              ? {
                  key: expenseLine.kilometricTypeSelect,
                  title: ExpenseLine.getKilomectricTypeSelect(
                    expenseLine.kilometricTypeSelect,
                    I18n,
                  ),
                }
              : null,
          comments: expenseLine != null ? expenseLine.comments : null,
        };
      }
    } else {
      return {
        manageMode: MODES.general,
        hideToggle: false,
      };
    }
    return {
      manageMode: MODES.general,
      hideToggle: false,
    };
  }, [I18n, expenseLine, mode]);

  return (
    <FormView
      defaultValue={defaultValue}
      actions={[
        {
          key: 'create-expenseLine',
          type: expenseLine != null ? 'update' : 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            if (expenseLine != null) {
              return updateExpenseLineAPI(objectState, dispatch);
            } else {
              return createExpenseLineAPI(objectState, dispatch);
            }
          },
        },
      ]}
      formKey="hr_Expenseline"
    />
  );
};

export default ExpenseLineFormScreen;
