/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

export interface HeaderActions {
  [key: string]: HeaderOptions;
}

export interface HeaderOptions {
  model?: string;
  modelId?: number;
  disableMailMessages?: boolean;
  attachedFileScreenTitle?: string;
  barcodeFieldname?: string;
  headerTitle?: string;
  actions?: ActionType[];
}

export interface ActionType {
  key: string;
  order: number;
  title: string;
  iconName: string;
  iconColor?: string;
  FontAwesome5?: boolean;
  indicator?: number;
  hideIf?: boolean;
  disableIf?: boolean;
  onPress: () => void;
  showInHeader?: boolean;
}

export interface HeaderBandItem {
  key: string;
  color: Color;
  text: string;
  showIf: boolean;
  order?: number;
}
