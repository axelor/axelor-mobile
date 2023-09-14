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

const ExpenseLineFormScreen = ({route, navigation}) => {
  const {expenseLine, idExpense, justificationMetaFile} = route?.params;
  const I18n = useTranslator();

  const {user} = useSelector(state => state.user);

  const createExpenseLineAPI = useCallback(
    (_expenseLine, dispatch) => {
      const dataToSend = {
        projectId: _expenseLine.project?.id,
        expenseProductId: _expenseLine.expenseProduct?.id,
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
      const mode = ExpenseLine.getExpenseMode(expenseLine);

      const dataToSend = {
        id: expenseLine?.id,
        version: expenseLine?.version,
        project: _expenseLine?.project,
        expenseProduct: _expenseLine.expenseProduct,
        expenseDate: _expenseLine.expenseDate,
        employeeId: user?.employee?.id,
        totalAmount: _expenseLine.totalAmount,
        totalTax: _expenseLine.totalTax,
        comments: _expenseLine.comments,
        justificationMetaFile:
          mode === ExpenseLine.modes.general
            ? _expenseLine.justificationMetaFile
            : null,
        kilometricAllowParam: _expenseLine.kilometricAllowParam,
        kilometricTypeSelect: _expenseLine.kilometricTypeSelect?.key,
        distance: _expenseLine.distance,
        fromCity: _expenseLine.fromCity,
        toCity: _expenseLine.toCity,
        expenseLineType: _expenseLine.manageMode,
        companyId: user?.activeCompany?.id,
      };
      dispatch(
        updateExpenseLine({
          expenseLine: dataToSend,
          expenseId: idExpense,
          mode: mode,
          userId: user?.id,
        }),
      );

      if (idExpense == null) {
        navigation.navigate('ExpenseLinesListScreen');
      } else {
        navigation.navigate('ExpenseDetailsScreen', {idExpense});
      }
    },
    [expenseLine, idExpense, navigation, user],
  );

  const defaultValue = useMemo(() => {
    if (justificationMetaFile != null) {
      return {
        manageMode: ExpenseLine.modes.general,
        hideToggle: true,
        justificationMetaFile,
      };
    } else if (expenseLine != null) {
      const mode = ExpenseLine.getExpenseMode(expenseLine);

      if (mode === ExpenseLine.modes.general) {
        return {
          manageMode: mode,
          hideToggle: true,
          expenseDate: expenseLine.expenseDate,
          project: expenseLine.project,
          expenseProduct: {
            id: expenseLine.expenseProduct?.id,
            name: expenseLine['expenseProduct.name'],
          },
          totalAmount: expenseLine.totalAmount || 0,
          totalTax: expenseLine.totalTax || 0,
          justificationMetaFile: expenseLine.justificationMetaFile,
          comments: expenseLine.comments,
        };
      } else if (mode === ExpenseLine.modes.kilometric) {
        return {
          manageMode: mode,
          hideToggle: true,
          expenseDate: expenseLine.expenseDate,
          project: expenseLine.project,
          fromCity: expenseLine.fromCity,
          toCity: expenseLine.toCity,
          distance: expenseLine.distance || 0,
          kilometricAllowParam: expenseLine.kilometricAllowParam,
          kilometricTypeSelect: {
            key: expenseLine.kilometricTypeSelect,
            title: ExpenseLine.getKilomectricTypeSelect(
              expenseLine.kilometricTypeSelect,
              I18n,
            ),
          },
          comments: expenseLine.comments,
        };
      }
    }

    return {
      manageMode: ExpenseLine.modes.general,
      hideToggle: false,
    };
  }, [I18n, expenseLine, justificationMetaFile]);

  return (
    <FormView
      defaultValue={defaultValue}
      actions={[
        {
          key: 'create-expenseLine',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => expenseLine != null,
          customAction: ({dispatch, objectState}) => {
            return createExpenseLineAPI(objectState, dispatch);
          },
        },
        {
          key: 'update-expenseLine',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => expenseLine == null,
          customAction: ({dispatch, objectState}) => {
            return updateExpenseLineAPI(objectState, dispatch);
          },
        },
      ]}
      formKey="hr_Expenseline"
    />
  );
};

export default ExpenseLineFormScreen;
