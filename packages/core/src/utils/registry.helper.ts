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

export interface RegistrableItem {
  key: string;
  order?: number;
  showIf?: boolean;
}

export class RegistryHelper {
  static registerItem<T extends RegistrableItem>(allItems: T[], item: T): T[] {
    if (item == null || item.key == null) return allItems;

    const index = allItems.findIndex(_i => _i.key === item.key);
    if (index !== -1) {
      return allItems.map((_i, _idx) =>
        _idx === index ? ({..._i, ...item} as T) : _i,
      );
    }

    return [
      ...allItems,
      {...item, order: item.order ?? (allItems.length + 1) * 10},
    ];
  }

  static sortAndFilter<T extends RegistrableItem>(allItems: T[]): T[] {
    return allItems
      ?.filter(_i => _i.showIf !== false)
      .sort((a, b) => a.order! - b.order!);
  }
}
