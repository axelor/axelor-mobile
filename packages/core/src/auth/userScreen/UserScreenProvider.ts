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
import {UserScreenItem, UserScreenItems, UserScreenZone} from './types';
import {UserScreenHelper} from './user-screen.helper';

class UserScreenProvider {
  private refreshCallBack: Function[];
  private userCardItems: UserScreenItem[];
  private contentItems: UserScreenItem[];

  constructor() {
    this.refreshCallBack = [];
    this.userCardItems = [];
    this.contentItems = [];
  }

  register(callBack: Function) {
    this.refreshCallBack.push(callBack);
  }

  unregister(callBack: Function) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.getAllItems()));
  }

  registerItem(item: UserScreenItem) {
    if (item?.zone === UserScreenZone.content) {
      this.contentItems = UserScreenHelper.registerItem(
        this.contentItems,
        item,
      );
    } else {
      this.userCardItems = UserScreenHelper.registerItem(
        this.userCardItems,
        item,
      );
    }

    this.updateState();
  }

  getAllItems(): UserScreenItems {
    return {
      userCardItems: this.userCardItems,
      contentItems: this.contentItems,
    };
  }
}

export const userScreenProvider = new UserScreenProvider();

export const useUserScreen = (): UserScreenItems => {
  const [items, setItems] = useState<UserScreenItems>(
    userScreenProvider.getAllItems(),
  );

  useEffect(() => {
    userScreenProvider.register(setItems);

    return () => userScreenProvider.unregister(setItems);
  }, []);

  return useMemo(() => ({...UserScreenHelper.filterItems(items)}), [items]);
};
