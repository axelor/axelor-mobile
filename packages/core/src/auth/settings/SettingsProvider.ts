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

import {useEffect, useMemo, useState} from 'react';
import {
  ButtonSettingsItem,
  PickerSettingsItem,
  SettingsItems,
  SwitchSettingsItem,
} from './types';
import {SettingsHelper} from './settings.helper';

class SettingsProvider {
  private refreshCallBack: Function[];
  private switchItems: SwitchSettingsItem[];
  private pickerItems: PickerSettingsItem[];
  private buttonItems: ButtonSettingsItem[];

  constructor() {
    this.refreshCallBack = [];
    this.switchItems = [];
    this.pickerItems = [];
    this.buttonItems = [];
  }

  register(callBack: Function) {
    this.refreshCallBack.push(callBack);
  }

  unregister(callBack: Function) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  private updateState() {
    this.refreshCallBack.forEach(_f =>
      _f({
        switchItems: this.switchItems,
        pickerItems: this.pickerItems,
        buttonItems: this.buttonItems,
      }),
    );
  }

  registerSwitchItem(item: SwitchSettingsItem) {
    this.switchItems = SettingsHelper.registerItem(this.switchItems, item);
    this.updateState();
  }

  registerPickerItem(item: PickerSettingsItem) {
    this.pickerItems = SettingsHelper.registerItem(this.pickerItems, item);
    this.updateState();
  }

  registerButtonItem(item: ButtonSettingsItem) {
    this.buttonItems = SettingsHelper.registerItem(this.buttonItems, item);
    this.updateState();
  }

  getAllItems(): SettingsItems {
    return {
      switchItems: this.switchItems,
      pickerItems: this.pickerItems,
      buttonItems: this.buttonItems,
    };
  }
}

export const settingsProvider = new SettingsProvider();

export const useSettings = (): SettingsItems => {
  const [items, setItems] = useState<SettingsItems>(
    settingsProvider.getAllItems(),
  );

  useEffect(() => {
    settingsProvider.register(setItems);

    return () => settingsProvider.unregister(setItems);
  }, []);

  return useMemo(() => ({...SettingsHelper.filterItems(items)}), [items]);
};
