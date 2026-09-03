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

import React, {memo, useCallback} from 'react';
import {CalendarDay, CalendarMonth} from '../../../utils';
import {CalendarMonthGrid} from '../../molecules';
import AgendaDayCell from './AgendaDayCell';

interface AgendaMonthProps {
  month: CalendarMonth;
  items: Record<string, any[]>;
  selectedDate?: string;
  todayDateString: string;
  firstDayOfWeek: number;
  visibleWeekIndex?: number;
  showTitle?: boolean;
  showWeekDays?: boolean;
  translator: (key: string) => string;
  onDayPress: (dateString: string) => void;
}

const AgendaMonth = ({
  month,
  items,
  selectedDate,
  todayDateString,
  firstDayOfWeek,
  visibleWeekIndex,
  showTitle,
  showWeekDays,
  translator,
  onDayPress,
}: AgendaMonthProps) => {
  const renderDay = useCallback(
    (day: CalendarDay) => (
      <AgendaDayCell
        dateString={day.dateString}
        dayNumber={day.dayNumber}
        isWeekEnd={day.isWeekEnd}
        isOutOfMonth={day.isOutOfMonth}
        isSelected={day.dateString === selectedDate}
        isToday={day.dateString === todayDateString}
        hasItems={items[day.dateString]?.length > 0}
        onPress={onDayPress}
      />
    ),
    [items, onDayPress, selectedDate, todayDateString],
  );

  return (
    <CalendarMonthGrid
      month={month}
      firstDayOfWeek={firstDayOfWeek}
      renderDay={renderDay}
      visibleWeekIndex={visibleWeekIndex}
      showExtraDays
      showTitle={showTitle}
      showWeekDays={showWeekDays}
      translator={translator}
    />
  );
};

export default memo(AgendaMonth);
