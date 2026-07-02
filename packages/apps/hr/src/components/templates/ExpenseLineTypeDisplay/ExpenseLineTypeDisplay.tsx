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
import {useThemeColor, NumberBubble, Text} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';
import {ExpenseLineTypeSwitch} from '../../templates';

interface ExpenseLineTypeDisplayProps {
  onChange: (mode: string) => void;
}

const ExpenseLineTypeDisplay = ({onChange}: ExpenseLineTypeDisplayProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {totalNumberExpenseGeneral, totalNumberExpenseKilomectric} =
    useSelector(state => state.expenseLine);

  const isGeneral = useMemo(
    () => totalNumberExpenseGeneral > 0,
    [totalNumberExpenseGeneral],
  );

  const isKilometric = useMemo(
    () => totalNumberExpenseKilomectric > 0,
    [totalNumberExpenseKilomectric],
  );

  const displayToggle = useMemo(
    () => isGeneral && isKilometric,
    [isGeneral, isKilometric],
  );

  const hasExpenseLines = useMemo(
    () => isGeneral || isKilometric,
    [isGeneral, isKilometric],
  );

  const modeTitle = useMemo(
    () =>
      I18n.t(
        isGeneral
          ? 'Hr_General'
          : isKilometric
            ? 'Hr_Kilometric'
            : 'Hr_NoExpenseLine',
      ),
    [isGeneral, isKilometric, I18n],
  );

  useEffect(() => {
    if (hasExpenseLines && !displayToggle) {
      if (isGeneral) onChange(ExpenseLine.modes.general);
      if (isKilometric) onChange(ExpenseLine.modes.kilometric);
    } else onChange(ExpenseLine.modes.general);
  }, [displayToggle, hasExpenseLines, isGeneral, isKilometric, onChange]);

  return displayToggle ? (
    <ExpenseLineTypeSwitch
      onChange={onChange}
      totalNumberExpenseGeneral={totalNumberExpenseGeneral}
      totalNumberExpenseKilomectric={totalNumberExpenseKilomectric}
    />
  ) : (
    <View style={styles.containerTitle}>
      <Text writingType="title">{modeTitle}</Text>
      {hasExpenseLines && (
        <NumberBubble
          number={
            isGeneral
              ? totalNumberExpenseGeneral
              : totalNumberExpenseKilomectric
          }
          size={25}
          color={Colors.inverseColor}
          isNeutralBackground
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
    flex: 1,
  },
});

export default ExpenseLineTypeDisplay;
