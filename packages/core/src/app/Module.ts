/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {Reducer} from '@reduxjs/toolkit';
import {Schema} from 'yup';

interface MenuBase {
  title: string;
  icon: string;
  disabled?: boolean;
  parent?: string;
  order?: number;
}

interface MenuWithSubMenus extends MenuBase {
  subMenus: {
    [subMenuKey: string]: SubMenu;
  };
}

interface MenuWithScreen extends MenuBase {
  screen: string;
}

export type Menu = MenuWithSubMenus | MenuWithScreen;

export interface SubMenu extends MenuWithScreen {}

interface ScreenOptions {
  shadedHeader: boolean;
}

export interface Screen {
  component: React.FC<any>;
  title: string;
  actionID?: string;
  options?: ScreenOptions;
}

export interface ObjectFields {
  [objectKey: string]: Schema;
}

export type SearchFields = FieldsList;

export type SortFields = FieldsList;

export interface FieldsList {
  [objectKey: string]: string[];
}

export interface Models {
  objectFields?: ObjectFields;
  sortFields?: SortFields;
  searchFields?: SearchFields;
  headerRegisters?: Function;
}

export interface Module {
  name: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  disabled?: boolean;
  menus?: {
    [menuKey: string]: Menu;
  };
  screens?: {
    [screenKey: string]: Screen;
  };
  translations?: {
    [languageKey: string]: any;
  };
  reducers?: {
    [key: string]: Reducer;
  };
  backgroundFunctions?: Function[];
  models?: Models;
}
