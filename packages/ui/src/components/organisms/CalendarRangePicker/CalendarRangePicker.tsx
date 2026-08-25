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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import {Color} from '../../../theme';
import CalendarLegend, {CalendarLegendItem} from './CalendarLegend';
import CalendarDaySheet from './CalendarDaySheet';
import MonthGrid from './MonthGrid';
import {
  applyDayPress,
  buildMonths,
  clampRange,
  CalendarMonth,
  DateRange,
  DayMark,
  getMonthSelection,
  hasEvents,
  isDayFull,
  sliceDisabledByMonth,
  sliceMarksByMonth,
  toDateString,
} from './calendar-range.helpers';

interface CalendarRangePickerProps {
  selection: DateRange;
  onSelectionChange: (selection: DateRange) => void;
  marksByDate?: Record<string, DayMark>;
  disabledDates?: Record<string, Color>;
  monthsBefore?: number;
  monthsAfter?: number;
  firstDayOfWeek?: number;
  disabledColor: Color;
  disabledTitle?: string;
  legendItems?: CalendarLegendItem[];
  showTodayButton?: boolean;
  renderEvent?: (event: any, closeSheet: () => void) => React.ReactNode;
  disableFullDaySelection?: boolean;
  translator: (key: string) => string;
  onVisibleRangeChange?: (range: {fromDate: string; toDate: string}) => void;
  style?: any;
}

const EMPTY_DATA = {};

const viewabilityConfig = {itemVisiblePercentThreshold: 10};

const VISIBLE_RANGE_DELAY = 300;

