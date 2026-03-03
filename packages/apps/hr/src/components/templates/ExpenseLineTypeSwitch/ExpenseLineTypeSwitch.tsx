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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ToggleSwitch, useThemeColor, NumberBubble} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';

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

  const styles = useMemo(() => getStyles(isAddButton), [isAddButton]);

  return (
    <ToggleSwitch
      styleContainer={styles.toggleContainer}
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
      justifyContent: 'flex-start',
      paddingLeft: '5%',
    },
    indicator: {
      position: 'absolute',
      right: '5%',
    },
  });

export default ExpenseLineTypeSwitch;
