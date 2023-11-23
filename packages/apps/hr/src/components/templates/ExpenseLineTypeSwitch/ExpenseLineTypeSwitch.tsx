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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  ToggleSwitch,
  getCommonStyles,
  useThemeColor,
  NumberBubble,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  searchGeneralExpenseLines,
  searchKilometricExpenseLines,
} from '../../../features/expenseLineSlice';
import {ExpenseLine} from '../../../types';

const ExpenseLineTypeSwitch = ({onChange}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {expense} = useSelector((state: any) => state.expense);
  const {totalNumberExpenseGeneral, totalNumberExpenseKilomectric} =
    useSelector((state: any) => state.expenseLine);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  useEffect(() => {
    dispatch(
      (searchKilometricExpenseLines as any)({expenseId: expense?.id, page: 0}),
    );

    dispatch(
      (searchGeneralExpenseLines as any)({expenseId: expense?.id, page: 0}),
    );
  }, [dispatch, expense?.id]);

  return (
    <ToggleSwitch
      styleContainer={[
        commonStyles.filter,
        commonStyles.filterSize,
        styles.toogleContainer,
      ]}
      styleToogle={styles.toggle}
      leftTitle={I18n.t('Hr_General')}
      rightTitle={I18n.t('Hr_Kilometric')}
      leftElement={
        <NumberBubble
          style={styles.indicator}
          number={totalNumberExpenseGeneral}
          color={Colors.inverseColor}
          isNeutralBackground={true}
        />
      }
      rigthElement={
        <NumberBubble
          style={styles.indicator}
          number={totalNumberExpenseKilomectric}
          color={Colors.inverseColor}
          isNeutralBackground={true}
        />
      }
      onSwitch={() => {
        onChange(_mode => {
          return _mode === ExpenseLine.modes.general
            ? ExpenseLine.modes.kilometric
            : ExpenseLine.modes.general;
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  toogleContainer: {
    alignSelf: 'center',
    marginTop: 10,
    width: '89%',
  },
  toggle: {
    width: '54%',
    height: 40,
    borderRadius: 13,
  },
  indicator: {
    position: 'absolute',
    right: '5%',
  },
});

export default ExpenseLineTypeSwitch;
