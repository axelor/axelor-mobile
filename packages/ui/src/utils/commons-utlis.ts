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

export function hexToRgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export function addOpacityToHex(hexColor: string, opacity = 1) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');

  return `${hexColor}${alpha}`;
}

export function rgbaToHex(r: number, g: number, b: number, a: number = 1) {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return addOpacityToHex(`#${toHex(r)}${toHex(g)}${toHex(b)}`, a);
}

export function rgbaStringToHex(rgba: string) {
  const match = rgba.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/,
  );

  if (!match) {
    return null;
  }

  const [, r, g, b, a] = match.map(Number);

  return rgbaToHex(r, g, b, a);
}

export function getBestForegroundColor(hexColor: string) {
  const [r, g, b] = hexToRgb(hexColor).split(', ').map(Number);

  const luminance =
    0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
