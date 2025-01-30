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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useSelector} from '@axelor/aos-mobile-core';
import {CircleButton} from '@axelor/aos-mobile-ui';
import ExpenseLineTypeDisplay from '../ExpenseLineTypeDisplay/ExpenseLineTypeDisplay';
import {Expense} from '../../../types';

interface ExpenseLineSwitchAddProps {
  mode: string;
  onChangeSwicth: (mode: any) => void;
}

const ExpenseLineSwitchAdd = ({
  mode,
  onChangeSwicth,
}: ExpenseLineSwitchAddProps) => {
  const navigation = useNavigation();

  const {expense} = useSelector((state: any) => state.expense);

  const isAddButton = useMemo(
    () => expense.statusSelect === Expense.statusSelect.Draft,
    [expense],
  );

  return (
    <View style={styles.container}>
      <ExpenseLineTypeDisplay
        onChange={onChangeSwicth}
        isAddButton={isAddButton}
      />
      {isAddButton && (
        <CircleButton
          size={38}
          iconName="plus"
          onPress={() =>
            navigation.navigate('ExpenseLineFormScreen', {
              idExpense: expense?.id,
              versionExpense: expense?.version,
              modeExpense: mode,
            })
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 10,
  },
});

export default ExpenseLineSwitchAdd;
