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

import React from 'react';
import {StyleSheet} from 'react-native';
import {ToggleSwitch, useThemeColor, NumberBubble} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {ExpenseLine} from '../../../types';

interface ExpenseLineTypeSwitchProps {
  onChange: (mode: any) => void;
  totalNumberExpenseGeneral: number;
  totalNumberExpenseKilomectric: number;
}

const ExpenseLineTypeSwitch = ({
  onChange,
  totalNumberExpenseGeneral,
  totalNumberExpenseKilomectric,
}: ExpenseLineTypeSwitchProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <ToggleSwitch
      styleContainer={styles.toggleContainer}
      styleToogle={styles.toggleElt}
      leftTitle={I18n.t('Hr_General')}
      rightTitle={I18n.t('Hr_Kilometric')}
      leftElement={
        <NumberBubble
          style={styles.indicator}
          size={25}
          number={totalNumberExpenseGeneral}
          color={Colors.inverseColor}
          isNeutralBackground
        />
      }
      rigthElement={
        <NumberBubble
          style={styles.indicator}
          size={25}
          number={totalNumberExpenseKilomectric}
          color={Colors.inverseColor}
          isNeutralBackground
        />
      }
      onSwitch={() =>
        onChange((_mode: string) =>
          _mode === ExpenseLine.modes.general
            ? ExpenseLine.modes.kilometric
            : ExpenseLine.modes.general,
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flex: 1,
    marginHorizontal: 0,
  },
  toggleElt: {
    paddingVertical: 6,
  },
  indicator: {
    marginLeft: 5,
  },
});

export default ExpenseLineTypeSwitch;
