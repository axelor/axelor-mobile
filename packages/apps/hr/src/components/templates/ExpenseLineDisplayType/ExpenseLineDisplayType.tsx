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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor, NumberBubble, Text} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator, useDispatch} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';
import {
  searchGeneralExpenseLines,
  searchKilometricExpenseLines,
} from '../../../features/expenseLineSlice';
import ExpenseLineTypeSwitch from '../ExpenseLineTypeSwitch/ExpenseLineTypeSwitch';

interface ExpenseLineDisplayTypeProps {
  isAddButton?: boolean;
  onChange: (mode: any) => void;
}

const ExpenseLineDisplayType = ({
  isAddButton,
  onChange,
}: ExpenseLineDisplayTypeProps) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {expense} = useSelector((state: any) => state.expense);
  const {totalNumberExpenseGeneral, totalNumberExpenseKilomectric} =
    useSelector((state: any) => state.expenseLine);

  useEffect(() => {
    dispatch(
      (searchKilometricExpenseLines as any)({expenseId: expense?.id, page: 0}),
    );

    dispatch(
      (searchGeneralExpenseLines as any)({expenseId: expense?.id, page: 0}),
    );
  }, [dispatch, expense]);

  const displayToggle = useMemo(() => {
    return totalNumberExpenseGeneral > 0 && totalNumberExpenseKilomectric > 0;
  }, [totalNumberExpenseGeneral, totalNumberExpenseKilomectric]);

  const isGeneral = useMemo(
    () => totalNumberExpenseGeneral > 0 && totalNumberExpenseKilomectric === 0,
    [totalNumberExpenseGeneral, totalNumberExpenseKilomectric],
  );

  const isKilometric = useMemo(
    () => totalNumberExpenseKilomectric > 0 && totalNumberExpenseGeneral === 0,
    [totalNumberExpenseGeneral, totalNumberExpenseKilomectric],
  );

  const hasOneTypeExpenseLines = useMemo(() => {
    return !(!isGeneral && !isKilometric);
  }, [isGeneral, isKilometric]);

  const modeTitle = useMemo(() => {
    if (isGeneral) {
      return I18n.t('Hr_General');
    } else if (isKilometric) {
      return I18n.t('Hr_Kilometric');
    } else {
      return I18n.t('Hr_NoExpenseLine');
    }
  }, [isGeneral, isKilometric, I18n]);

  useEffect(() => {
    if (hasOneTypeExpenseLines) {
      onChange(_mode => {
        return isKilometric
          ? ExpenseLine.modes.kilometric
          : ExpenseLine.modes.general;
      });
    }
  }, [hasOneTypeExpenseLines, isKilometric, onChange]);

  const renderToggle = useCallback(() => {
    return (
      <ExpenseLineTypeSwitch
        onChange={onChange}
        isAddButton={isAddButton}
        totalNumberExpenseGeneral={totalNumberExpenseGeneral}
        totalNumberExpenseKilomectric={totalNumberExpenseKilomectric}
      />
    );
  }, [
    isAddButton,
    onChange,
    totalNumberExpenseGeneral,
    totalNumberExpenseKilomectric,
  ]);

  const renderTitle = useCallback(() => {
    return (
      <View style={styles.containerTitle}>
        <Text writingType="title">{modeTitle}</Text>
        {hasOneTypeExpenseLines && (
          <NumberBubble
            number={
              isGeneral
                ? totalNumberExpenseGeneral
                : totalNumberExpenseKilomectric
            }
            color={Colors.inverseColor}
            isNeutralBackground={true}
            style={styles.bubbleStyle}
          />
        )}
      </View>
    );
  }, [
    modeTitle,
    hasOneTypeExpenseLines,
    isGeneral,
    totalNumberExpenseGeneral,
    totalNumberExpenseKilomectric,
    Colors.inverseColor,
  ]);

  return displayToggle ? renderToggle() : renderTitle();
};

const styles = StyleSheet.create({
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleStyle: {
    marginLeft: 10,
  },
});

export default ExpenseLineDisplayType;
