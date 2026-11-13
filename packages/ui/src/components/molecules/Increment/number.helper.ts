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

export interface NumberSeparators {
  decimalSpacer: string;
  thousandSpacer: string;
}

const DIGITS_REGEX = /^\d*$/;
const WHITE_SPACE_REGEX = /\s/g;

const escapeRegex = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* Reads the value given to the field: anything that is not a number gives 0. */
export const toNumber = (value: string | number | null | undefined): number => {
  const parsedValue =
    typeof value === 'number' ? value : parseFloat(value ?? '0');

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

/*
 * Decimal separators accepted in typed text: the language one, and "." when it
 * does not group thousands, because some numeric keyboards only show ".".
 */
const getDecimalSpacers = ({
  decimalSpacer,
  thousandSpacer,
}: NumberSeparators): string[] => {
  const decimalSpacers = [decimalSpacer];

  if (decimalSpacer !== '.' && thousandSpacer !== '.') {
    decimalSpacers.push('.');
  }

  return decimalSpacers;
};

/*
 * Reads the integer part of typed text. Thousands separators are accepted only
 * where they group digits by three, as in "1 234 567" or "1,234,567".
 */
const parseIntegerPart = (
  text: string,
  {thousandSpacer}: NumberSeparators,
): string | null => {
  const isWhiteSpaceSpacer = thousandSpacer.trim() === '';
  const normalizedText = isWhiteSpaceSpacer
    ? text.replace(WHITE_SPACE_REGEX, ' ')
    : text;
  const spacer = isWhiteSpaceSpacer ? ' ' : thousandSpacer;

  if (!normalizedText.includes(spacer)) {
    return DIGITS_REGEX.test(normalizedText) ? normalizedText : null;
  }

  const groupedRegex = new RegExp(`^\\d{1,3}(${escapeRegex(spacer)}\\d{3})+$`);

  return groupedRegex.test(normalizedText)
    ? normalizedText.split(spacer).join('')
    : null;
};

/*
 * Reads the text typed in the field. Returns null when the text is not a
 * complete number ("-", "12,3,4", "1,23" in English), so nothing is sent for it.
 */
export const parseTypedNumber = (
  text: string | null | undefined,
  separators: NumberSeparators,
): number | null => {
  const trimmedText = text?.trim() ?? '';
  const isNegative = trimmedText.startsWith('-');
  const unsignedText = isNegative ? trimmedText.slice(1) : trimmedText;

  const decimalSpacers = getDecimalSpacers(separators);
  const decimalIndexes = [...unsignedText]
    .map((character, index) =>
      decimalSpacers.includes(character) ? index : -1,
    )
    .filter(index => index >= 0);

  if (decimalIndexes.length > 1) {
    return null;
  }

  const decimalIndex = decimalIndexes[0] ?? -1;
  const integerText =
    decimalIndex >= 0 ? unsignedText.slice(0, decimalIndex) : unsignedText;
  const decimalText =
    decimalIndex >= 0 ? unsignedText.slice(decimalIndex + 1) : '';

  const integerPart = parseIntegerPart(integerText, separators);
  if (integerPart == null || !DIGITS_REGEX.test(decimalText)) {
    return null;
  }

  if (integerPart === '' && decimalText === '') {
    return null;
  }

  const parsedValue = parseFloat(`${integerPart || '0'}.${decimalText || '0'}`);

  return isNegative ? -parsedValue : parsedValue;
};

/* Text shown while editing: the number without thousands separators. */
export const toEditText = (
  value: number,
  {decimalSpacer}: NumberSeparators,
  roundToText: (value: number) => string,
): string => roundToText(value).replace('.', decimalSpacer);
