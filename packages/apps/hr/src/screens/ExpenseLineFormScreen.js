import React, {useCallback} from 'react';
import {FormView} from '@axelor/aos-mobile-core';
import {createExpenseLine} from '../features/expenseLineSlice';

const ExpenseLineFormScreen = ({navigation}) => {
  const createExpenseLineAPI = useCallback(
    (expense, dispatch) => {
      dispatch(createExpenseLine(expense));
      navigation.navigate('ExpenseLinesListScreen');
    },
    [navigation],
  );

  return (
    <FormView
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
