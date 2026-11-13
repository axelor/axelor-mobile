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

import {formatNumber} from '@axelor/aos-mobile-ui';

const toFixedText = decimals => value => parseFloat(value).toFixed(decimals);

describe('formatNumber', () => {
  it.each([
    [703, '.', ',', 2, '703.00'],
    [144703, ',', ' ', 0, '144 703'],
    [1234567.5, '.', ',', 2, '1,234,567.50'],
    ['5000.5', '.', ',', 2, '5,000.50'],
  ])(
    'formats %p with "%s" and "%s" and %p decimals as %p',
    (value, decimalSpacer, thousandSpacer, decimals, expected) => {
      expect(
        formatNumber(
          value,
          decimalSpacer,
          thousandSpacer,
          toFixedText(decimals),
        ),
      ).toBe(expected);
    },
  );

  it.each([
    [-703, ',', ' ', 0, '-703'],
    [-123456, ',', ' ', 2, '-123 456,00'],
    [-123456, '.', ',', 2, '-123,456.00'],
    [-1500, '.', ',', 0, '-1,500'],
    ['-144703.5', ',', ' ', 2, '-144 703,50'],
  ])(
    'puts the sign of %p in front with "%s" and "%s" and %p decimals: %p',
    (value, decimalSpacer, thousandSpacer, decimals, expected) => {
      expect(
        formatNumber(
          value,
          decimalSpacer,
          thousandSpacer,
          toFixedText(decimals),
        ),
      ).toBe(expected);
    },
  );

  it('shows a negative value rounded to zero without a sign', () => {
    expect(formatNumber(-0.001, ',', ' ', toFixedText(2))).toBe('0,00');
  });
});
