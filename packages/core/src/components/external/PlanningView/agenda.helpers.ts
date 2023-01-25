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

export interface AgendaItem {
  id: number;
  date: string | Date;
  [objectKey: string]: object | string | number;
}

export function mapEntryToItem(
  agendaItem: AgendaEntry,
  itemList: AgendaItem[],
): AgendaItem {
  const itemId = parseInt(agendaItem.name, 10);
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

function sameDate(date1: Date, date2: Date) {
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  ) {
    return true;
  }

  return false;
}

export function isToday(date) {
  const d = new Date(date);
  const today = new Date();
  return sameDate(d, today);
}
