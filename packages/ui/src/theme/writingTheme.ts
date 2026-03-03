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

import {useWritingStyle} from './WritingThemeContext';

export interface Writing {
  key: string;
  name: string;
  style: WritingStyles;
}

export interface WritingStyles {
  defaultSize: number;
  title: TextStyle;
  subTitle: TextStyle;
  textImportant: TextStyle;
  textDetails: TextStyle;
}

export interface TextStyle {
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}

export const writingDefaultTheme: Writing = {
  key: 'default',
  name: 'Default',
  style: {
    defaultSize: 16,
    title: {fontSize: 18, fontWeight: 'bold', fontStyle: 'normal'},
    subTitle: {fontSize: 16, fontWeight: 'normal', fontStyle: 'normal'},
    textImportant: {fontSize: 16, fontWeight: 'bold', fontStyle: 'normal'},
    textDetails: {fontSize: 16, fontWeight: 'normal', fontStyle: 'italic'},
  },
};

export const useWritingType = (
  type: 'title' | 'subtitle' | 'important' | 'details' | undefined,
): TextStyle => {
  const Writing = useWritingStyle();

  switch (type) {
    case 'title':
      return Writing.title;
    case 'subtitle':
      return Writing.subTitle;
    case 'important':
      return Writing.textImportant;
    case 'details':
      return Writing.textDetails;
    default:
      return {fontSize: Writing.defaultSize};
  }
};
