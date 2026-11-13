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

import {
  parseTypedNumber,
  toEditText,
  toNumber,
} from '../../../src/components/molecules/Increment/number.helper';

const french = {decimalSpacer: ',', thousandSpacer: ' '};
const english = {decimalSpacer: '.', thousandSpacer: ','};
const toFixedText = decimals => value => value.toFixed(decimals);

describe('Increment number helpers', () => {
  describe('toNumber', () => {
    it.each([
      ['5', 5],
      ['144703.5', 144703.5],
      [12, 12],
      [undefined, 0],
      [null, 0],
      ['', 0],
      ['abc', 0],
    ])('reads %p as %p', (value, expected) => {
      expect(toNumber(value)).toBe(expected);
    });
  });

  describe('parseTypedNumber', () => {
    it.each([
      ['144703', 144703],
      ['144703,5', 144703.5],
      ['144703.5', 144703.5],
      ['1 234 567', 1234567],
      ['1 234,5', 1234.5],
      ['1 234', 1234],
      ['12,', 12],
      [',5', 0.5],
      ['-12,5', -12.5],
    ])('reads French %p as %p', (text, expected) => {
      expect(parseTypedNumber(text, french)).toBe(expected);
    });

    it.each([
      ['144703', 144703],
      ['144703.5', 144703.5],
      ['1,234', 1234],
      ['1,234,567.5', 1234567.5],
      ['12.', 12],
      ['-1,234', -1234],
    ])('reads English %p as %p', (text, expected) => {
      expect(parseTypedNumber(text, english)).toBe(expected);
    });

    it.each([
      [french, ''],
      [french, '-'],
      [french, ','],
      [french, '1,2,3'],
      [french, '1.234,5'],
      [french, '12 34'],
      [french, '12abc'],
      [english, '12,5'],
      [english, '1,234,56'],
      [english, '1,23'],
      [english, '1.2.3'],
      [english, '.'],
    ])('does not read %p text %p', (separators, text) => {
      expect(parseTypedNumber(text, separators)).toBeNull();
    });
  });

  describe('toEditText', () => {
    it.each([
      [french, 0, 144703, '144703'],
      [french, 2, 144703.5, '144703,50'],
      [english, 2, 1234567, '1234567.00'],
    ])(
      'gives the text to edit with %p and %p decimals for %p',
      (separators, decimals, value, expected) => {
        expect(toEditText(value, separators, toFixedText(decimals))).toBe(
          expected,
        );
      },
    );
  });
});
