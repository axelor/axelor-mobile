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
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  CircleButton,
  NumberBubble,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import ExpenseLineTypeSwitch from '../ExpenseLineTypeSwitch/ExpenseLineTypeSwitch';
import {
  searchGeneralExpenseLines,
  searchKilometricExpenseLines,
} from '../../../features/expenseLineSlice';
import {Expense, ExpenseLine} from '../../../types';

interface ExpenseLineSwitchAddProps {
  mode: string;
  onChangeSwicth: (mode: any) => void;
}

const ExpenseLineSwitchAdd = ({
  mode,
  onChangeSwicth,
}: ExpenseLineSwitchAddProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const {expense} = useSelector((state: any) => state.expense);
  const {
    generalExpenseLineList,
    totalNumberExpenseGeneral,
    kilometricExpenseLineList,
    totalNumberExpenseKilomectric,
  } = useSelector((state: any) => state.expenseLine);

  useEffect(() => {
    dispatch(
      (searchKilometricExpenseLines as any)({expenseId: expense?.id, page: 0}),
    );

    dispatch(
      (searchGeneralExpenseLines as any)({expenseId: expense?.id, page: 0}),
    );
  }, [dispatch, expense]);

  useEffect(() => {
    if (
      kilometricExpenseLineList == null ||
      kilometricExpenseLineList?.length === 0
    ) {
      onChangeSwicth(_mode => {
        return ExpenseLine.modes.general;
      });
    } else if (
      generalExpenseLineList == null ||
      generalExpenseLineList?.length === 0
    ) {
      onChangeSwicth(_mode => {
        return ExpenseLine.modes.kilometric;
      });
    }
  }, [generalExpenseLineList, kilometricExpenseLineList, onChangeSwicth]);

  const displayToggle = useMemo(() => {
    return (
      generalExpenseLineList?.length > 0 &&
      kilometricExpenseLineList?.length > 0
    );
  }, [generalExpenseLineList, kilometricExpenseLineList]);

  const isAddButton = useMemo(
    () => expense?.statusSelect === Expense.statusSelect.Draft,
    [expense],
  );

  const styles = useMemo(() => getStyles(isAddButton), [isAddButton]);

  const renderCircleButton = useCallback(() => {
    return (
      isAddButton && (
        <CircleButton
          size={38}
          iconName="plus"
          style={!displayToggle && styles.indicatorCircleButton}
          onPress={() =>
            navigation.navigate('ExpenseLineFormScreen', {
              idExpense: expense?.id,
              versionExpense: expense?.version,
              modeExpense: mode,
            })
          }
        />
      )
    );
  }, [
    displayToggle,
    expense?.id,
    expense?.version,
    isAddButton,
    mode,
    navigation,
    styles,
  ]);

  const renderToggle = useCallback(() => {
    return (
      <View style={styles.containerToggle}>
        <ExpenseLineTypeSwitch
          onChange={onChangeSwicth}
          isAddButton={isAddButton}
        />
        {renderCircleButton()}
      </View>
    );
  }, [isAddButton, onChangeSwicth, renderCircleButton, styles.containerToggle]);

  const renderTitle = useCallback(() => {
    return (
      <View style={styles.containerTitle}>
        <View style={styles.containerChildrenTitle}>
          <Text style={styles.title}>
            {mode === ExpenseLine.modes.general
              ? I18n.t('Hr_General')
              : I18n.t('Hr_Kilometric')}
          </Text>
          <NumberBubble
            number={
              mode === ExpenseLine.modes.general
                ? totalNumberExpenseGeneral
                : totalNumberExpenseKilomectric
            }
            color={Colors.inverseColor}
            isNeutralBackground={true}
            style={styles.bubbleStyle}
          />
        </View>
        {renderCircleButton()}
      </View>
    );
  }, [
    Colors.inverseColor,
    I18n,
    mode,
    renderCircleButton,
    styles,
    totalNumberExpenseGeneral,
    totalNumberExpenseKilomectric,
  ]);

  return displayToggle ? renderToggle() : renderTitle();
};

const getStyles = isAddButton =>
  StyleSheet.create({
    containerToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    containerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 24,
      justifyContent: 'space-between',
      marginBottom: !isAddButton ? 10 : 0,
    },
    containerChildrenTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bubbleStyle: {
      marginLeft: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    indicatorCircleButton: {
      marginLeft: 10,
    },
  });

export default ExpenseLineSwitchAdd;
