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

function removeItemsInterval(
  items: any[],
  fromDate: string,
  toDate: string,
  fieldName: string,
) {
  if (fromDate == null || toDate == null || fieldName == null) {
    return items;
  }

  return items.filter(
    _i => _i[fieldName] <= fromDate || _i[fieldName] >= toDate,
  );
}

export function updateAgendaItems(
  previousData: any[],
  payload: any[],
  options: {
    searchDates?: {
      fromDate: string;
      toDate: string;
      fieldName: string;
    };
  } = {},
) {
  if (payload == null && options?.searchDates == null) {
    return previousData;
  }

  const {fromDate, toDate, fieldName} = options.searchDates ?? {};
  const oldItems = removeItemsInterval(
    previousData,
    fromDate,
    toDate,
    fieldName,
  );

  const allData = [...(payload ?? []), ...oldItems].filter(
    (item, idx, self) => idx === self.findIndex(_i => _i.id === item.id),
  );

  return allData;
}
