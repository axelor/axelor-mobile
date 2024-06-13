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
import {deserialize, serialize} from './process-storage.helper';

const PROCESS_LIST_KEY = 'PROCESS_LIST_KEY';
const NUMBER_UNREAD_PROCESS_KEY = 'NUMBER_UNREAD_PROCESS_KEY';

class ProcessStorage {
  private processList: ProcessItem[];
  private numberUnreadProcess: number;
  private refreshCallBacks: (({
    numberUnreadProcess,
    processList,
  }: {
    numberUnreadProcess: number;
    processList: ProcessItem[];
  }) => void)[];

  constructor(private localStorage: Storage) {
    this.processList = [];
    this.numberUnreadProcess = 0;
    this.refreshCallBacks = [];
  }

  register(callBack) {
    this.refreshCallBacks.push(callBack);
    this.updateState();
  }

  private updateState() {
    if (this.refreshCallBacks.length > 0) {
      const state = {
        processList: this.getProcessList(),
        numberUnreadProcess: this.getNumberUnreadProcess(),
      };
      this.refreshCallBacks.forEach(callBack => callBack(state));
    }
  }

  getProcessList(): ProcessItem[] {
    if (this.processList == null || this.processList.length === 0) {
      this.processList = deserialize(
        this.localStorage.getItem(PROCESS_LIST_KEY),
      );
    }

    return this.processList;
  }

  saveProcess(process: ProcessItem) {
    if (process == null || process.key == null) {
      return;
    }

    if (this.processList.find(_item => _item.key === process.key) != null) {
      this.processList = this.processList.map(_item => {
        if (_item.key === process.key) {
          return {..._item, ...process};
        }

        return _item;
      });
    } else {
      this.processList.push(process);
    }

    this.localStorage.setItem(PROCESS_LIST_KEY, serialize(this.processList));

    this.updateState();
  }

  getNumberUnreadProcess(): number {
    this.numberUnreadProcess =
      this.localStorage.getItem(NUMBER_UNREAD_PROCESS_KEY) || 0;

    return this.numberUnreadProcess;
  }

  saveNumberUnreadProcess(value: number) {
    this.localStorage.setItem(NUMBER_UNREAD_PROCESS_KEY, value.toString());
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

    this.localStorage.setItem(PROCESS_LIST_KEY, processList);
    this.updateState();
  }
}

export const processStorage = new ProcessStorage(storage);
