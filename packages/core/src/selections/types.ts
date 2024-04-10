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

import {Color} from '@axelor/aos-mobile-ui';

export type ModuleSelections = ModelSelection[];

export interface ModelSelection {
  modelName: string;
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
  selections: Selections;
}

export interface Selections {
  [fieldName: string]: {
    list: SelectionItem[];
    getItemTitle?: (value: any) => string;
    getItemColor?: (value: any) => Color;
    getSelectionItems?: () => {
      title: string;
      color: Color;
      value: string | number;
    }[];
    [key: string]: any;
  };
}

export interface SelectionItem {
  key: string;
  value: string | number;
  title: string;
  color?: string;
  order?: number;
}
