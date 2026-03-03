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

import {HeaderBandItem} from './types';

export class HeaderBandHelper {
  static bandHeight = 24;
  static filterBands = (allBands: HeaderBandItem[]): HeaderBandItem[] => {
    return allBands
      .filter(band => band.showIf)
      .sort((a, b) => a.order - b.order);
  };

  static registerHeaderBand(
    allBands: HeaderBandItem[],
    band: HeaderBandItem,
  ): HeaderBandItem[] {
    if (band == null || band.key == null) {
      return allBands;
    }

    const index = allBands.findIndex(e => e.key === band.key);
    if (index !== -1) {
      return allBands.map((item, i) =>
        i === index ? {...item, ...band} : item,
      );
    } else {
      return [
        ...allBands,
        {
          order: (allBands.length + 1) * 10,
          showIf: false,
          ...band,
        },
      ];
    }
  }
}
