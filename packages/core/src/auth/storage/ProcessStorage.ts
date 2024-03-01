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

import {Storage, storage} from '../../storage/Storage';
import {ProcessItem} from '../../components';

const PROCESS_HISTORY_KEY = 'PROCESS_HISTORY';

class ProcessStorage {
  private processList: ProcessItem[];
  private refreshCallBack: (sessionList: ProcessItem[]) => void;

  constructor(private localStorage: Storage) {
    this.processList = [];
  }

  register(callBack) {
    this.refreshCallBack = callBack;
  }

  getProcessList(): ProcessItem[] {
    if (this.processList == null || this.processList.length === 0) {
      this.processList = this.localStorage.getItem(PROCESS_HISTORY_KEY) || [];
    }
    return this.processList;
  }

  saveProcess(process: ProcessItem) {
    if (process == null || process.key == null) {
      return;
    }

    if (this.processList.find(_item => _item.key === process.key)) {
      this.processList = this.processList.map(_item => {
        if (_item.key === process.key) {
          return {..._item, ...process};
        }

        return _item;
      });
    } else {
      this.processList.push(process);
    }

    this.localStorage.setItem(PROCESS_HISTORY_KEY, this.processList);
    this.updateState();
  }

  removeProcess(key: string) {
    const processList = this.getProcessList();

    if (!Array.isArray(processList) || processList.length === 0) {
      return;
    }

    const index = processList.findIndex(p => p.key === key);

    if (index !== -1) {
      processList.splice(index, 1);
    }

    this.localStorage.setItem(PROCESS_HISTORY_KEY, processList);
    this.updateState();
  }

  private updateState() {
    if (this.refreshCallBack == null) {
      return;
    }

    this.refreshCallBack(this.processList);
  }
}

export const processStorage = new ProcessStorage(storage);
