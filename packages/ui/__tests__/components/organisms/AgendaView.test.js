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
import {StyleSheet, Text, Text as RNText} from 'react-native';
import {act, fireEvent, within} from '@testing-library/react-native';
import {AgendaView, DAY_ROW_HEIGHT} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('AgendaView Component', () => {
  const Colors = getDefaultThemeColors();
  const TODAY = '2026-08-06';
  const VISIBLE_MONTH = '2026-08';
  const TODAY_WEEK_INDEX = 1;
  const FIRST_ROW_EXTRA_DAY = '2026-07-27';
  const LAST_ROW_EXTRA_DAY = '2026-07-31';

  const ITEMS_BY_DATE = {
    '2026-08-06': [{id: 1}, {id: 2}],
    '2026-08-17': [{id: 3}],
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 7, 6));
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  const setupAgenda = overrideProps =>
    setup({
      Component: AgendaView,
      baseProps: {
        itemsByDate: ITEMS_BY_DATE,
        selectedDate: TODAY,
        onDateChange: jest.fn(),
        renderItem: item => <Text>{`item-${item.id}`}</Text>,
        translator: key => key,
      },
      overrideProps,
    });

  const browseToMonth = (getByTestId, monthKey) => {
    const {data, viewabilityConfigCallbackPairs} =
      getByTestId('agendaMonthList').props;
    const index = data.findIndex(month => month.monthKey === monthKey);

    expect(index).toBeGreaterThanOrEqual(0);

    act(() => {
      viewabilityConfigCallbackPairs[0].onViewableItemsChanged({
        viewableItems: [
          {item: data[index], index, key: data[index].key, isViewable: true},
        ],
      });
    });
  };

  it('renders without crashing', () => {
    const {getByTestId} = setupAgenda();

    expect(getByTestId('agendaDayList')).toBeTruthy();
    expect(getByTestId('agendaMonthPanelToggle')).toBeTruthy();
  });

  it('anchors the day window on the selected date', () => {
    const {getByTestId} = setupAgenda();

    const {data} = getByTestId('agendaDayList').props;

    expect(data).toHaveLength(31);
    expect(data[0].dateString).toBe(TODAY);
  });

  it('restarts the day window when the anchor changes', () => {
    const {getByTestId, rerender} = setupAgenda();

    rerender({selectedDate: '2026-08-20'});

    expect(getByTestId('agendaDayList').props.data[0].dateString).toBe(
      '2026-08-20',
    );
  });

  it('never builds days beyond the end of the period', () => {
    const {getByTestId} = setupAgenda({
      monthsBefore: 0,
      monthsAfter: 0,
      selectedDate: '2026-08-20',
    });

    const {data} = getByTestId('agendaDayList').props;

    expect(data).toHaveLength(12);
    expect(data[data.length - 1].dateString).toBe('2026-08-31');
  });

  it('keeps a row for a day holding no item', () => {
    const {getByTestId, queryByText} = setupAgenda();

    expect(getByTestId('agendaRow-2026-08-07')).toBeTruthy();
    expect(queryByText('item-1')).toBeTruthy();
  });

  it('lays the hours of an item out beside its card', () => {
    const {getByText} = setupAgenda({
      getItemHours: item =>
        item.id === 1 ? {startHour: '09:00', endHour: '10:30'} : {},
    });

    expect(getByText('09:00')).toBeTruthy();
    expect(getByText('10:30')).toBeTruthy();
    expect(getByText('item-1')).toBeTruthy();
  });

  it('asks for no hours when the integrator declares none', () => {
    const {queryByText} = setupAgenda();

    expect(queryByText('09:00')).toBeNull();
    expect(queryByText('item-1')).toBeTruthy();
  });

  it('opens a month with its name in the flow of the list', () => {
    const {getByTestId} = setupAgenda({selectedDate: '2026-08-30'});

    expect(
      within(getByTestId('agendaDayList')).queryByText(
        'Base_MonthLong_September 2026',
      ),
    ).toBeTruthy();
  });

  it('opens no month above the first day of the list', () => {
    const {getByTestId} = setupAgenda({selectedDate: '2026-05-01'});

    expect(
      within(getByTestId('agendaDayList')).queryByText(
        'Base_MonthLong_May 2026',
      ),
    ).toBeNull();
    expect(getByTestId('agendaRow-2026-05-01')).toBeTruthy();
  });

  it('slides a single month inside the panel when collapsed', () => {
    const {getByTestId, queryByTestId} = setupAgenda();

    expect(getByTestId('agendaMonthWeeks')).toBeTruthy();
    expect(getByTestId(`agendaDay-${TODAY}`)).toBeTruthy();
    expect(queryByTestId('agendaMonthList')).toBeNull();
  });

  it('hands the months over to a scrollable list once expanded', () => {
    const {getByTestId, queryByTestId} = setupAgenda();

    fireEvent.press(getByTestId('agendaMonthPanelToggle'));

    expect(getByTestId('agendaMonthList')).toBeTruthy();
    expect(queryByTestId('agendaMonthWeeks')).toBeNull();
    expect(getByTestId('agendaDay-2026-08-17')).toBeTruthy();
  });

  it('marks the days holding items with a dot, and only those', () => {
    const {getByTestId, queryByTestId} = setupAgenda();

    expect(getByTestId(`agendaDayDot-${TODAY}`)).toBeTruthy();
    expect(queryByTestId('agendaDayDot-2026-08-07')).toBeNull();
  });

  it('highlights the visible date in the grid', () => {
    const {getByTestId, queryByTestId} = setupAgenda();

    expect(getByTestId(`agendaDaySelected-${TODAY}`)).toBeTruthy();
    expect(queryByTestId('agendaDaySelected-2026-08-07')).toBeNull();
  });

  it('re-anchors on the day pressed in the grid', () => {
    const onDateChange = jest.fn();
    const {getByTestId} = setupAgenda({onDateChange});

    fireEvent.press(getByTestId('agendaDay-2026-08-04'));

    expect(onDateChange).toHaveBeenCalledWith('2026-08-04');
  });

  it('shifts the anchor by one week with the navigation buttons', () => {
    const onDateChange = jest.fn();
    const {getByTestId} = setupAgenda({onDateChange});

    fireEvent.press(getByTestId('agendaNextWeek'));
    expect(onDateChange).toHaveBeenCalledWith('2026-08-13');

    fireEvent.press(getByTestId('agendaPreviousWeek'));
    expect(onDateChange).toHaveBeenCalledWith('2026-07-30');
  });

  it('brings the anchor back to today', () => {
    const onDateChange = jest.fn();
    const {getByTestId} = setupAgenda({
      selectedDate: '2026-08-20',
      onDateChange,
    });

    fireEvent.press(getByTestId('agendaToday'));

    expect(onDateChange).toHaveBeenCalledWith(TODAY);
  });

  it('refuses to shift the anchor outside the period', () => {
    const onDateChange = jest.fn();
    const {getByTestId} = setupAgenda({
      monthsBefore: 0,
      monthsAfter: 0,
      onDateChange,
    });

    fireEvent.press(getByTestId('agendaPreviousWeek'));

    expect(onDateChange).not.toHaveBeenCalled();
  });

  it('hides the navigation and today buttons on demand', () => {
    const {queryByTestId} = setupAgenda({
      showNavigation: false,
      showTodayButton: false,
    });

    expect(queryByTestId('agendaPreviousWeek')).toBeNull();
    expect(queryByTestId('agendaNextWeek')).toBeNull();
    expect(queryByTestId('agendaToday')).toBeNull();
  });

  it('announces the visible month once the emission has settled', () => {
    const onVisibleMonthChange = jest.fn();

    setupAgenda({onVisibleMonthChange});

    expect(onVisibleMonthChange).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onVisibleMonthChange).toHaveBeenCalledWith(VISIBLE_MONTH);
  });

  it('gives a month grid only the items of that month', () => {
    const {getByTestId, queryByTestId} = setupAgenda({
      monthsBefore: 0,
      monthsAfter: 1,
      selectedDate: '2026-09-05',
      itemsByDate: {...ITEMS_BY_DATE, '2026-09-05': [{id: 4}]},
    });

    expect(getByTestId('agendaDayDot-2026-09-05')).toBeTruthy();
    expect(queryByTestId('agendaDayDot-2026-09-06')).toBeNull();
  });

  it('renders the header slot given by the integrator', () => {
    const {queryByText} = setupAgenda({
      headerLeft: <Text>assignedFilter</Text>,
    });

    expect(queryByText('assignedFilter')).toBeTruthy();
  });

  it('closes the month grid when a day is picked', () => {
    const {getByTestId, queryByTestId} = setupAgenda();

    fireEvent.press(getByTestId('agendaMonthPanelToggle'));
    expect(getByTestId('agendaMonthList')).toBeTruthy();

    fireEvent.press(getByTestId('agendaDay-2026-08-17'));

    expect(queryByTestId('agendaMonthList')).toBeNull();
    expect(getByTestId('agendaMonthWeeks')).toBeTruthy();
  });

  it('closes the month grid when today is asked for', () => {
    const {getByTestId, queryByTestId} = setupAgenda({
      selectedDate: '2026-08-20',
    });

    fireEvent.press(getByTestId('agendaMonthPanelToggle'));
    fireEvent.press(getByTestId('agendaToday'));

    expect(queryByTestId('agendaMonthList')).toBeNull();
  });

  it('comes back to the selected date when the grid is closed without a pick', () => {
    const {getByTestId, queryByTestId} = setupAgenda();

    fireEvent.press(getByTestId('agendaMonthPanelToggle'));
    browseToMonth(getByTestId, '2026-10');

    fireEvent.press(getByTestId('agendaMonthPanelToggle'));

    expect(getByTestId(`agendaDay-${TODAY}`)).toBeTruthy();
    expect(queryByTestId('agendaDay-2026-10-01')).toBeNull();
    expect(queryByTestId('agendaDay-2026-10-15')).toBeNull();
  });

  it('comes back to the selected date when today is asked for mid-browsing', () => {
    const {getByTestId, queryByTestId} = setupAgenda();

    fireEvent.press(getByTestId('agendaMonthPanelToggle'));
    browseToMonth(getByTestId, '2026-10');

    fireEvent.press(getByTestId('agendaToday'));

    expect(getByTestId(`agendaDay-${TODAY}`)).toBeTruthy();
    expect(queryByTestId('agendaDay-2026-10-01')).toBeNull();
  });

  it('renders the filters and the navigation in a single header', () => {
    const {getByTestId, queryByText} = setupAgenda({
      filters: <Text>filtersSlot</Text>,
      headerLeft: <Text>assignedFilter</Text>,
    });

    const header = getByTestId('headerContainerWrapper');

    expect(queryByText('filtersSlot')).toBeTruthy();
    expect(queryByText('assignedFilter')).toBeTruthy();
    expect(header).toBeTruthy();
    expect(getByTestId('agendaToday')).toBeTruthy();
  });

  it('shows the days of the neighbouring months in the grid', () => {
    const {getByTestId} = setupAgenda({selectedDate: '2026-08-01'});

    expect(getByTestId('agendaDay-2026-08-01')).toBeTruthy();
    expect(getByTestId(`agendaExtraDay-${FIRST_ROW_EXTRA_DAY}`)).toBeTruthy();
    expect(getByTestId(`agendaExtraDay-${LAST_ROW_EXTRA_DAY}`)).toBeTruthy();
  });

  it('sets the text of a neighbouring day apart from the days of the month', () => {
    const {getByTestId} = setupAgenda({selectedDate: '2026-08-01'});

    const colorOf = testID =>
      StyleSheet.flatten(getByTestId(testID).findByType(RNText).props.style)
        .color;

    expect(colorOf(`agendaExtraDay-${LAST_ROW_EXTRA_DAY}`)).toBe(
      Colors.placeholderTextColor,
    );
    expect(colorOf('agendaDay-2026-08-04')).toBe(Colors.text);
  });

  it('anchors the planning on a neighbouring day that is pressed', () => {
    const onDateChange = jest.fn();
    const {getByTestId} = setupAgenda({
      selectedDate: '2026-08-01',
      onDateChange,
    });

    fireEvent.press(getByTestId(`agendaExtraDay-${LAST_ROW_EXTRA_DAY}`));

    expect(onDateChange).toHaveBeenCalledWith(LAST_ROW_EXTRA_DAY);
  });

  it('clips the weeks to one row and slides the selected week into it', () => {
    const {getByTestId} = setupAgenda();

    const clip = StyleSheet.flatten(
      getByTestId('agendaMonthWeeksClip').props.style,
    );
    const slide = StyleSheet.flatten(
      getByTestId('agendaMonthWeeks').props.style,
    );

    expect(clip.overflow).toBe('hidden');
    expect(clip.height).toBe(DAY_ROW_HEIGHT);
    expect(slide.transform).toEqual([
      {translateY: -TODAY_WEEK_INDEX * DAY_ROW_HEIGHT},
    ]);
  });

  it('keeps the month title and the week days out of the clipped area', () => {
    const {getByTestId, queryByText} = setupAgenda();

    const clipped = within(getByTestId('agendaMonthWeeksClip'));

    expect(queryByText('Base_MonthLong_August 2026')).toBeTruthy();
    expect(clipped.queryByText('Base_MonthLong_August 2026')).toBeNull();
    expect(clipped.queryByText('Base_Day_Mon')).toBeNull();
  });
});
