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
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import {
  CalendarMonth,
  DAY_ROW_HEIGHT,
  getWeeksHeight,
  MAX_WEEKS_IN_MONTH,
  monthIndexOf,
} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {CalendarMonthTitle, CalendarWeekDays} from '../../molecules';
import AgendaMonth from './AgendaMonth';
import MonthList from './MonthList';
import {weekIndexOfDate} from './agenda-view.helpers';
import {useMonthPanelDrag} from './use-month-panel-drag';

interface MonthPanelProps {
  months: CalendarMonth[];
  itemsByMonth: Record<string, Record<string, any[]>>;
  selectedDate?: string;
  visibleMonthKey: string;
  todayDateString: string;
  firstDayOfWeek: number;
  isExpanded: boolean;
  translator: (key: string) => string;
  onToggle: () => void;
  onDayPress: (dateString: string) => void;
  onVisibleMonthChange: (monthKey: string) => void;
}

const HANDLE_HIT_SLOP = {top: 8, bottom: 8, left: 24, right: 24};

const COLLAPSED_WEEKS_HEIGHT = DAY_ROW_HEIGHT;
const EXPANDED_WEEKS_HEIGHT = getWeeksHeight(MAX_WEEKS_IN_MONTH);

const EMPTY_ITEMS: Record<string, any[]> = Object.freeze({});

const MonthPanel = ({
  months,
  itemsByMonth,
  selectedDate,
  visibleMonthKey,
  todayDateString,
  firstDayOfWeek,
  isExpanded,
  translator,
  onToggle,
  onDayPress,
  onVisibleMonthChange,
}: MonthPanelProps) => {
  const Colors = useThemeColor();

  const {progress, isDragging, panHandlers} = useMonthPanelDrag({
    isExpanded,
    travel: EXPANDED_WEEKS_HEIGHT - COLLAPSED_WEEKS_HEIGHT,
    onToggle,
  });

  const visibleIndex = useMemo(
    () => Math.max(monthIndexOf(months, `${visibleMonthKey}-01`), 0),
    [months, visibleMonthKey],
  );

  const visibleMonth = months[visibleIndex];

  const visibleWeekIndex = useMemo(
    () =>
      visibleMonth == null || selectedDate == null
        ? 0
        : weekIndexOfDate(visibleMonth, selectedDate),
    [selectedDate, visibleMonth],
  );

  const weeksClipStyle = useMemo(
    () => [
      styles.weeks,
      {
        height: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [COLLAPSED_WEEKS_HEIGHT, EXPANDED_WEEKS_HEIGHT],
        }),
      },
    ],
    [progress],
  );

  const weeksSlideStyle = useMemo(
    () => ({
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-visibleWeekIndex * DAY_ROW_HEIGHT, 0],
          }),
        },
      ],
    }),
    [progress, visibleWeekIndex],
  );

  const cardStyle = useMemo(
    () => ({
      backgroundColor: Colors.backgroundColor,
      shadowColor: Colors.secondaryColor.background,
    }),
    [Colors.backgroundColor, Colors.secondaryColor.background],
  );

  const handleStyle = useMemo(
    () => ({backgroundColor: Colors.secondaryColor.background}),
    [Colors.secondaryColor.background],
  );

  return (
    <View style={[styles.card, cardStyle]}>
      {isExpanded && !isDragging ? (
        <MonthList
          months={months}
          itemsByMonth={itemsByMonth}
          selectedDate={selectedDate}
          visibleMonthKey={visibleMonthKey}
          visibleIndex={visibleIndex}
          todayDateString={todayDateString}
          firstDayOfWeek={firstDayOfWeek}
          translator={translator}
          onDayPress={onDayPress}
          onVisibleMonthChange={onVisibleMonthChange}
        />
      ) : (
        visibleMonth != null && (
          <>
            <CalendarMonthTitle
              monthIndex={visibleMonth.monthIndex}
              year={visibleMonth.year}
              translator={translator}
            />
            <CalendarWeekDays
              firstDayOfWeek={firstDayOfWeek}
              translator={translator}
            />
            <Animated.View style={weeksClipStyle} testID="agendaMonthWeeksClip">
              <Animated.View style={weeksSlideStyle} testID="agendaMonthWeeks">
                <AgendaMonth
                  month={visibleMonth}
                  items={itemsByMonth[visibleMonth.monthKey] ?? EMPTY_ITEMS}
                  selectedDate={selectedDate}
                  todayDateString={todayDateString}
                  firstDayOfWeek={firstDayOfWeek}
                  showTitle={false}
                  showWeekDays={false}
                  translator={translator}
                  onDayPress={onDayPress}
                />
              </Animated.View>
            </Animated.View>
          </>
        )
      )}
      <View {...panHandlers}>
        <Pressable
          style={styles.handleContainer}
          onPress={onToggle}
          hitSlop={HANDLE_HIT_SLOP}
          testID="agendaMonthPanelToggle">
          <View style={[styles.handle, handleStyle]} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginBottom: 8,
    paddingTop: 4,
    borderRadius: 24,
    elevation: 3,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
  weeks: {
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
  },
});

export default MonthPanel;
