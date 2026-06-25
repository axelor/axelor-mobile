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

import {SettingsItems, BaseSettingsItem} from './types';

export class SettingsHelper {
  static filterItems = (config: SettingsItems): SettingsItems => {
    return {
      switchItems: config.switchItems
        ?.filter(item => item.showIf !== false)
        .sort((a, b) => a.order! - b.order!),
      pickerItems: config.pickerItems
        ?.filter(item => item.showIf !== false)
        .sort((a, b) => a.order! - b.order!),
      buttonItems: config.buttonItems
        ?.filter(item => item.showIf !== false)
        .sort((a, b) => a.order! - b.order!),
    };
  };

  static registerItem<T extends BaseSettingsItem>(allItems: T[], item: T): T[] {
    if (item == null || item.key == null) return allItems;

    const index = allItems.findIndex(e => e.key === item.key);
    if (index !== -1) {
      return allItems.map((_i, _idx) =>
        _idx === index ? ({..._i, ...item} as T) : _i,
      );
    } else {
      return [
        ...allItems,
        {...item, order: item.order ?? (allItems.length + 1) * 10},
      ];
    }
  }
}
