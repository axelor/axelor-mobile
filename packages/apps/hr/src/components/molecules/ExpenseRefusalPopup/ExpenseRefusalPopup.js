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
import {Button, FormInput, PopUp, useThemeColor} from '@axelor/aos-mobile-ui';
import {View} from 'react-native';
import {useTranslator, useDispatch} from '@axelor/aos-mobile-core';
import {refuseExpense} from '../../../features/expenseSlice';

const ExpenseLineValidationButton = ({
  refusalPopupIsOpen,
  setRefusalMessage,
  expense,
  mode,
  refusalMessage,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const refuseExpenseAPI = useCallback(() => {
    dispatch(
      refuseExpense({
        expenseId: expense.id,
        version: expense.version,
        groundForRefusal: refusalMessage,
        mode: mode,
      }),
    );
  }, [dispatch, expense, refusalMessage, mode]);

  return (
    <PopUp visible={refusalPopupIsOpen}>
      <View>
        <FormInput
          title={I18n.t('Hr_ReasonRefusal')}
          multiline={true}
          adjustHeightWithLines={true}
          required={true}
          onChange={setRefusalMessage}
        />
        <Button
          title={'Ok'}
          onPress={refuseExpenseAPI}
          color={
            refusalMessage == null || refusalMessage === ''
              ? Colors.secondaryColor
              : Colors.primaryColor
          }
          disabled={refusalMessage == null || refusalMessage === ''}
        />
      </View>
    </PopUp>
  );
};

export default ExpenseLineValidationButton;
