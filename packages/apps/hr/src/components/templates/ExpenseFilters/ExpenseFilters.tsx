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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  NumberBubble,
  Picker,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {searchExpenseToValidate} from '../../../features/expenseSlice';
import {Expense as ExpenseType} from '../../../types';
import {useManagedEmployees} from '../../../hooks';

const ExpenseFilters = ({
  mode,
  onChangeStatus,
  onChangeMode,
}: {
  mode: string;
  onChangeMode: (mode: any) => void;
  onChangeStatus: (status: any) => void;
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {Expense} = useTypes();
  const {getSelectionItems} = useTypeHelpers();
  const {managedEmployeeTotal} = useManagedEmployees();

  const {totalNumberExpenseToValidate} = useSelector(state => state.expense);
  const {user} = useSelector(state => state.user);

  const expenseStatusListItems = useMemo(
    () => getSelectionItems(Expense?.statusSelect),
    [Expense?.statusSelect, getSelectionItems],
  );

  useEffect(() => {
    dispatch(
      (searchExpenseToValidate as any)({
        page: 0,
        user,
        companyId: user.activeCompany?.id,
      }),
    );
  }, [dispatch, user]);

  return (
    <View style={styles.container}>
      {(user?.employee?.hrManager || managedEmployeeTotal > 0) && (
        <ToggleSwitch
          leftTitle={I18n.t('Hr_MyExpenses')}
          rightTitle={I18n.t('Hr_ToValidate')}
          rigthElement={
            <NumberBubble
              style={styles.numberBubble}
              number={totalNumberExpenseToValidate}
              color={Colors.cautionColor}
              isNeutralBackground={true}
            />
          }
          onSwitch={() => {
            onChangeStatus(null);
            onChangeMode((_mode: string) =>
              _mode === ExpenseType.mode.personnal
                ? ExpenseType.mode.validation
                : ExpenseType.mode.personnal,
            );
          }}
        />
      )}
      {mode === ExpenseType.mode.personnal && (
        <Picker
          listItems={expenseStatusListItems}
          placeholder={I18n.t('Hr_Status')}
          onValueChange={onChangeStatus}
          labelField="title"
          valueField="key"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  numberBubble: {
    position: 'absolute',
    right: '5%',
  },
});

export default ExpenseFilters;
