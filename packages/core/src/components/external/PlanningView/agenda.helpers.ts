/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import {TranslatorProps} from '../../../i18n';
import {
  formatTime,
  diffDate,
  sameDate,
  incrementDate,
  isMidnightDate,
  decreaseDate,
} from '../../../utils';

export const EMPTY_TIME = '-';
const START_OF_MONTH_DOTS = 'startOfMonth';

export const MONTHS = [
  'Base_MonthLong_January',
  'Base_MonthLong_February',
  'Base_MonthLong_March',
  'Base_MonthLong_April',
  'Base_MonthLong_May',
  'Base_MonthLong_June',
  'Base_MonthLong_July',
  'Base_MonthLong_August',
  'Base_MonthLong_September',
  'Base_MonthLong_October',
  'Base_MonthLong_November',
  'Base_MonthLong_December',
];

export const DAYS = [
  'Base_Day_Sun',
  'Base_Day_Mon',
  'Base_Day_Tue',
  'Base_Day_Wed',
  'Base_Day_Thu',
  'Base_Day_Fri',
  'Base_Day_Sat',
];

export interface AgendaEvent {
  id: string;
  startDate: string;
  endDate: string;
  data: object | string | number;
}

export interface AgendaItem {
  id: string;
  date: string | Date;
  isNewMonth?: boolean;
  startHour?: string | Date;
  endHour?: string | Date;
  isFullDayEvent?: Boolean;
  data: object | string | number;
}

export function mapEntryToItem(
  agendaItem: AgendaEntry,
  itemList: AgendaItem[],
): AgendaItem {
  const _item = itemList.find(
    (item: AgendaItem) => item.id === agendaItem.name,
  );

  return {
    id: agendaItem.name,
    date: agendaItem.day,
    data: {},
    ...(_item ?? {}),
    isNewMonth: agendaItem.name.includes(START_OF_MONTH_DOTS),
  };
}

function mapItemToEntry(item: AgendaItem): AgendaEntry {
  return {name: '' + item?.id, height: 80, day: (item?.date).toString()};
}

function mapItemListToEntryList(items: AgendaItem[]): AgendaEntry[] {
  return items.map(mapItemToEntry);
}

function formatDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function addDays(originDate: string | Date, days: number, resetTime = false) {
  var date = new Date(originDate);
  date.setDate(date.getDate() + days);

  if (resetTime) date.setHours(23, 59, 59, 999);

  return date;
}

function addMonths(originDate, months) {
  var date = new Date(originDate);
  date.setMonth(date.getMonth() + months);
  return date;
}

function getAllDates(startDate, stopDate) {
  var dateArray = [];
  const endDate = new Date(stopDate);
  var currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

function getAllDatesFromDate(monthsAroundDate: number, date: Date) {
  const startDate = addMonths(date, -monthsAroundDate);
  const stopDate = addMonths(date, monthsAroundDate);
  return getAllDates(startDate, stopDate);
}

function generateAgendaItems(monthsAroundDate): AgendaSchedule {
  const todayDate = new Date();
  const dateArray = getAllDatesFromDate(monthsAroundDate, todayDate);
  const agendaItems = {};

  dateArray.forEach((date: Date) => {
    if (isStartOfMonth(date)) {
      const _d = addDays(date, -1, true);

      agendaItems[formatDate(_d)] = [
        {
          day: _d,
          name: `${_d.getFullYear()}-${
            _d.getMonth() + 1
          }-${START_OF_MONTH_DOTS}`,
          height: undefined,
        },
      ];
    }

    agendaItems[formatDate(date)] = [];
  });

  return agendaItems;
}

export function createAgendaSchedule(
  items: AgendaItem[],
  monthsAroundDate: number,
) {
  const agendaSchedule = generateAgendaItems(monthsAroundDate);
  const agendaItems = mapItemListToEntryList(items);

  agendaItems.forEach((item: AgendaEntry) => {
    const itemDate = formatDate(new Date(item.day));
    return (agendaSchedule[itemDate] = [
      ...agendaSchedule[itemDate],
      item,
    ]).sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
  });

  return agendaSchedule;
}

export function getShortName(date: Date) {
  return DAYS[date.getDay()];
}

export function getMonthName(date: string | Date): string {
  const _d = addDays(date, 1);
  return MONTHS[_d.getMonth()];
}

export function isStartOfMonth(date: Date | string): boolean {
  const d = new Date(date);
  return d.getDate() === 1;
}

export const createAgendaItems = (
  list: AgendaEvent[],
  I18n: TranslatorProps,
): any[] => {
  if (list == null || list.length === 0) {
    return [];
  }

  const agendaItems = [];

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

  if (sameDate(_startDate, _endDate)) {
    return [
      {
        id: event.id.toString(),
        date: _endDate,
        startHour: formatTime(event.startDate, I18n.t('Base_TimeFormat')),
        endHour: formatTime(event.endDate, I18n.t('Base_TimeFormat')),
        isFullDayEvent:
          isMidnightDate(event.startDate) && isMidnightDate(event.endDate),
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

  const diffDays = diffDate(startDate, endDate);

  for (let d = 1; d < diffDays - 1; d++) {
    agendaItems.push({
      id: `${event.id}_${d + 1}`,
      date: incrementDate(startDate, d).toISOString(),
      isFullDayEvent: true,
      data: event.data,
    });
  }

  agendaItems.push({
    id: `${event.id}_${diffDays + 1}`,
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

export const filterMarkedDates = (agendaItems: AgendaSchedule) => {
  const nonTechnicalDates = Object.entries(agendaItems).map(([_d, items]) => {
    const _list = items.filter(({name}) => !name.includes(START_OF_MONTH_DOTS));

    return [_d, {marked: _list.length > 0}];
  });

  return Object.fromEntries(nonTechnicalDates);
};
