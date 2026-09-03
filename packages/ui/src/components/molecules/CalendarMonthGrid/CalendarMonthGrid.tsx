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
import {CalendarDay, CalendarMonth, DAY_ROW_HEIGHT} from '../../../utils';
import CalendarMonthTitle from './CalendarMonthTitle';
import CalendarWeekDays from './CalendarWeekDays';

interface CalendarMonthGridProps {
  month: CalendarMonth;
  firstDayOfWeek: number;
  renderDay: (day: CalendarDay) => React.ReactNode;
  visibleWeekIndex?: number;
  showExtraDays?: boolean;
  showTitle?: boolean;
  showWeekDays?: boolean;
  translator: (key: string) => string;
  style?: any;
}

const CalendarMonthGrid = ({
  month,
  firstDayOfWeek,
  renderDay,
  visibleWeekIndex,
  showExtraDays = false,
  showTitle = true,
  showWeekDays = true,
  translator,
  style,
}: CalendarMonthGridProps) => {
  const weeks = useMemo(
    () =>
      visibleWeekIndex == null
        ? month.weeks
        : month.weeks.slice(visibleWeekIndex, visibleWeekIndex + 1),
    [month.weeks, visibleWeekIndex],
  );

  return (
    <View style={style}>
      {showTitle && (
        <CalendarMonthTitle
          monthIndex={month.monthIndex}
          year={month.year}
          translator={translator}
        />
      )}
      {showWeekDays && (
        <CalendarWeekDays
          firstDayOfWeek={firstDayOfWeek}
          translator={translator}
        />
      )}
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.week}>
          {week.map((day, dayIndex) =>
            day.isOutOfMonth && !showExtraDays ? (
              <View key={dayIndex} style={styles.emptyCell} />
            ) : (
              <React.Fragment key={day.dateString}>
                {renderDay(day)}
              </React.Fragment>
            ),
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default memo(CalendarMonthGrid);
