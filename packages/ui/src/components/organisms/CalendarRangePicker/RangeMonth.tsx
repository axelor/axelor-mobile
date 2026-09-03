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
import {Color} from '../../../theme';
import {CalendarMonthGrid} from '../../molecules';
import DayCell from './DayCell';
import {hasEvents, isInRange} from './calendar-range.helpers';
import {DayMark} from './types';

interface RangeMonthProps {
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

const RangeMonth = ({
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
}: RangeMonthProps) => {
  const renderDay = useCallback(
    (day: CalendarDay) => (
      <DayCell
        dateString={day.dateString}
        dayNumber={day.dayNumber}
        isWeekEnd={day.isWeekEnd}
        isSelected={isInRange(day.dateString, selectionStart, selectionEnd)}
        isToday={day.dateString === todayDateString}
        isDisabled={disabledDates[day.dateString] != null}
        hasEvents={hasEvents(marks[day.dateString])}
        disabledColor={disabledDates[day.dateString] ?? disabledColor}
        morningColor={marks[day.dateString]?.morningColor}
        afternoonColor={marks[day.dateString]?.afternoonColor}
        onPress={onDayPress}
      />
    ),
    [
      disabledColor,
      disabledDates,
      marks,
      onDayPress,
      selectionEnd,
      selectionStart,
      todayDateString,
    ],
  );

  return (
    <CalendarMonthGrid
      month={month}
      firstDayOfWeek={firstDayOfWeek}
      renderDay={renderDay}
      translator={translator}
    />
  );
};

export default memo(RangeMonth);
