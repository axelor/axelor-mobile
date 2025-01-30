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
import {
  useThemeColor,
  Text,
  Badge,
  Label,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Expense} from '../../../types';

const ExpenseHeader = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

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
          color={Expense.getStatusColor(expense.statusSelect, Colors)}
          title={Expense.getStatus(expense.statusSelect, I18n)}
        />
      </View>
      <Text>{`${I18n.t('Hr_TotalATI')}: ${expense.inTaxTotal} ${
        user?.activeCompany?.currency?.symbol != null
          ? user?.activeCompany?.currency?.symbol
          : user?.activeCompany?.currency?.code
      }`}</Text>
      {!checkNullString(expense?.groundForRefusal) && (
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
