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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor, CardIconButton} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Expense, ExpenseLine} from '../../../types';
import {ExpenseLineCard} from '../../atoms';

const ExpenseLineDetailCard = ({item, expense}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <ExpenseLineCard
          expenseDate={item.expenseDate}
          projectName={item.project?.fullName}
          totalAmount={item.totalAmount}
          displayText={
            item.fromCity == null && item.toCity == null
              ? item.expenseProduct?.fullName
              : ExpenseLine.getKilomectricTypeSelect(
                  item.kilometricTypeSelect,
                  I18n,
                )
          }
          linkIcon={
            item.fromCity == null &&
            item.toCity == null &&
            item.justificationMetaFile != null
          }
          pdfFile={item.justificationMetaFile}
        />
      </View>
      {expense.statusSelect === Expense.statusSelect.Draft && (
        <CardIconButton
          iconName={'pencil-alt'}
          iconColor={Colors.primaryColor.foreground}
          onPress={() => {}}
          style={styles.cardIconButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardIconButton: {
    flex: 1,
    margin: 0,
    marginRight: '2%',
  },
  containerCard: {
    flex: 6,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default ExpenseLineDetailCard;
