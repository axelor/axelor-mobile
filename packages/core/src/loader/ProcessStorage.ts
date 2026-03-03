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

import {storage, Storage} from '../storage/Storage';
import {ProcessItem} from './types';
import {deserialize, serialize} from './helpers';

const NUMBER_UNREAD_PROCESS_KEY = 'NUMBER_UNREAD_PROCESS_KEY';
const PROCESS_LIST_KEY = 'PROCESS_LIST_KEY';

class ProcessStorage {
  private numberUnreadProcess: number;
  private processList: ProcessItem[];
  private refreshCallBacks: (({
    numberUnreadProcess,
    processList,
  }: {
    numberUnreadProcess: number;
    processList: ProcessItem[];
  }) => void)[];

  constructor(private localStorage: Storage) {
    this.numberUnreadProcess = 0;
    this.processList = [];
    this.refreshCallBacks = [];
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

  register(callBack) {
    this.refreshCallBacks.push(callBack);
    this.updateState();
  }

  getNumberUnreadProcess(): number {
    if (this.numberUnreadProcess == null || this.numberUnreadProcess <= 0) {
      this.numberUnreadProcess =
        Number(this.localStorage.getItem(NUMBER_UNREAD_PROCESS_KEY)) || 0;
    }

    return this.numberUnreadProcess;
  }

  saveNumberUnreadProcess(value: number) {
    if (value == null) {
      return;
    }

    this.numberUnreadProcess = value;

    this.localStorage.setItem(
      NUMBER_UNREAD_PROCESS_KEY,
      this.numberUnreadProcess.toString(),
    );
    this.updateState();
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

    if (this.processList.find(item => item.key === process.key) != null) {
      this.processList = this.processList.map(item => {
        if (item.key === process.key) {
          return {...item, ...process};
        }
        return item;
      });
    } else {
      this.processList.push(process);
    }

    this.localStorage.setItem(PROCESS_LIST_KEY, serialize(this.processList));
    this.updateState();
  }

  saveProcessList(_processList: ProcessItem[]) {
    if (!Array.isArray(_processList)) {
      return;
    }

    this.processList = _processList;
    this.localStorage.setItem(PROCESS_LIST_KEY, serialize(_processList));
    this.updateState();
  }
}

export const processStorage = new ProcessStorage(storage);
