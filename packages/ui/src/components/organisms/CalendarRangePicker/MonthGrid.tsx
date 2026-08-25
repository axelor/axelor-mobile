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

import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import DayCell from './DayCell';
import {
  CalendarMonth,
  DayMark,
  DAY_ROW_HEIGHT,
  getMonthTitleKey,
  getWeekDayKeys,
  hasEvents,
  isInRange,
  MONTH_TITLE_HEIGHT,
  WEEK_DAYS_ROW_HEIGHT,
} from './calendar-range.helpers';

interface MonthGridProps {
  month: CalendarMonth;
  marks: Record<string, DayMark>;
  disabledDates: Record<string, Color>;
  selectionStart?: string;
  selectionEnd?: string;
  todayDateString: string;
  firstDayOfWeek: number;
  disabledColor: Color;
  translator: (key: string) => string;
  onDayPress: (dateString: string) => void;
}

const MonthGrid = ({
  month,
  marks,
  disabledDates,
  selectionStart,
  selectionEnd,
  todayDateString,
  firstDayOfWeek,
  disabledColor,
  translator,
  onDayPress,
}: MonthGridProps) => {
  const Colors = useThemeColor();

  const weekDayLabels = useMemo(
    () => getWeekDayKeys(firstDayOfWeek).map(key => translator(key)),
    [firstDayOfWeek, translator],
  );

  const containerStyle = useMemo(
    () => ({height: month.height}),
    [month.height],
  );

  return (
    <View style={containerStyle}>
      <Text style={styles.title} writingType="title">
        {`${translator(getMonthTitleKey(month.monthIndex))} ${month.year}`}
      </Text>
      <View style={styles.weekDaysRow}>
        {weekDayLabels.map((label, index) => (
          <Text
            key={index}
            style={styles.weekDayLabel}
            textColor={Colors.placeholderTextColor}
            writingType="details">
            {label}
          </Text>
        ))}
      </View>
      {month.weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.week}>
          {week.map((day, dayIndex) =>
            day == null ? (
              <View key={dayIndex} style={styles.emptyCell} />
            ) : (
              <DayCell
                key={day.dateString}
                dateString={day.dateString}
                dayNumber={day.dayNumber}
                isWeekEnd={day.isWeekEnd}
                isSelected={isInRange(
                  day.dateString,
                  selectionStart,
                  selectionEnd,
                )}
                isToday={day.dateString === todayDateString}
                isDisabled={disabledDates[day.dateString] != null}
                hasEvents={hasEvents(marks[day.dateString])}
                disabledColor={disabledDates[day.dateString] ?? disabledColor}
                morningColor={marks[day.dateString]?.morningColor}
                afternoonColor={marks[day.dateString]?.afternoonColor}
                onPress={onDayPress}
              />
            ),
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    height: MONTH_TITLE_HEIGHT,
    lineHeight: MONTH_TITLE_HEIGHT,
    paddingHorizontal: 16,
  },
  weekDaysRow: {
    height: WEEK_DAYS_ROW_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  weekDayLabel: {
    flex: 1,
    textAlign: 'center',
  },
  week: {
    height: DAY_ROW_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  emptyCell: {
    flex: 1,
    height: DAY_ROW_HEIGHT,
  },
});

export default memo(MonthGrid);
