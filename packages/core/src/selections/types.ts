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

import {Color} from '@axelor/aos-mobile-ui';

export type ModuleSelections = ModelSelection[];

export interface ModelSelection {
  modelName: string;
  specificKey?: string;
  fields: {
    [fieldName: string]: {
      overrideMethod?: 'add' | 'rewrite';
      useWebContent?: boolean;
      content: SelectionItem[];
    };
  };
}

export interface TypeConfig {
  modelName: string;
  specificKey?: string;
  selections: SelectionFields;
}

export interface SelectionFields {
  [fieldName: string]: Selection;
}

export interface Selection {
  list: SelectionItem[];
  [key: string]: any;
}

export interface SelectionHelpers {
  getItemTitle: (selection: Selection, value: any) => string;
  getItemColor: (selection: Selection, value: any) => Color;
  getSelectionItems: (
    selection: Selection,
    selectedItem?: {key: any; [key: string]: any}[],
  ) => {
    title: string;
    color: Color;
    value: string | number | boolean;
    key: string | number | boolean;
    isActive: boolean;
  }[];
  getItemColorFromIndex: (
    selectionList: ObjectSelectionItem[],
    value: ObjectSelectionItem,
  ) => Color;
  getCustomSelectionItems: (
    selectionList: ObjectSelectionItem[],
    titleField: string,
    selectedItem?: {key: any; [key: string]: any}[],
  ) => {
    title: string;
    color: Color;
    value: string | number | boolean;
    key: string | number | boolean;
    isActive: boolean;
  }[];
}

export interface SelectionItem {
  key: string;
  value: string | number | boolean;
  title: string;
  color?: string;
  order?: number;
}

export interface ObjectSelectionItem {
  id: number;
  [key: string]: any;
}
