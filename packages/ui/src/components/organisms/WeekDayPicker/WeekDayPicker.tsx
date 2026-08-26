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

import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {formatDateRange, getWeekDayKeys, toDateString} from '../../../utils';
import {Color, useThemeColor} from '../../../theme';
import {CircleButton} from '../../molecules';
import {Text} from '../../atoms';
import WeekRow from './WeekRow';
import {
  buildWeeks,
  DayFill,
  DEFAULT_FIRST_DAY_OF_WEEK,
  sameWeekDayIn,
  sliceFillsByWeek,
  weekIndexOf,
  WeekPage,
} from './week-day.helpers';

interface WeekDayPickerProps {
  fromDate?: string;
  toDate?: string;
  selectedDate?: string;
  onDateChange: (dateString: string) => void;
  fillByDate?: Record<string, DayFill>;
  firstDayOfWeek?: number;
  color?: Color;
  showNavigation?: boolean;
  showTodayButton?: boolean;
  translator: (key: string) => string;
  style?: any;
}

const EMPTY_FILL_BY_DATE = {};

const WeekDayPicker = ({
  fromDate,
  toDate,
  selectedDate,
  onDateChange,
  fillByDate = EMPTY_FILL_BY_DATE,
  firstDayOfWeek = DEFAULT_FIRST_DAY_OF_WEEK,
  color,
  showNavigation = true,
  showTodayButton = true,
  translator,
  style,
}: WeekDayPickerProps) => {
  const Colors = useThemeColor();
  const {width: pageWidth} = useWindowDimensions();

  const weeks = useMemo(
    () => buildWeeks(fromDate, toDate, firstDayOfWeek),
    [firstDayOfWeek, fromDate, toDate],
  );

  const fillsByWeek = useMemo(
    () => sliceFillsByWeek(fillByDate, weeks),
    [fillByDate, weeks],
  );

  const dayLabels = useMemo(
    () => getWeekDayKeys(firstDayOfWeek).map(key => translator(key)),
    [firstDayOfWeek, translator],
  );

  const todayDateString = useMemo(() => toDateString(new Date()), []);

  const defaultColor = useMemo(
    () => color ?? Colors.primaryColor,
    [Colors.primaryColor, color],
  );

  const initialIndex = useMemo(() => {
    const index = weekIndexOf(weeks, selectedDate);

    return index < 0 ? 0 : index;
    // Read on mount only, so it must not follow the selection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeks]);

  const visibleIndexRef = useRef(initialIndex);
  const listRef = useRef<FlatList<WeekPage>>(null);

  const weeksRef = useRef(weeks);
  weeksRef.current = weeks;

  const selectedDateRef = useRef(selectedDate);
  selectedDateRef.current = selectedDate;

  const onDateChangeRef = useRef(onDateChange);
  onDateChangeRef.current = onDateChange;

  const firstDayOfWeekRef = useRef(firstDayOfWeek);
  firstDayOfWeekRef.current = firstDayOfWeek;

  useEffect(() => {
    const index = weekIndexOf(weeks, selectedDate);

    if (index >= 0 && index !== visibleIndexRef.current) {
      visibleIndexRef.current = index;
      listRef.current?.scrollToIndex({index, animated: true});
    }
  }, [selectedDate, weeks]);

  const handleDayPress = useCallback((dateString: string) => {
    if (dateString !== selectedDateRef.current) {
      onDateChangeRef.current(dateString);
    }
  }, []);

  // The selection follows the swipe so the details below always describe a
  // day the strip still shows.
  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (pageWidth <= 0) return;

      const index = Math.round(event.nativeEvent.contentOffset.x / pageWidth);

      if (index === visibleIndexRef.current) return;

      visibleIndexRef.current = index;

      const nextDate = sameWeekDayIn(
        weeksRef.current[index],
        selectedDateRef.current!,
        firstDayOfWeekRef.current,
      );

      if (nextDate != null && nextDate !== selectedDateRef.current) {
        onDateChangeRef.current(nextDate);
      }
    },
    [pageWidth],
  );

  const getItemLayout = useCallback(
    (_data: any, index: number) => ({
      length: pageWidth,
      offset: pageWidth * index,
      index,
    }),
    [pageWidth],
  );

  const renderItem = useCallback(
    ({item, index}: {item: WeekPage; index: number}) => (
      <WeekRow
        week={item}
        fills={fillsByWeek[index]}
        dayLabels={dayLabels}
        selectedDate={selectedDate}
        todayDateString={todayDateString}
        defaultColor={defaultColor}
        pageWidth={pageWidth}
        onDayPress={handleDayPress}
      />
    ),
    [
      dayLabels,
      defaultColor,
      fillsByWeek,
      handleDayPress,
      pageWidth,
      selectedDate,
      todayDateString,
    ],
  );

  const visibleIndex = weekIndexOf(weeks, selectedDate);
  const visibleWeek = weeks[visibleIndex];

  const todayIndex = weekIndexOf(weeks, todayDateString);
  const isTodayReachable =
    showTodayButton && todayIndex >= 0 && todayDateString !== selectedDate;

  const shiftWeek = useCallback((weekOffset: number) => {
    const week =
      weeksRef.current[
        weekIndexOf(weeksRef.current, selectedDateRef.current) + weekOffset
      ];

    if (week == null) return;

    const nextDate = sameWeekDayIn(
      week,
      selectedDateRef.current!,
      firstDayOfWeekRef.current,
    );

    if (nextDate != null) onDateChangeRef.current(nextDate);
  }, []);

  const goToPreviousWeek = useCallback(() => shiftWeek(-1), [shiftWeek]);
  const goToNextWeek = useCallback(() => shiftWeek(1), [shiftWeek]);
  const goToToday = useCallback(
    () => onDateChangeRef.current(todayDateString),
    [todayDateString],
  );

  if (weeks.length === 0) return null;

  return (
    <View style={style}>
      {showNavigation && visibleWeek != null && (
        <View style={styles.header}>
          <CircleButton
            testID="weekDayPickerPrevious"
            style={styles.headerButton}
            iconName="chevron-left"
            size={26}
            disabled={visibleIndex <= 0}
            onPress={goToPreviousWeek}
          />
          <Text style={styles.headerLabel} writingType="important">
            {formatDateRange(
              visibleWeek.days[0].dateString,
              visibleWeek.days[6].dateString,
              translator,
            )}
          </Text>
          <CircleButton
            testID="weekDayPickerNext"
            style={styles.headerButton}
            iconName="chevron-right"
            size={26}
            disabled={visibleIndex >= weeks.length - 1}
            onPress={goToNextWeek}
          />
          {isTodayReachable && (
            <CircleButton
              testID="weekDayPickerToday"
              style={styles.todayButton}
              iconName="calendar-event"
              size={26}
              onPress={goToToday}
            />
          )}
        </View>
      )}
      <FlatList
        ref={listRef}
        data={weeks}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialIndex}
        onMomentumScrollEnd={handleMomentumEnd}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        windowSize={3}
        testID="weekDayPickerList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  headerButton: {
    marginVertical: 0,
  },
  headerLabel: {
    textAlign: 'center',
  },
  todayButton: {
    marginVertical: 0,
    position: 'absolute',
    right: 8,
  },
});

export default WeekDayPicker;
