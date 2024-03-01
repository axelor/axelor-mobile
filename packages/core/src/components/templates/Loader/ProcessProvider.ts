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

import {TranslatorProps} from '../../../i18n';
import {showToastMessage} from '../../../utils/show-toast-message';
import {
  ProcessOption,
  ProcessStatus,
  ProcessItem,
  callBack,
  EventType,
  Event,
} from './types';
import {DEMO_DATA} from './demo-data';

// TODO: add register process to all process list
class ProcessProvider {
  private _events: Map<string, Event>;
  private _processMap: Map<string, ProcessItem>;
  private _allProcessList: ProcessItem[];
  private _numberRunningProcess: number;
  private _numberUnresolvedProcess: number;

  constructor() {
    this._events = new Map();
    this._processMap = new Map();
    this._allProcessList = DEMO_DATA;
    this._numberRunningProcess = 0;
    this._numberUnresolvedProcess = 0;
  }

  get numberRunningProcess() {
    return this._numberRunningProcess;
  }

  get numberUnresolvedProcess() {
    return this._allProcessList.filter(p => p.completed && !p.resolved).length;
  }

  get allProcessList() {
    return this._allProcessList;
  }

  on(key: string, e: EventType, c: callBack) {
    const event = this._events.has(key) ? this._events.get(key) : ({} as Event);

    if (!event[e]) {
      event[e] = [];
    }

    event[e].push(c);

    this._events.set(key, event);
  }

  private emit(key: string, e: EventType, ...args) {
    if (this._events.has(key) && this._events.get(key)[e]) {
      this._events.get(key)[e].forEach(c => c(...args));
    }
  }

  registerProcess(key: string, processOptions: ProcessOption): ProcessItem {
    const _p = {
      key,
      ...processOptions,
      loading: false,
      startedDate: null,
      completedDate: null,
      failedDate: null,
      notifyMe: false,
      response: null,
      status: null,
      completed: false,
      resolved: false,
    };

    this._processMap.set(key, _p);

    return _p;
  }

  getProcess(key: string): ProcessItem {
    if (!this._processMap.has(key)) {
      console.error(`Process with key ${key} not found.`);
      return null;
    }

    return this._processMap.get(key);
  }

  notifyMe(p: ProcessItem) {
    p.notifyMe = true;
    this._processMap.set(p.key, p);
  }

  async runProcess(p: ProcessItem, I18n: TranslatorProps) {
    if (!this._processMap.has(p.key)) {
      throw new Error(`Process with key ${p.key} not found.`);
    }

    this.onStart(p);
    this.executeProcess(p, I18n);
  }

  private onFinish(
    p: ProcessItem,
    status: ProcessStatus,
    response: any,
    I18n: TranslatorProps,
  ) {
    const updatedProcess = {
      ...p,
      status,
      loading: false,
      response,
      completed: true,
      completedDate:
        status === ProcessStatus.COMPLETED && new Date().toISOString(),
      failedDate: status === ProcessStatus.FAILED && new Date().toISOString(),
    };

    this._processMap.set(p.key, updatedProcess);

    this.decrementNumberOfRunningProcess();

    this.emit(
      p.key,
      status === ProcessStatus.COMPLETED
        ? EventType.COMPLETED
        : EventType.FAILED,
      updatedProcess,
      I18n,
    );
  }

  private onCompleted(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, response, disabled, onSuccess} = p;
    if (!notifyMe) {
      this.onFinishCallBack(p.key, onSuccess, response);
    } else {
      showToastMessage({
        type: 'success',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Success'),
        text2:
          typeof response === 'string'
            ? response
            : I18n.t('Base_Loader_ProccessSuccessMessage'),
        onPress: () =>
          !disabled && this.onFinishCallBack(p.key, onSuccess, response),
      });
    }
  }

  private onFailed(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, response, disabled, onError} = p;
    if (!notifyMe) {
      this.onFinishCallBack(p.key, onError, response);
    } else {
      showToastMessage({
        type: 'error',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Error'),
        text2:
          typeof response === 'string'
            ? response
            : I18n.t('Base_Loader_ProccessErrorMessage'),
        onPress: () =>
          !disabled && this.onFinishCallBack(p.key, onError, response),
      });
    }
  }

  private incrementNumberOfRunningProcess() {
    this._numberRunningProcess++;
  }

  private decrementNumberOfRunningProcess() {
    this._numberRunningProcess = Math.max(0, this._numberRunningProcess - 1);
  }

  private resolveProcess(key: string) {
    if (!this._processMap.has(key)) {
      throw new Error(`Process with key ${key} not found.`);
    }

    const p = this._processMap.get(key);
    if (!p.completed) {
      throw new Error(`Could not resolve uncompleted process ${key}`);
    }

    this._processMap.set(key, {...p, resolved: true});
  }

  private onFinishCallBack(key: string, cb: callBack, response: any) {
    this.resolveProcess(key);
    cb(response);
  }

  private onStart(p: ProcessItem) {
    this._processMap.set(p.key, {
      ...p,
      loading: true,
      status: ProcessStatus.RUNNING,
      startedDate: new Date().toISOString(),
    });

    this.incrementNumberOfRunningProcess();

    this.on(p.key, EventType.COMPLETED, this.onCompleted);
    this.on(p.key, EventType.FAILED, this.onFailed);
    this.emit(p.key, EventType.STARTED);
  }

  private async executeProcess(p: ProcessItem, I18n: TranslatorProps) {
    try {
      const response = await p.process();
      this.onFinish(p, ProcessStatus.COMPLETED, response, I18n);
    } catch (error) {
      this.onFinish(p, ProcessStatus.FAILED, error, I18n);
    }
  }
}

export const processProvider = new ProcessProvider();
