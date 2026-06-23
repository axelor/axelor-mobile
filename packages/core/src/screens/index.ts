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

import {Screen} from '../app';
import BarcodeDisplayScreen from './BarcodeDisplayScreen';
import JsonFieldScreen from './JsonFieldScreen';
import ProcessListScreen from './ProcessListScreen';
import ERPAccessScreen from './ERPAccessScreen';

type JSONScreens = {[key: string]: Screen};

const baseScreens: JSONScreens = {
  BarcodeDisplayScreen: {
    title: 'Base_Barcode',
    component: BarcodeDisplayScreen,
    actionID: 'core_barcode_details',
  },
  JsonFieldScreen: {
    title: 'Base_MetaJsonFields',
    component: JsonFieldScreen,
    actionID: 'core_metaJsonFields_details',
  },
  ProcessListScreen: {
    title: 'Base_Loader_ProcessList',
    component: ProcessListScreen,
  },
  ERPAccessScreen: {
    title: 'Base_ERPAccesss',
    component: ERPAccessScreen,
    isUsableOnShortcut: true,
  },
};

export default baseScreens;
export {default as ErrorScreen} from './ErrorScreen';
