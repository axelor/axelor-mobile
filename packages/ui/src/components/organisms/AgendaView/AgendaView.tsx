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
import {
  buildMonths,
  DEFAULT_FIRST_DAY_OF_WEEK,
  monthIndexOf,
  sliceByMonth,
  toDateString,
} from '../../../utils';
import AgendaMonthSeparator from './AgendaMonthSeparator';
import AgendaDayRow from './AgendaDayRow';
import AgendaHeader from './AgendaHeader';
import MonthPanel from './MonthPanel';
import {
  buildDayWindow,
  DEFAULT_DAYS_AHEAD,
  shiftDate,
} from './agenda-view.helpers';
import {AgendaDay, ItemHours} from './types';

interface AgendaViewProps {
  itemsByDate?: Record<string, any[]>;
  selectedDate: string;
  onDateChange: (dateString: string) => void;
  onVisibleMonthChange?: (monthKey: string) => void;
  renderItem: (item: any) => React.ReactNode;
  getItemHours?: (item: any) => ItemHours;
  daysAhead?: number;
  monthsBefore?: number;
  monthsAfter?: number;
  firstDayOfWeek?: number;
  showNavigation?: boolean;
  showTodayButton?: boolean;
  filters?: React.ReactNode;
  headerLeft?: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  translator: (key: string) => string;
  style?: any;
}

const EMPTY_DATA: Record<string, any[]> = Object.freeze({});
const EMPTY_ITEMS: any[] = Object.freeze([]) as never[];
const VISIBLE_MONTH_DELAY = 300;
const viewabilityConfig = {itemVisiblePercentThreshold: 10};

