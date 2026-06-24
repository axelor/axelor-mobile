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

export enum SettingsItemType {
  picker = 'picker',
  switch = 'switch',
  button = 'button',
}

export interface BaseSettingsItem {
  key: string;
  type: SettingsItemType;
  title: string;
  order?: number;
  showIf?: boolean;
}

export interface PickerSettingsItem extends BaseSettingsItem {
  type: SettingsItemType.picker;
  defaultValue?: any;
  listItems: any[];
  labelField: string;
  valueField: string;
  onValueChange: (value: any) => void;
  emptyValue?: boolean;
}

export interface SwitchSettingsItem extends BaseSettingsItem {
  type: SettingsItemType.switch;
  defaultValue: boolean;
  onToggle: (state: boolean) => void;
}

export interface ButtonSettingsItem extends BaseSettingsItem {
  type: SettingsItemType.button;
  onPress: () => void;
}

export type SettingsItems = {
  switchItems: SwitchSettingsItem[];
  pickerItems: PickerSettingsItem[];
  buttonItems: ButtonSettingsItem[];
};

export type SettingsElt =
  | SwitchSettingsItem
  | PickerSettingsItem
  | ButtonSettingsItem;
