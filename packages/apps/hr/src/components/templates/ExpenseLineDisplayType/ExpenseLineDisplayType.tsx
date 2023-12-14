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
  ToggleSwitch,
  getCommonStyles,
  useThemeColor,
  NumberBubble,
  Text,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator, useDispatch} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';
import {
  searchGeneralExpenseLines,
  searchKilometricExpenseLines,
} from '../../../features/expenseLineSlice';

interface ExpenseLineTypeSwitchProps {
  isAddButton?: boolean;
  onChange: (mode: any) => void;
  totalNumberExpenseGeneral: number;
  totalNumberExpenseKilomectric: number;
}

const ExpenseLineTypeSwitch = ({
  isAddButton = false,
  onChange,
  totalNumberExpenseGeneral,
  totalNumberExpenseKilomectric,
}: ExpenseLineTypeSwitchProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(isAddButton), [isAddButton]);

  return (
    <ToggleSwitch
      styleContainer={[
        commonStyles.filter,
        commonStyles.filterSize,
        styles.toggleContainer,
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

const getStyles = isAddButton =>
  StyleSheet.create({
    toggleContainer: {
      width: isAddButton ? '88%' : '100%',
      margin: 0,
    },
    toggle: {
      width: isAddButton ? '55%' : '54%',
      height: 40,
      borderRadius: 13,
      justifyContent: 'flex-start',
      paddingLeft: '5%',
    },
    indicator: {
      position: 'absolute',
      right: '5%',
    },
  });

interface ExpenseLineDisplayTypeProps {
  isAddButton?: boolean;
  onChange: (mode: any) => void;
  mode?: string;
}

const ExpenseLineDisplayType = ({
  isAddButton,
  onChange,
  mode,
}: ExpenseLineDisplayTypeProps) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
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

  const displayToggle = useMemo(() => {
    return (
      generalExpenseLineList?.length > 0 &&
      kilometricExpenseLineList?.length > 0
    );
  }, [generalExpenseLineList, kilometricExpenseLineList]);

  const isExpenseLine = useMemo(() => {
    if (
      (kilometricExpenseLineList == null ||
        kilometricExpenseLineList?.length === 0) &&
      (generalExpenseLineList == null || generalExpenseLineList?.length === 0)
    ) {
      return false;
    } else {
      return true;
    }
  }, [generalExpenseLineList, kilometricExpenseLineList]);

  const modeTitle = useMemo(() => {
    if (!isExpenseLine) {
      return I18n.t('Hr_NoExpenseLine');
    } else if (mode === ExpenseLine.modes.general) {
      return I18n.t('Hr_General');
    } else {
      return I18n.t('Hr_Kilometric');
    }
  }, [isExpenseLine, mode, I18n]);

  const styles = useMemo(() => getStylesDisplay(isAddButton), [isAddButton]);

  useEffect(() => {
    if (
      kilometricExpenseLineList == null ||
      kilometricExpenseLineList?.length === 0
    ) {
      onChange(_mode => {
        return ExpenseLine.modes.general;
      });
    } else if (
      generalExpenseLineList == null ||
      generalExpenseLineList?.length === 0
    ) {
      onChange(_mode => {
        return ExpenseLine.modes.kilometric;
      });
    }
  }, [generalExpenseLineList, kilometricExpenseLineList, onChange]);

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
        <Text style={styles.title}>{modeTitle}</Text>
        {isExpenseLine && (
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
        )}
      </View>
    );
  }, [
    Colors.inverseColor,
    mode,
    modeTitle,
    styles,
    totalNumberExpenseGeneral,
    totalNumberExpenseKilomectric,
    isExpenseLine,
  ]);

  return displayToggle ? renderToggle() : renderTitle();
};

const getStylesDisplay = isAddButton =>
  StyleSheet.create({
    containerTitle: {
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
  });

export default ExpenseLineDisplayType;