const AgendaView = ({
  itemsByDate = EMPTY_DATA,
  selectedDate,
  onDateChange,
  onVisibleMonthChange,
  renderItem,
  getItemHours,
  daysAhead = DEFAULT_DAYS_AHEAD,
  monthsBefore = 12,
  monthsAfter = 12,
  firstDayOfWeek = DEFAULT_FIRST_DAY_OF_WEEK,
  showNavigation = true,
  showTodayButton = true,
  filters,
  headerLeft,
  refreshing = false,
  onRefresh,
  translator,
  style,
}: AgendaViewProps) => {
  const referenceDate = useRef(new Date());

  const todayDateString = useMemo(
    () => toDateString(referenceDate.current),
    [],
  );

  const months = useMemo(
    () =>
      buildMonths(
        referenceDate.current,
        monthsBefore,
        monthsAfter,
        firstDayOfWeek,
      ),
    [firstDayOfWeek, monthsAfter, monthsBefore],
  );

  const lastDate = useMemo(() => {
    const last = months[months.length - 1];

    return toDateString(new Date(last.year, last.monthIndex + 1, 0));
  }, [months]);

  const itemsByMonth = useMemo(
    () => sliceByMonth(itemsByDate, months, EMPTY_DATA),
    [itemsByDate, months],
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [extraDays, setExtraDays] = useState(0);
  const [visibleDate, setVisibleDate] = useState(selectedDate);
  const [visibleMonthKey, setVisibleMonthKey] = useState(() =>
    selectedDate.slice(0, 7),
  );

  useEffect(() => {
    setExtraDays(0);
    setVisibleDate(selectedDate);
    setVisibleMonthKey(selectedDate.slice(0, 7));
  }, [selectedDate]);

  const days = useMemo(
    () => buildDayWindow(selectedDate, daysAhead + extraDays, lastDate),
    [daysAhead, extraDays, lastDate, selectedDate],
  );

  const list = useRef<FlatList<AgendaDay>>(null);

  useEffect(() => {
    list.current?.scrollToOffset({offset: 0, animated: false});
  }, [selectedDate]);

  const onVisibleMonthChangeRef = useRef(onVisibleMonthChange);
  onVisibleMonthChangeRef.current = onVisibleMonthChange;

  useEffect(() => {
    const timeout = setTimeout(
      () => onVisibleMonthChangeRef.current?.(visibleMonthKey),
      VISIBLE_MONTH_DELAY,
    );

    return () => clearTimeout(timeout);
  }, [visibleMonthKey]);

  const focusOn = useCallback((dateString: string) => {
    setIsExpanded(false);
    setVisibleDate(dateString);
    setVisibleMonthKey(dateString.slice(0, 7));
  }, []);

  const handleDayPress = useCallback(
    (dateString: string) => {
      focusOn(dateString);
      onDateChange(dateString);
    },
    [focusOn, onDateChange],
  );

  const handleToggle = useCallback(() => {
    if (isExpanded) {
      focusOn(selectedDate);

      return;
    }

    setIsExpanded(true);
  }, [focusOn, isExpanded, selectedDate]);

  const handleVisibleMonthChange = useCallback(
    (monthKey: string) => setVisibleMonthKey(monthKey),
    [],
  );

  const handleEndReached = useCallback(() => {
    if (days.length > 0 && days[days.length - 1].dateString >= lastDate) return;

    setExtraDays(current => current + DEFAULT_DAYS_AHEAD);
  }, [days, lastDate]);

  const shift = useCallback(
    (dayOffset: number) => {
      const nextDate = shiftDate(selectedDate, dayOffset);

      if (monthIndexOf(months, nextDate) < 0) return;

      onDateChange(nextDate);
    },
    [months, onDateChange, selectedDate],
  );

  const goToPreviousWeek = useCallback(() => shift(-7), [shift]);

  const goToNextWeek = useCallback(() => shift(7), [shift]);

  const goToToday = useCallback(() => {
    focusOn(todayDateString);
    onDateChange(todayDateString);
  }, [focusOn, onDateChange, todayDateString]);

  const renderDay = useCallback(
    ({item, index}: {item: AgendaDay; index: number}) => (
      <View>
        {index > 0 && item.isFirstOfMonth && (
          <AgendaMonthSeparator
            monthKey={item.monthKey}
            translator={translator}
          />
        )}
        <AgendaDayRow
          dateString={item.dateString}
          dayNumber={item.dayNumber}
          dayIndex={item.dayIndex}
          isToday={item.dateString === todayDateString}
          items={itemsByDate[item.dateString] ?? EMPTY_ITEMS}
          renderItem={renderItem}
          getItemHours={getItemHours}
          translator={translator}
        />
      </View>
    ),
    [getItemHours, itemsByDate, renderItem, todayDateString, translator],
  );

  const keyExtractor = useCallback((item: AgendaDay) => item.dateString, []);

  const emitVisibleDay = useRef<((items: ViewToken[]) => void) | undefined>(
    undefined,
  );

  emitVisibleDay.current = (viewableItems: ViewToken[]) => {
    const dateString = (viewableItems[0]?.item as AgendaDay)?.dateString;

    if (dateString == null || dateString === visibleDate) return;

    setVisibleDate(dateString);

    const monthKey = dateString.slice(0, 7);

    if (monthKey !== visibleMonthKey) setVisibleMonthKey(monthKey);
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged: ({viewableItems}: {viewableItems: ViewToken[]}) =>
        emitVisibleDay.current?.(viewableItems),
    },
  ]);

  return (
    <View style={[styles.container, style]}>
      <AgendaHeader
        filters={filters}
        headerLeft={headerLeft}
        showNavigation={showNavigation}
        showTodayButton={showTodayButton}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onToday={goToToday}
      />
      <MonthPanel
        months={months}
        itemsByMonth={itemsByMonth}
        selectedDate={visibleDate}
        visibleMonthKey={visibleMonthKey}
        todayDateString={todayDateString}
        firstDayOfWeek={firstDayOfWeek}
        isExpanded={isExpanded}
        translator={translator}
        onToggle={handleToggle}
        onDayPress={handleDayPress}
        onVisibleMonthChange={handleVisibleMonthChange}
      />
      <FlatList
        ref={list}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={days}
        renderItem={renderDay}
        keyExtractor={keyExtractor}
        initialNumToRender={7}
        maxToRenderPerBatch={7}
        windowSize={5}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        testID="agendaDayList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
});

export default AgendaView;
