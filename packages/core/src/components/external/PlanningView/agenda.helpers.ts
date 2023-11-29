/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {formatTime, diffDate, sameDate, incrementDate} from '../../../utils';

export const EMPTY_TIME = '-';

export interface AgendaEvent {
  id: string;
  startDate: string;
  endDate: string;
  data: object | string | number;
}

export interface AgendaItem {
  id: string;
  date: string | Date;
  startHour?: string | Date;
  endHour?: string | Date;
  isFullDayEvent?: Boolean;
  data: object | string | number;
}

export function mapEntryToItem(
  agendaItem: AgendaEntry,
  itemList: AgendaItem[],
): AgendaItem {
  const itemId = agendaItem.name;
  return itemList.find((item: AgendaItem) => item.id === itemId);
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

function addDays(originDate, days) {
  var date = new Date(originDate);
  date.setDate(date.getDate() + days);
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

  dateArray.forEach((date: Date) => (agendaItems[formatDate(date)] = []));
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
    return (agendaSchedule[itemDate] = [...agendaSchedule[itemDate], item]);
  });
  return agendaSchedule;
}

export function getShortName(date, lang) {
  return new Intl.DateTimeFormat(lang, {weekday: 'short'}).format(date);
}

export function isToday(date) {
  const d = new Date(date);
  const today = new Date();
  return sameDate(d, today);
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
  const _endDate = new Date(event.endDate);

  if (sameDate(_startDate, _endDate)) {
    return [
      {
        id: event.id.toString(),
        date: event.endDate,
        startHour: formatTime(event.startDate, I18n.t('Base_TimeFormat')),
        endHour: formatTime(event.endDate, I18n.t('Base_TimeFormat')),
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
    date: event.endDate,
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
