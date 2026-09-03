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

import {toDateString} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '../../../i18n';
import {
  formatTime,
  sameDate,
  incrementDate,
  isMidnightDate,
  decreaseDate,
} from '../../../utils';

export const EMPTY_TIME = '-';

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MINUTES_IN_DAY = 24 * 60;

const atMidnight = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const calendarDayCount = (startDate: Date, endDate: Date): number =>
  Math.round(
    (atMidnight(endDate).getTime() - atMidnight(startDate).getTime()) /
      MS_IN_DAY,
  ) + 1;

const coversFullDay = (startDate: string, endDate: string): boolean => {
  if (!isMidnightDate(startDate)) return false;

  const minutes =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 60_000;

  return minutes >= MINUTES_IN_DAY - 1;
};

export interface AgendaEvent {
  id: string;
  startDate: string;
  endDate: string;
  data: object | string | number;
}

export interface AgendaItem {
  id: string;
  date: string | Date;
  startHour?: string;
  endHour?: string;
  isFullDayEvent?: boolean;
  data: object | string | number;
}

export const createAgendaItems = (
  list: AgendaEvent[],
  I18n: TranslatorProps,
): any[] => {
  if (list == null || list.length === 0) {
    return [];
  }

  const agendaItems: any[] = [];

  list.forEach(_e => {
    const items = createAgendaItem(_e, I18n);
    agendaItems.push(...items);
  });

  return agendaItems;
};

const createAgendaItem = (
  event: AgendaEvent,
  I18n: TranslatorProps,
): AgendaItem[] => {
  const _startDate = new Date(event.startDate);
  const _endDate = isMidnightDate(event.endDate)
    ? decreaseDate(new Date(event.endDate), 1)
    : new Date(event.endDate);

  if (_endDate < _startDate) {
    return [];
  }

  if (sameDate(_startDate, _endDate)) {
    return [
      {
        id: event.id.toString(),
        date: _endDate,
        startHour: formatTime(event.startDate, I18n.t('Base_TimeFormat')),
        endHour: formatTime(event.endDate, I18n.t('Base_TimeFormat')),
        isFullDayEvent: coversFullDay(event.startDate, event.endDate),
        data: event.data,
      },
    ];
  }

  return createMultiDayAgendaItems(event, _startDate, _endDate, I18n);
};

const createMultiDayAgendaItems = (
  event: AgendaEvent,
  startDate: Date,
  endDate: Date,
  I18n: TranslatorProps,
): AgendaItem[] => {
  const agendaItems = [];

  agendaItems.push({
    id: `${event.id}_${1}`,
    date: event.startDate,
    data: event.data,
    startHour: formatTime(event.startDate, I18n.t('Base_TimeFormat')),
    endHour: EMPTY_TIME,
  });

  const dayCount = calendarDayCount(startDate, endDate);

  for (let d = 1; d <= dayCount - 2; d++) {
    agendaItems.push({
      id: `${event.id}_${d + 1}`,
      date: incrementDate(startDate, d).toISOString(),
      isFullDayEvent: true,
      data: event.data,
    });
  }

  agendaItems.push({
    id: `${event.id}_${dayCount}`,
    date: endDate,
    data: event.data,
    startHour: EMPTY_TIME,
    endHour: formatTime(event.endDate, I18n.t('Base_TimeFormat')),
  });

  return agendaItems;
};

export const shouldRenderDetailsCard = (event: AgendaItem) => {
  const {date, startHour, endHour, isFullDayEvent} = event;

  const today = new Date();
  const eventDate = new Date(date);
  const isFirstItemOfEvent = startHour !== EMPTY_TIME && endHour === EMPTY_TIME;
  const isLastItemOfEvent = startHour === EMPTY_TIME && endHour !== EMPTY_TIME;
  const isDayEvent =
    !isFullDayEvent && !isFirstItemOfEvent && !isLastItemOfEvent;

  return (
    sameDate(today, new Date(date)) ||
    (isFirstItemOfEvent && eventDate >= today) ||
    (isLastItemOfEvent && eventDate <= today) ||
    isDayEvent
  );
};

export const groupItemsByDate = (
  items: AgendaItem[],
): Record<string, AgendaItem[]> => {
  const result: Record<string, AgendaItem[]> = {};

  items.forEach(item => {
    const dateString = toDateString(new Date(item.date));

    if (result[dateString] == null) {
      result[dateString] = [];
    }

    result[dateString].push(item);
  });

  Object.values(result).forEach(dayItems =>
    dayItems.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    ),
  );

  return result;
};
