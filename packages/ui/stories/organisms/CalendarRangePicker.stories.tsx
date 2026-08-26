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

import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, View} from 'react-native';
import type {Meta} from '@storybook/react';
import {
  CalendarRangePicker as Component,
  DateRange,
  Text,
} from '../../src/components';
import {useThemeColor} from '../../src/theme';
import {toDateString} from '../../src/utils';
import {Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/CalendarRangePicker',
  component: Component,
};

export default meta;

const shiftedDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return toDateString(date);
};

/**
 * Marks laid out around today so that every visual case can be checked: a
 * full-day leave, a leave starting in the afternoon, a leave ending in the
 * morning, a single half-day, and a day split between two statuses.
 *
 * Colours come straight from the theme, as the component expects: it applies
 * `background_light` as fill and the strong shade on the number.
 */
const useSampleData = () => {
  const Colors = useThemeColor();

  return useMemo(() => {
    const validated = Colors.successColor;
    const waiting = Colors.cautionColor;
    const draft = Colors.secondaryColor;

    const fullDay = {id: 1, label: 'Validated leave, full day'};
    const afternoonOnly = {id: 2, label: 'Waiting leave, afternoon'};
    const morningOnly = {id: 3, label: 'Waiting leave, morning'};
    const halfDay = {id: 4, label: 'Draft leave, morning'};
    const sharedMorning = {id: 5, label: 'Validated leave, morning'};
    const sharedAfternoon = {id: 6, label: 'Waiting leave, afternoon'};

    const marksByDate = {
      [shiftedDate(2)]: {
        morningColor: validated,
        afternoonColor: validated,
        events: [fullDay],
      },
      [shiftedDate(3)]: {
        morningColor: validated,
        afternoonColor: validated,
        events: [fullDay],
      },
      [shiftedDate(6)]: {afternoonColor: waiting, events: [afternoonOnly]},
      [shiftedDate(7)]: {morningColor: waiting, events: [morningOnly]},
      [shiftedDate(10)]: {morningColor: draft, events: [halfDay]},
      // Full day reached by two records: the sheet must offer both, and no
      // longer offer to book anything.
      [shiftedDate(11)]: {
        morningColor: validated,
        afternoonColor: waiting,
        events: [sharedMorning, sharedAfternoon],
      },
    };

    // Two kinds of non-working day, told apart by their colour, one of them
    // falling on a day that already carries a leave.
    const disabledDates = {
      [shiftedDate(3)]: Colors.indigo,
      [shiftedDate(14)]: Colors.secondaryColor_dark,
      [shiftedDate(15)]: Colors.secondaryColor_dark,
    };

    const legendItems = [
      {key: 'validated', title: 'Validated', color: validated},
      {key: 'waiting', title: 'Waiting', color: waiting},
      {key: 'draft', title: 'Draft', color: draft},
      {key: 'weekEnd', title: 'Week-end', color: Colors.secondaryColor_dark},
      {key: 'holiday', title: 'Public holiday', color: Colors.indigo},
    ];

    return {marksByDate, disabledDates, legendItems};
  }, [Colors]);
};

const LABELS = {
  Base_Legend: 'Legend',
  Base_DateFormat: 'DD/MM/YYYY',
  Base_SelectThisDay: 'Select this day',
  Base_Calendar_FullDay: 'This day is already fully booked',
};

const translator = (key: string) => LABELS[key] ?? key.split('_').pop() ?? key;

export const CalendarRangePicker: Story<typeof Component> = {
  args: {
    monthsBefore: 12,
    monthsAfter: 12,
    firstDayOfWeek: 1,
  },
  render: args => {
    const Colors = useThemeColor();
    const {marksByDate, disabledDates, legendItems} = useSampleData();
    const [selection, setSelection] = useState<DateRange>({});

    const renderEvent = useCallback(
      (event: any, closeSheet: () => void) => (
        <Pressable onPress={closeSheet}>
          <Text>{event.label}</Text>
        </Pressable>
      ),
      [],
    );

    return (
      <View style={{height: 600, width: '100%'}}>
        <Component
          {...args}
          selection={selection}
          onSelectionChange={setSelection}
          marksByDate={marksByDate}
          disabledDates={disabledDates}
          legendItems={legendItems}
          disabledColor={Colors.secondaryColor_dark}
          renderEvent={renderEvent}
          translator={translator}
        />
      </View>
    );
  },
};
