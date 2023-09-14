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
import {StyleSheet, View} from 'react-native';
import {
  Button,
  FormInput,
  Icon,
  PopUp,
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useDispatch} from '@axelor/aos-mobile-core';
import {refuseExpense} from '../../../features/expenseSlice';

const ExpenseRefusalPopup = ({
  refusalPopupIsOpen,
  setRefusalMessage,
  expense,
  mode,
  refusalMessage,
  onClose,
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
    <PopUp visible={refusalPopupIsOpen} childrenStyle={styles.container}>
      <View>
        <Icon
          name="times"
          size={20}
          touchable={true}
          onPress={onClose}
          style={styles.closeIcon}
        />
        <FormInput
          title={I18n.t('Hr_ReasonRefusal')}
          multiline={true}
          adjustHeightWithLines={true}
          required={true}
          onChange={setRefusalMessage}
          style={styles.input}
        />
        <Icon
          name="check"
          color={
            checkNullString(refusalMessage)
              ? Colors.secondaryColor.background
              : Colors.primaryColor.background
          }
          disabled={checkNullString(refusalMessage)}
          touchable={true}
          onPress={refuseExpenseAPI}
        />
      </View>
    </PopUp>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: 5,
  },
});

export default ExpenseRefusalPopup;
