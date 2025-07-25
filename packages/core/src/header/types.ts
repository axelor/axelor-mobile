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

import {ReactElement} from 'react';
import {Color} from '@axelor/aos-mobile-ui';

export interface HeaderActions {
  [key: string]: HeaderOptions;
}

export interface HeaderOptions {
  model?: string;
  modelId?: number;
  options?: any;
  headerTitle?: string;
  actions?: ActionType[];
}

export interface GenericHeaderActions {
  [key: string]: RegisterFunction;
}

export type RegisterFunction = ({
  model,
  modelId,
  options,
}: {
  model: string;
  modelId: number;
  options?: any;
}) => ActionType | Promise<ActionType>;

export interface ActionType {
  key: string;
  order: number;
  title: string;
  iconName: string;
  iconColor?: string;
  indicator?: number;
  hideIf?: boolean;
  disableIf?: boolean;
  onPress: () => void;
  showInHeader?: boolean;
  customComponent?: ReactElement<any>;
}

export interface HeaderBandItem {
  key: string;
  color: Color;
  text: string;
  showIf: boolean;
  order?: number;
}
