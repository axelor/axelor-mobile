/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import {lightTheme} from '../../src/theme';

const colorKeys = Object.entries(lightTheme.colors)
  .filter(([, _color]) => typeof _color !== 'string')
  .map(([key]) => key);

export const colorPicker = {
  control: {type: 'select'},
  options: colorKeys,
  mapping: {
    ...Object.fromEntries(colorKeys.map(_k => [_k, lightTheme.colors[_k]])),
  },
};

export const writingPicker = {
  control: {type: 'select'},
  options: ['title', 'subtitle', 'important', 'details', undefined],
};

export const keyboardPicker = {
  control: {type: 'select'},
  options: [
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'number-pad',
    'name-phone-pad',
    'decimal-pad',
    'twitter',
    'web-search',
    'visible-password',
  ],
};

export const disabledControl = {table: {disable: true}};
