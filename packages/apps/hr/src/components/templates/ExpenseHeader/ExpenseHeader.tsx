/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Badge, Label, checkNullString} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';

const ExpenseHeader = ({}) => {
  const I18n = useTranslator();
  const {Expense} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {user} = useSelector((state: any) => state.user);
  const {expense} = useSelector((state: any) => state.expense);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerChildrenContainer}>
        <View>
          <Text writingType="title">
            {`${I18n.t('Hr_ExpenseNumber')} ${expense.expenseSeq} `}
          </Text>
        </View>
        <Badge
          color={getItemColor(Expense?.statusSelect, expense.statusSelect)}
          title={getItemTitle(Expense?.statusSelect, expense.statusSelect)}
        />
      </View>
      <Text>{`${I18n.t('Hr_TotalATI')}: ${expense.inTaxTotal} ${
        user?.activeCompany?.currency?.symbol != null
          ? user?.activeCompany?.currency?.symbol
          : user?.activeCompany?.currency?.code
      }`}</Text>
      {expense.statusSelect === Expense?.statusSelect.Refused &&
        !checkNullString(expense?.groundForRefusal) && (
          <Label
            message={`${I18n.t('Hr_GroundForRefusal')} : ${
              expense?.groundForRefusal
            }`}
            type="error"
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 24,
  },
  headerChildrenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExpenseHeader;