const CalendarRangePicker = ({
  selection,
  onSelectionChange,
  marksByDate = EMPTY_DATA,
  disabledDates = EMPTY_DATA,
  monthsBefore = 12,
  monthsAfter = 12,
  firstDayOfWeek = 1,
  disabledColor,
  disabledTitle,
  legendItems,
  showTodayButton = true,
  renderEvent,
  disableFullDaySelection = true,
  translator,
  onVisibleRangeChange,
  style,
}: CalendarRangePickerProps) => {
  const referenceDate = useRef(new Date());

  const todayDateString = useMemo(
    () => toDateString(referenceDate.current),
    [],
  );

  const {months, offsets} = useMemo(
    () =>
      buildMonths(
        referenceDate.current,
        monthsBefore,
        monthsAfter,
        firstDayOfWeek,
      ),
    [firstDayOfWeek, monthsAfter, monthsBefore],
  );

  const marksByMonth = useMemo(
    () => sliceMarksByMonth(marksByDate, months),
    [marksByDate, months],
  );

  const disabledByMonth = useMemo(
    () => sliceDisabledByMonth(disabledDates, months),
    [disabledDates, months],
  );

  const selectionRef = useRef(selection);
  selectionRef.current = selection;

  const [sheetDate, setSheetDate] = useState<string | undefined>();

  const marksRef = useRef(marksByDate);
  marksRef.current = marksByDate;

  const disabledRef = useRef(disabledDates);
  disabledRef.current = disabledDates;

  const applySelection = useCallback(
    (dateString: string) => {
      const range = applyDayPress(dateString, selectionRef.current);

      onSelectionChange(
        disableFullDaySelection
          ? clampRange(range, _date => isDayFull(marksRef.current?.[_date]))
          : range,
      );
    },
    [disableFullDaySelection, onSelectionChange],
  );

  const handleDayPress = useCallback(
    (dateString: string) => {
      const mark = marksRef.current?.[dateString];

      if (hasEvents(mark) && renderEvent != null) {
        setSheetDate(dateString);

        return;
      }

      if (disableFullDaySelection && isDayFull(mark)) return;

      applySelection(dateString);
    },
    [applySelection, disableFullDaySelection, renderEvent],
  );

  const closeSheet = useCallback(() => setSheetDate(undefined), []);

  const handleSheetSelect = useCallback(
    () => applySelection(sheetDate!),
    [applySelection, sheetDate],
  );

  const sheetMark = sheetDate == null ? undefined : marksByDate?.[sheetDate];

  const isSheetDayBookable =
    sheetDate != null && disabledDates?.[sheetDate] == null;

  const renderItem = useCallback(
    ({item}: {item: CalendarMonth}) => {
      const monthSelection = getMonthSelection(item, selection);

      return (
        <MonthGrid
          month={item}
          marks={marksByMonth[item.monthKey]}
          disabledDates={disabledByMonth[item.monthKey]}
          selectionStart={monthSelection.startDate}
          selectionEnd={monthSelection.endDate}
          todayDateString={todayDateString}
          firstDayOfWeek={firstDayOfWeek}
          disabledColor={disabledColor}
          translator={translator}
          onDayPress={handleDayPress}
        />
      );
    },
    [
      disabledByMonth,
      firstDayOfWeek,
      handleDayPress,
      marksByMonth,
      disabledColor,
      selection,
      todayDateString,
      translator,
    ],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: months[index].height,
      offset: offsets[index],
      index,
    }),
    [months, offsets],
  );

  const keyExtractor = useCallback((item: CalendarMonth) => item.key, []);

  const list = useRef<FlatList<CalendarMonth>>(null);

  const todayIndex = useMemo(
    () =>
      months.findIndex(
        ({monthKey}) => monthKey === todayDateString.slice(0, 7),
      ),
    [months, todayDateString],
  );

  const _legendItems = useMemo(() => {
    if (disabledTitle == null) return legendItems;

    return [
      ...(legendItems ?? []),
      {key: 'disabled', title: disabledTitle, color: disabledColor},
    ];
  }, [disabledColor, disabledTitle, legendItems]);

  const scrollToToday = useCallback(() => {
    if (todayIndex >= 0) {
      list.current?.scrollToIndex({index: todayIndex, animated: true});
    }
  }, [todayIndex]);

  const lastEmittedRange = useRef<string | undefined>(undefined);
  const emitTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(emitTimeout.current), []);

  const emitVisibleRange = useRef<((items: ViewToken[]) => void) | undefined>(
    undefined,
  );

  emitVisibleRange.current = (viewableItems: ViewToken[]) => {
    if (onVisibleRangeChange == null || viewableItems.length === 0) return;

    const indexes = viewableItems
      .map(({index}) => index)
      .filter(index => index != null) as number[];

    if (indexes.length === 0) return;

    const firstMonth = months[Math.max(Math.min(...indexes) - 1, 0)];
    const lastMonth =
      months[Math.min(Math.max(...indexes) + 1, months.length - 1)];

    const fromDate = `${firstMonth.monthKey}-01`;
    const toDate = toDateString(
      new Date(lastMonth.year, lastMonth.monthIndex + 1, 0),
    );
    const rangeKey = `${fromDate}_${toDate}`;

    if (rangeKey === lastEmittedRange.current) return;

    lastEmittedRange.current = rangeKey;

    clearTimeout(emitTimeout.current);
    emitTimeout.current = setTimeout(
      () => onVisibleRangeChange({fromDate, toDate}),
      VISIBLE_RANGE_DELAY,
    );
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged: ({viewableItems}: {viewableItems: ViewToken[]}) =>
        emitVisibleRange.current?.(viewableItems),
    },
  ]);

  return (
    <View style={[styles.container, style]}>
      <CalendarLegend
        items={_legendItems}
        showTodayButton={showTodayButton}
        translator={translator}
        onTodayPress={scrollToToday}
      />
      <FlatList
        ref={list}
        data={months}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialScrollIndex={monthsBefore}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={5}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        testID="calendarRangePickerList"
      />
      <CalendarDaySheet
        dateString={sheetDate}
        events={sheetMark?.events}
        canSelect={
          isSheetDayBookable &&
          (!disableFullDaySelection || !isDayFull(sheetMark))
        }
        translator={translator}
        renderEvent={renderEvent}
        onSelect={handleSheetSelect}
        onClose={closeSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default CalendarRangePicker;
