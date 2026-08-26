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

import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import type {Meta} from '@storybook/react';
import {Text, WeekDayPicker as Component} from '../../src/components';
import {useThemeColor} from '../../src/theme';
import {toDateString} from '../../src/utils';
import {Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/WeekDayPicker',
  component: Component,
};

export default meta;

const shiftedDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return toDateString(date);
};

const useSampleData = () => {
  const Colors = useThemeColor();

  return useMemo(
    () => ({
      [shiftedDate(-2)]: {ratio: 1},
      [shiftedDate(-1)]: {ratio: 0.5},
      [shiftedDate(0)]: {ratio: 0.15},
      [shiftedDate(1)]: {ratio: 0},
      [shiftedDate(2)]: {filled: true},
      [shiftedDate(3)]: {disabled: true, color: Colors.secondaryColor_dark},
      [shiftedDate(4)]: {disabled: true, color: Colors.cautionColor},
      [shiftedDate(5)]: {ratio: 1.4},
    }),
    [Colors],
  );
};

const translator = (key: string) => key.split('_').pop() ?? key;

export const WeekDayPicker: Story<typeof Component> = {
  args: {
    firstDayOfWeek: 1,
  },
  render: args => {
    const fillByDate = useSampleData();
    const [selectedDate, setSelectedDate] = useState<string>(shiftedDate(0));

    return (
      <View style={{width: '100%'}}>
        <Component
          {...args}
          fromDate={shiftedDate(-10)}
          toDate={shiftedDate(12)}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          fillByDate={fillByDate}
          translator={translator}
        />
        <Text>{selectedDate}</Text>
      </View>
    );
  },
};
