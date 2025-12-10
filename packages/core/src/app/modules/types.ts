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

import {Dispatch} from 'react';
import {Reducer} from '@reduxjs/toolkit';
import {Schema} from 'yup';
import {FormConfigs} from '../../forms/types';
import {ModuleSelections} from '../../selections';

interface MinimumMenuFields {
  title: string;
  hideIf?: (storeState: any) => boolean;
  parent?: string;
  order?: number;
}

export interface MenuSeparator extends MinimumMenuFields {
  separator: true;
}

interface MenuBase extends MinimumMenuFields {
  icon: string;
  disabled?: boolean;
  compatibilityAOS?: Compatibility;
}

interface MenuWithScreen extends MenuBase {
  screen: string;
}

export interface SubMenu extends MenuWithScreen {}

export interface MenuWithSubMenus extends MenuBase {
  subMenus: {
    [subMenuKey: string]: SubMenu;
  };
}

export interface RootMenuWithScreen extends MenuWithScreen {
  isDefault?: boolean;
}

export type Menu = MenuWithSubMenus | RootMenuWithScreen | MenuSeparator;

interface ScreenOptions {
  shadedHeader: boolean;
}

export interface Screen {
  component: React.FC<any>;
  title: string;
  actionID?: string;
  options?: ScreenOptions;
  isUsableOnShortcut?: boolean;
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
  formsRegister?: FormConfigs;
  headerRegisters?: Function;
  typeObjects?: ModuleSelections;
}

interface ToolData {
  dispatch: Dispatch<any>;
  storeState: any;
  screenContext: any;
}

interface ActionToolData extends ToolData {
  navigation: any;
  translator: (key: string) => string;
}

export interface Tool {
  key: string;
  order?: number;
  title?: string;
  iconName: string;
  color?: string;
  hideIf?: (data: ToolData) => boolean | Promise<boolean>;
  disabledIf?: (data: ToolData) => boolean;
  onPress: (data: ActionToolData) => void;
}

type version = `${number}.${number}.${number}` | '-';

export interface Compatibility {
  /** Name of the web  module */
  moduleName?: string;
  /** Version of the web module, this value will be filled in automatically with the information obtained from the web instance. */
  moduleVersion?: version;
  /** Minimum web module version (included) */
  downToVersion?: version;
  /** Maximum web module version (excluded) */
  upToVersion?: version;
}

export interface Module {
  name: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  /** Detail compatibility with the web version */
  compatibilityAOS?: Compatibility;
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
  /** List of configuration name to fetch from the web */
  requiredConfig?: string[];
  /** Function which will be executed once after user login to create modules/menus based on data */
  moduleRegister?: Function;
  globalTools?: Tool[];
}
