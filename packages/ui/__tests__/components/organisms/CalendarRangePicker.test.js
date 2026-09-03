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
import {Text} from 'react-native';
import {act, fireEvent} from '@testing-library/react-native';
import {CalendarRangePicker} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('CalendarRangePicker Component', () => {
  const Colors = getDefaultThemeColors();

  // A fixed month keeps the day identifiers deterministic: July 2026 starts on
  // a Wednesday and holds 31 days.
  const TODAY = '2026-07-15';

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 6, 15));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const setupPicker = overrideProps =>
    setup({
      Component: CalendarRangePicker,
      baseProps: {
        selection: {},
        onSelectionChange: jest.fn(),
        disabledColor: Colors.secondaryColor,
        translator: key => key,
        // A single month keeps the assertions on rendered days unambiguous.
        monthsBefore: 0,
        monthsAfter: 0,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupPicker();

    expect(getByTestId('calendarRangePickerList')).toBeTruthy();
    expect(getByTestId(`calendarDay-${TODAY}`)).toBeTruthy();
  });

  it('renders every day of the month and no day of the next one', () => {
    const {getByTestId, queryByTestId} = setupPicker();

    expect(getByTestId('calendarDay-2026-07-01')).toBeTruthy();
    expect(getByTestId('calendarDay-2026-07-31')).toBeTruthy();
    expect(queryByTestId('calendarDay-2026-08-01')).toBeNull();
  });

  describe('selection', () => {
    it('starts a range on the first press', () => {
      const {getByTestId, props} = setupPicker();

      fireEvent.press(getByTestId('calendarDay-2026-07-10'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-10',
        endDate: undefined,
      });
    });

    it('closes the range on the second press', () => {
      const {getByTestId, props} = setupPicker({
        selection: {startDate: '2026-07-10'},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-20'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-10',
        endDate: '2026-07-20',
      });
    });

    it('restarts a range when a date before the start is pressed', () => {
      const {getByTestId, props} = setupPicker({
        selection: {startDate: '2026-07-10'},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-05'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-05',
        endDate: '2026-07-10',
      });
    });

    it('marks every day of the range as selected', () => {
      const {getByTestId, queryByTestId} = setupPicker({
        selection: {startDate: '2026-07-10', endDate: '2026-07-12'},
      });

      expect(queryByTestId('calendarDaySelected-2026-07-09')).toBeNull();
      expect(getByTestId('calendarDaySelected-2026-07-10')).toBeTruthy();
      expect(getByTestId('calendarDaySelected-2026-07-11')).toBeTruthy();
      expect(getByTestId('calendarDaySelected-2026-07-12')).toBeTruthy();
      expect(queryByTestId('calendarDaySelected-2026-07-13')).toBeNull();
    });
  });

  describe('disabled dates', () => {
    it('ignores a press on a date that cannot be selected', () => {
      const {getByTestId, props} = setupPicker({
        disabledDates: {'2026-07-11': Colors.secondaryColor},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-11'));

      expect(props.onSelectionChange).not.toHaveBeenCalled();
    });

    it('still lets a range span a disabled date', () => {
      const {getByTestId, props} = setupPicker({
        selection: {startDate: '2026-07-10'},
        disabledDates: {'2026-07-11': Colors.secondaryColor},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-12'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-10',
        endDate: '2026-07-12',
      });
    });
  });

  describe('full days', () => {
    const fullDay = {
      morningColor: Colors.successColor,
      afternoonColor: Colors.successColor,
    };

    it('ignores a press on a day whose two halves are taken', () => {
      const {getByTestId, props} = setupPicker({
        marksByDate: {'2026-07-11': fullDay},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-11'));

      expect(props.onSelectionChange).not.toHaveBeenCalled();
    });

    it('selects a full day when the option is disabled', () => {
      const {getByTestId, props} = setupPicker({
        marksByDate: {'2026-07-11': fullDay},
        disableFullDaySelection: false,
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-11'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-11',
        endDate: undefined,
      });
    });

    it('shortens a range that would span a full day', () => {
      const {getByTestId, props} = setupPicker({
        selection: {startDate: '2026-07-10'},
        marksByDate: {'2026-07-15': fullDay},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-20'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-10',
        endDate: '2026-07-14',
      });
    });

    it('keeps a range that stops before a full day', () => {
      const {getByTestId, props} = setupPicker({
        selection: {startDate: '2026-07-10'},
        marksByDate: {'2026-07-15': fullDay},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-14'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-10',
        endDate: '2026-07-14',
      });
    });
  });

  describe('day sheet', () => {
    const renderEvent = event => <Text>{event.label}</Text>;

    const markWithEvents = {
      morningColor: Colors.successColor,
      events: [
        {id: 1, label: 'first record'},
        {id: 2, label: 'second record'},
      ],
    };

    it('opens the sheet instead of selecting when the day holds records', () => {
      const {getByTestId, getByText, props} = setupPicker({
        marksByDate: {'2026-07-11': markWithEvents},
        renderEvent,
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-11'));

      expect(props.onSelectionChange).not.toHaveBeenCalled();
      expect(getByText('first record')).toBeTruthy();
      expect(getByText('second record')).toBeTruthy();
    });

    it('selects normally when no render function is provided', () => {
      const {getByTestId, props} = setupPicker({
        marksByDate: {'2026-07-11': markWithEvents},
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-11'));

      expect(props.onSelectionChange).toHaveBeenCalledWith({
        startDate: '2026-07-11',
        endDate: undefined,
      });
    });

    it('opens the sheet of a non-working day that holds records', () => {
      const {getByTestId, getByText} = setupPicker({
        marksByDate: {'2026-07-11': markWithEvents},
        disabledDates: {'2026-07-11': Colors.secondaryColor},
        renderEvent,
      });

      fireEvent.press(getByTestId('calendarDay-2026-07-11'));

      expect(getByText('first record')).toBeTruthy();
    });
  });

  describe('legend', () => {
    it('lists the given items once expanded', () => {
      const {getByText, queryByText} = setupPicker({
        legendItems: [
          {key: 'a', title: 'Validated', color: Colors.successColor},
        ],
      });

      expect(queryByText('Validated')).toBeNull();

      fireEvent.press(getByText('Base_Legend'));

      expect(getByText('Validated')).toBeTruthy();
    });

    it('appends the entry describing days that cannot be selected', () => {
      const {getByText} = setupPicker({
        legendItems: [
          {key: 'a', title: 'Validated', color: Colors.successColor},
        ],
        disabledTitle: 'Non-working day',
      });

      fireEvent.press(getByText('Base_Legend'));

      expect(getByText('Non-working day')).toBeTruthy();
    });

    it('does not render the legend header without items', () => {
      const {queryByText} = setupPicker();

      expect(queryByText('Base_Legend')).toBeNull();
    });
  });

  describe('visible range', () => {
    /**
     * Viewability is computed from real layout events, which the test renderer
     * does not produce: the platform callback is invoked directly to simulate
     * a scroll settling on the given months.
     */
    const scrollTo = (getByTestId, indexes) => {
      const {viewabilityConfigCallbackPairs} = getByTestId(
        'calendarRangePickerList',
      ).props;

      act(() => {
        viewabilityConfigCallbackPairs[0].onViewableItemsChanged({
          viewableItems: indexes.map(index => ({index})),
        });
      });
    };

    it('announces the range only once the scrolling settles', () => {
      const onVisibleRangeChange = jest.fn();
      const {getByTestId} = setupPicker({onVisibleRangeChange});

      scrollTo(getByTestId, [0]);

      expect(onVisibleRangeChange).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(onVisibleRangeChange).toHaveBeenCalledTimes(1);
      expect(onVisibleRangeChange).toHaveBeenCalledWith({
        fromDate: '2026-07-01',
        toDate: '2026-07-31',
      });
    });

    it('announces a single range when several months are crossed quickly', () => {
      const onVisibleRangeChange = jest.fn();
      const {getByTestId} = setupPicker({
        onVisibleRangeChange,
        monthsBefore: 1,
        monthsAfter: 1,
      });

      scrollTo(getByTestId, [0]);
      scrollTo(getByTestId, [1]);
      scrollTo(getByTestId, [2]);

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(onVisibleRangeChange).toHaveBeenCalledTimes(1);
      expect(onVisibleRangeChange).toHaveBeenCalledWith({
        fromDate: '2026-07-01',
        toDate: '2026-08-31',
      });
    });

    it('does not announce the same range twice', () => {
      const onVisibleRangeChange = jest.fn();
      const {getByTestId} = setupPicker({onVisibleRangeChange});

      scrollTo(getByTestId, [0]);

      act(() => {
        jest.advanceTimersByTime(300);
      });

      scrollTo(getByTestId, [0]);

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(onVisibleRangeChange).toHaveBeenCalledTimes(1);
    });
  });
});
