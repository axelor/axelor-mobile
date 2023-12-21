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
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';
import {ExpenseLineTypeSwitch} from '../../templates';

interface ExpenseLineTypeDisplayProps {
  isAddButton?: boolean;
  onChange: (mode: any) => void;
}

const ExpenseLineTypeDisplay = ({
  isAddButton,
  onChange,
}: ExpenseLineTypeDisplayProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {totalNumberExpenseGeneral, totalNumberExpenseKilomectric} =
    useSelector((state: any) => state.expenseLine);

  const isGeneral = useMemo(
    () => totalNumberExpenseGeneral > 0,
    [totalNumberExpenseGeneral],
  );

  const isKilometric = useMemo(
    () => totalNumberExpenseKilomectric > 0,
    [totalNumberExpenseKilomectric],
  );

  const displayToggle = useMemo(() => {
    return isGeneral && isKilometric;
  }, [isGeneral, isKilometric]);

  const hasExpenseLines = useMemo(() => {
    return isGeneral || isKilometric;
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
    if (hasExpenseLines) {
      onChange(_mode => {
        return isKilometric
          ? ExpenseLine.modes.kilometric
          : ExpenseLine.modes.general;
      });
    }
  }, [hasExpenseLines, isKilometric, onChange]);

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
        {hasExpenseLines && (
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
    hasExpenseLines,
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

export default ExpenseLineTypeDisplay;
