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

import {ISODateTimeToDate} from '@axelor/aos-mobile-core';
import {
  Color,
  DayMark,
  fromDateString,
  toDateString,
} from '@axelor/aos-mobile-ui';

const MORNING = 1;
const AFTERNOON = 2;

const applyHalves = (
  marks: Record<string, DayMark>,
  dateString: string,
  leave: any,
  color: Color,
  fillMorning: boolean,
  fillAfternoon: boolean,
): void => {
  const previous = marks[dateString];
  const events = previous?.events ?? [];

  marks[dateString] = {
    morningColor: fillMorning
      ? (previous?.morningColor ?? color)
      : previous?.morningColor,
    afternoonColor: fillAfternoon
      ? (previous?.afternoonColor ?? color)
      : previous?.afternoonColor,
    events: events.some(({id}) => id === leave?.id)
      ? events
      : [...events, leave],
  };
};

export const buildMarksByDate = (
  leaveList: any[],
  getColor: (statusSelect: number) => Color,
): Record<string, DayMark> => {
  const marks: Record<string, DayMark> = {};

  if (!Array.isArray(leaveList)) return marks;

  leaveList.forEach(leave => {
    const firstDateString = ISODateTimeToDate(leave?.fromDateT);
    const lastDateString = ISODateTimeToDate(leave?.toDateT);

    if (firstDateString == null || lastDateString == null) return;

    const color = getColor(leave?.statusSelect);
    const startsInAfternoon = leave?.startOnSelect === AFTERNOON;
    const endsInMorning = leave?.endOnSelect === MORNING;

    if (firstDateString === lastDateString) {
      applyHalves(
        marks,
        firstDateString,
        leave,
        color,
        !startsInAfternoon,
        !endsInMorning,
      );

      return;
    }

    const lastDate = fromDateString(lastDateString);
    const currentDate = fromDateString(firstDateString);

    while (currentDate <= lastDate) {
      const dateString = toDateString(currentDate);
      const isFirstDay = dateString === firstDateString;
      const isLastDay = dateString === lastDateString;

      applyHalves(
        marks,
        dateString,
        leave,
        color,
        !(isFirstDay && startsInAfternoon),
        !(isLastDay && endsInMorning),
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return marks;
};
