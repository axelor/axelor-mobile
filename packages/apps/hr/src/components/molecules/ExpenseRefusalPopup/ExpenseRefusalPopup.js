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
import {StyleSheet, View} from 'react-native';
import {
  FormInput,
  IconButton,
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

  const isDisabled = useMemo(
    () => checkNullString(refusalMessage),
    [refusalMessage],
  );

  return (
    <PopUp visible={refusalPopupIsOpen} childrenStyle={styles.container}>
      <FormInput
        title={I18n.t('Hr_ReasonRefusal')}
        multiline={true}
        adjustHeightWithLines={true}
        required={true}
        onChange={setRefusalMessage}
      />
      <View style={styles.buttonContainer}>
        <IconButton
          iconName="times"
          title={I18n.t('Hr_Cancel')}
          onPress={onClose}
          style={styles.button}
          color={Colors.errorColor}
        />
        <IconButton
          iconName="check"
          title={I18n.t('Hr_Ok')}
          onPress={refuseExpenseAPI}
          style={styles.button}
          color={isDisabled ? Colors.secondaryColor : Colors.primaryColor}
          disabled={isDisabled}
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
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
  },
});

export default ExpenseRefusalPopup;
