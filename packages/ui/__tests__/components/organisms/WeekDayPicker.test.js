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

import {Dimensions, StyleSheet} from 'react-native';
import {fireEvent} from '@testing-library/react-native';
import {addOpacityToHex, WeekDayPicker} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('WeekDayPicker Component', () => {
  const Colors = getDefaultThemeColors();

  // August 2026 starts on a Saturday: the period below runs from a Wednesday
  // to a Thursday, so both the opening and the closing week are incomplete.
  // Weeks: [03-09] [10-16] [17-23], out of period 03, 04 and 21, 22, 23.
  const FROM_DATE = '2026-08-05';
  const TO_DATE = '2026-08-20';
  // The selection sits in the first week, which is therefore the mounted page:
  // a FlatList only renders a window around initialScrollIndex.
  const TODAY = '2026-08-06';

  const PAGE_WIDTH = Dimensions.get('window').width;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 7, 6));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const setupPicker = overrideProps =>
    setup({
      Component: WeekDayPicker,
      baseProps: {
        fromDate: FROM_DATE,
        toDate: TO_DATE,
        selectedDate: TODAY,
        onDateChange: jest.fn(),
        translator: key => key,
      },
      overrideProps,
    });

  // Paging is driven by real scroll events, which the test renderer does not
  // produce: the platform callback is invoked directly.
  const swipeToPage = (getByTestId, index) => {
    fireEvent(getByTestId('weekDayPickerList'), 'momentumScrollEnd', {
      nativeEvent: {contentOffset: {x: PAGE_WIDTH * index}},
    });
  };

  it('renders without crashing', () => {
    const {getByTestId} = setupPicker();

    expect(getByTestId('weekDayPickerList')).toBeTruthy();
    expect(getByTestId(`weekDay-${TODAY}`)).toBeTruthy();
  });

  it('renders one page per week overlapping the period', () => {
    const {getByTestId} = setupPicker();

    expect(getByTestId('weekDayPickerList').props.data).toHaveLength(3);
  });

  it('completes the first week with the days preceding the period', () => {
    const {getByTestId} = setupPicker();

    // The period starts on Wednesday 5th, the Monday before is still rendered.
    expect(getByTestId('weekDay-2026-08-03')).toBeTruthy();
    expect(getByTestId('weekDay-2026-08-05')).toBeTruthy();
  });

  it('builds no week beyond the one holding the last day', () => {
    const {getByTestId} = setupPicker();

    const {data} = getByTestId('weekDayPickerList').props;

    expect(data[data.length - 1].key).toBe('2026-08-17');
  });

  describe('selection', () => {
    it('announces the pressed day', () => {
      const {getByTestId, props} = setupPicker();

      fireEvent.press(getByTestId('weekDay-2026-08-07'));

      expect(props.onDateChange).toHaveBeenCalledWith('2026-08-07');
    });

    it('stays silent when the selected day is pressed again', () => {
      const {getByTestId, props} = setupPicker();

      fireEvent.press(getByTestId(`weekDay-${TODAY}`));

      expect(props.onDateChange).not.toHaveBeenCalled();
    });

    it('ignores a day preceding the period', () => {
      const {getByTestId, props} = setupPicker();

      fireEvent.press(getByTestId('weekDay-2026-08-03'));

      expect(props.onDateChange).not.toHaveBeenCalled();
    });

    it('selects a non working day, which can still hold declared time', () => {
      const {getByTestId, props} = setupPicker({
        fillByDate: {'2026-08-08': {disabled: true}},
      });

      fireEvent.press(getByTestId('weekDay-2026-08-08'));

      expect(props.onDateChange).toHaveBeenCalledWith('2026-08-08');
    });
  });

  describe('gauge', () => {
    it('draws a disc as soon as time is declared', () => {
      const {getByTestId} = setupPicker({
        fillByDate: {'2026-08-06': {ratio: 0.5}},
      });

      expect(getByTestId('weekDayFill-2026-08-06')).toBeTruthy();
    });

    it('grows the disc with the ratio', () => {
      const {getByTestId} = setupPicker({
        fillByDate: {'2026-08-06': {ratio: 0.5}, '2026-08-07': {ratio: 1}},
      });

      const half = getByTestId('weekDayFill-2026-08-06').props.style.width;
      const full = getByTestId('weekDayFill-2026-08-07').props.style.width;

      expect(half).toBeLessThan(full);
    });

    it('leaves the ring empty when nothing is declared', () => {
      const {queryByTestId} = setupPicker({
        fillByDate: {'2026-08-06': {ratio: 0}},
      });

      expect(queryByTestId('weekDayFill-2026-08-06')).toBeNull();
    });

    it('fills the ring when the expected time is unknown', () => {
      const {getByTestId} = setupPicker({
        fillByDate: {'2026-08-06': {filled: true}},
      });

      expect(getByTestId('weekDayFill-2026-08-06')).toBeTruthy();
    });

    it('draws a dot instead of a ring on a non working day', () => {
      const {queryByTestId} = setupPicker({
        fillByDate: {'2026-08-08': {disabled: true, ratio: 0}},
      });

      expect(queryByTestId('weekDayFill-2026-08-08')).toBeNull();
    });

    it('keeps a day outside the period quieter than a non working one', () => {
      const {getByTestId} = setupPicker({
        fillByDate: {
          '2026-08-08': {disabled: true, color: Colors.cautionColor},
        },
      });

      // 3 August precedes the period, 8 August is a declared non working day.
      const outOfPeriod = StyleSheet.flatten(
        getByTestId('weekDayDot-2026-08-03').props.style,
      );
      const nonWorking = StyleSheet.flatten(
        getByTestId('weekDayDot-2026-08-08').props.style,
      );

      expect(outOfPeriod.backgroundColor).toBe(
        Colors.secondaryColor.background,
      );
      expect(nonWorking.backgroundColor).toBe(Colors.cautionColor.background);
    });

    it('applies the colour carried by the day', () => {
      const {getByTestId} = setupPicker({
        fillByDate: {'2026-08-07': {ratio: 1, color: Colors.successColor}},
      });

      expect(
        getByTestId('weekDayFill-2026-08-07').props.style.backgroundColor,
      ).toBe(addOpacityToHex(Colors.successColor.background, 0.2));
    });

    it('highlights the column of the selected day', () => {
      const {getByTestId} = setupPicker();

      const selected = StyleSheet.flatten(
        getByTestId(`weekDay-${TODAY}`).props.style,
      );
      const other = StyleSheet.flatten(
        getByTestId('weekDay-2026-08-07').props.style,
      );

      expect(selected.backgroundColor).toBe(
        Colors.secondaryColor.background_light,
      );
      expect(other.backgroundColor).toBeUndefined();
    });
  });

  describe('paging', () => {
    it('keeps the weekday when swiping to the next week', () => {
      const {getByTestId, props} = setupPicker();

      // Thursday 6th -> Thursday 13th
      swipeToPage(getByTestId, 1);

      expect(props.onDateChange).toHaveBeenCalledWith('2026-08-13');
    });

    it('falls back to the first day of the period on the opening week', () => {
      const {getByTestId, props} = setupPicker({selectedDate: '2026-08-11'});

      // Tuesday 4th precedes the period, which starts on Wednesday 5th.
      swipeToPage(getByTestId, 0);

      expect(props.onDateChange).toHaveBeenCalledWith(FROM_DATE);
    });

    it('falls back to the last day of the period on the closing week', () => {
      const {getByTestId, props} = setupPicker({selectedDate: '2026-08-07'});

      // Friday 21st is past the period, which ends on Thursday 20th.
      swipeToPage(getByTestId, 2);

      expect(props.onDateChange).toHaveBeenCalledWith(TO_DATE);
    });

    it('stays silent when the settled page already holds the selection', () => {
      const {getByTestId, props} = setupPicker();

      swipeToPage(getByTestId, 0);

      expect(props.onDateChange).not.toHaveBeenCalled();
    });
  });

  describe('navigation', () => {
    it('moves the selection to the same weekday of the next week', () => {
      const {getByTestId, props} = setupPicker();

      // Thursday 6th -> Thursday 13th
      fireEvent.press(getByTestId('weekDayPickerNext'));

      expect(props.onDateChange).toHaveBeenCalledWith('2026-08-13');
    });

    it('moves the selection back to the previous week', () => {
      const {getByTestId, props} = setupPicker({selectedDate: '2026-08-13'});

      fireEvent.press(getByTestId('weekDayPickerPrevious'));

      expect(props.onDateChange).toHaveBeenCalledWith('2026-08-06');
    });

    it('disables the arrows on the bounds of the period', () => {
      const first = setupPicker();
      const last = setupPicker({selectedDate: '2026-08-19'});

      expect(
        first.getByTestId('weekDayPickerPrevious').props.accessibilityState
          .disabled,
      ).toBe(true);
      expect(
        last.getByTestId('weekDayPickerNext').props.accessibilityState.disabled,
      ).toBe(true);
    });

    it('offers to come back to today from another week', () => {
      const {getByTestId, props} = setupPicker({selectedDate: '2026-08-13'});

      fireEvent.press(getByTestId('weekDayPickerToday'));

      expect(props.onDateChange).toHaveBeenCalledWith(TODAY);
    });

    it('hides the shortcut when today is already selected', () => {
      const {queryByTestId} = setupPicker();

      expect(queryByTestId('weekDayPickerToday')).toBeNull();
    });

    it('hides the shortcut when today is outside the period', () => {
      const {queryByTestId} = setupPicker({
        fromDate: '2026-09-01',
        toDate: '2026-09-30',
        selectedDate: '2026-09-10',
      });

      expect(queryByTestId('weekDayPickerToday')).toBeNull();
    });

    it('renders no header when navigation is turned off', () => {
      const {queryByTestId} = setupPicker({showNavigation: false});

      expect(queryByTestId('weekDayPickerPrevious')).toBeNull();
    });
  });

  describe('period', () => {
    it('renders nothing when the period is reversed', () => {
      const {queryByTestId} = setupPicker({
        fromDate: TO_DATE,
        toDate: FROM_DATE,
      });

      expect(queryByTestId('weekDayPickerList')).toBeNull();
    });

    it('renders a single page for a period held in one week', () => {
      const {getByTestId} = setupPicker({
        fromDate: '2026-08-10',
        toDate: '2026-08-14',
        selectedDate: '2026-08-10',
      });

      expect(getByTestId('weekDayPickerList').props.data).toHaveLength(1);
    });
  });
});
