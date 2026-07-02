/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {View, StyleSheet} from 'react-native';
import {Text, Badge, Label, checkNullString} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {useTotalCurrency} from '../../../hooks';
import ExpenseLineSwitchAdd from '../ExpenseLineSwitchAdd/ExpenseLineSwitchAdd';

interface ExpenseHeaderProps {
  mode: string;
  onChangeSwicth: (mode: any) => void;
}

const ExpenseHeader = ({mode, onChangeSwicth}: ExpenseHeaderProps) => {
  const I18n = useTranslator();
  const {Expense} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {expense} = useSelector(state => state.expense);

  const {displayCompanyCurrency, expenseTotal, companyTotal} =
    useTotalCurrency(expense);

  const renderTotal = useCallback(
    (
      config: {inTaxTotal: string; currency: string},
      wrapper: (_s: string) => string = _s => _s,
    ) => {
      return wrapper(`${config.inTaxTotal} ${config.currency}`);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text writingType="title">
            {`${I18n.t('Hr_ExpenseNumber')} ${expense.expenseSeq} `}
          </Text>
          <Text>{`${I18n.t('Hr_TotalATI')}: ${renderTotal(expenseTotal)}${displayCompanyCurrency ? renderTotal(companyTotal, _s => ` (${_s})`) : ''}`}</Text>
        </View>
        <Badge
          color={getItemColor(Expense?.statusSelect, expense.statusSelect)}
          title={getItemTitle(Expense?.statusSelect, expense.statusSelect)}
        />
      </View>
      {expense.statusSelect === Expense?.statusSelect.Refused &&
        !checkNullString(expense?.groundForRefusal) && (
          <Label
            message={`${I18n.t('Hr_GroundForRefusal')} : ${
              expense?.groundForRefusal
            }`}
            type="error"
          />
        )}
      <ExpenseLineSwitchAdd mode={mode} onChangeSwicth={onChangeSwicth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  columnContainer: {
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
});

export default ExpenseHeader;
