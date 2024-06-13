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

import {StatusBar} from 'react-native';
import {processStorage} from '../../../auth/storage/ProcessStorage';
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

type ProcessChangeCallback = (newNumber: number) => void;

//TODO: resolve toast press
class ProcessProvider {
  private _events: Map<string, Event>;
  private _processMap: Map<string, ProcessItem>;
  private _processList: ProcessItem[];
  private _numberRunningProcess: number;
  private _numberUnreadProcess: number;
  private _subscribers: ProcessChangeCallback[] = [];
  private _subscribersNumberUnread: ProcessChangeCallback[] = [];

  constructor() {
    this._events = new Map();
    this._processList = processStorage.getProcessList();
    this._processMap = new Map(this._processList.map(p => [p.key, p]));
    this._numberRunningProcess = 0;
    this._numberUnreadProcess = processStorage.getNumberUnreadProcess();
    this._subscribers = [];
    this._subscribersNumberUnread = [];
    this.onCompleted = this.onCompleted.bind(this);
    this.onFailed = this.onFailed.bind(this);
  }

  getNumberRunningProcess() {
    return this._numberRunningProcess;
  }
  // setNumberRunningProcess(value) {
  //   this._numberRunningProcess = value;
  //   this._notifySubscribers();
  // }
  incrementNumberOfRunningProcess() {
    this._numberRunningProcess += 1;
    this.notifySubscribers();
  }
  decrementNumberOfRunningProcess() {
    this._numberRunningProcess = Math.max(0, this._numberRunningProcess - 1);
    this.notifySubscribers();
  }
  notifySubscribers() {
    this._subscribers.forEach(callback => callback(this._numberRunningProcess));
  }
  subscribe(callback) {
    this._subscribers.push(callback);
  }
  unsubscribe(callback) {
    this._subscribers = this._subscribers.filter(sub => sub !== callback);
  }

  // getNumberUnreadProcess() {
  //   console.log('test: ', this._numberUnreadProcess);
  //   if (this._numberUnreadProcess === 0) {
  //     console.log('test: ', processStorage.getNumberUnreadProcess());
  //     return processStorage.getNumberUnreadProcess();
  //   }
  //   return this._numberUnreadProcess;
  // }
  setNumberUnreadProcess(value) {
    this._numberUnreadProcess = value;
    processStorage.saveNumberUnreadProcess(value);
    // this.notifyNumberUnreadSubscribers();
  }
  // notifyNumberUnreadSubscribers() {
  //   this._subscribersNumberUnread.forEach(callback =>
  //     callback(this._numberUnreadProcess),
  //   );
  // }
  // subscribeNumberUnread(callback) {
  //   this._subscribersNumberUnread.push(callback);
  // }
  // unsubscribeNumberUnread(callback) {
  //   this._subscribersNumberUnread = this._subscribersNumberUnread.filter(
  //     sub => sub !== callback,
  //   );
  // }

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
      status: ProcessStatus.PENDING,
      completed: false,
      resolved: false,
    };

    this._processMap.set(key, _p);
    processStorage.saveProcess(_p);

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
    const _p = this.getProcess(p.key);
    _p.notifyMe = true;
    this._processMap.set(p.key, _p);
    processStorage.saveProcess(_p);
  }

  async runProcess(p: ProcessItem, I18n: TranslatorProps) {
    if (!this._processMap.has(p.key)) {
      throw new Error(`Process with key ${p.key} not found.`);
    }

    const _p = this.onStart(p);
    this.executeProcess(_p, I18n);
  }

  private onFinish(
    p: ProcessItem,
    status: ProcessStatus,
    response: any,
    I18n: TranslatorProps,
  ) {
    const __p = this.getProcess(p.key);
    const _p = {
      ...__p,
      status,
      loading: false,
      response,
      completed: true,
      completedDate:
        status === ProcessStatus.COMPLETED && new Date().toISOString(),
      failedDate:
        status === ProcessStatus.FAILED ? new Date().toISOString() : null,
    };

    this.decrementNumberOfRunningProcess();

    this._processMap.set(p.key, _p);
    processStorage.saveProcess(_p);

    this.emit(
      p.key,
      status === ProcessStatus.COMPLETED
        ? EventType.COMPLETED
        : EventType.FAILED,
      _p,
      I18n,
    );
  }

  private onCompleted(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, response, disabled, onSuccess} = p;

    if (!notifyMe) {
      onSuccess(response);
      this.resolveProcess(p.key);
    } else {
      showToastMessage({
        type: 'success',
        position: 'top',
        topOffset: StatusBar.currentHeight + 30,
        text1: I18n.t('Base_Success'),
        text2:
          typeof response === 'string'
            ? response
            : I18n.t('Base_Loader_ProccessSuccessMessage'),
        onPress: () => !disabled && onSuccess(response),
      });
    }
  }

  private onFailed(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, response, disabled, onError} = p;

    if (!notifyMe) {
      onError(response);
      this.resolveProcess(p.key);
    } else {
      showToastMessage({
        type: 'error',
        position: 'top',
        topOffset: StatusBar.currentHeight + 30,
        text1: I18n.t('Base_Error'),
        text2:
          typeof response === 'string'
            ? response
            : I18n.t('Base_Loader_ProccessErrorMessage'),
        onPress: () => !disabled && onError(response),
      });
    }
  }

  resolveProcess(key: string) {
    const p = this.getProcess(key);

    if (!this._processMap.has(key)) {
      throw new Error(`Process with key ${p?.key} not found.`);
    }

    if (!p.completed) {
      throw new Error(`Could not resolve uncompleted process ${p.key}`);
    }

    const _p = {...p, resolved: true};
    this._processMap.set(p.key, _p);
    processStorage.saveProcess(_p);
  }

  private onStart(p: ProcessItem): ProcessItem {
    const __p = this.getProcess(p.key);
    const _p = {
      ...__p,
      loading: true,
      status: ProcessStatus.RUNNING,
      startedDate: new Date().toISOString(),
    };
    this._processMap.set(p.key, _p);
    processStorage.saveProcess(_p);

    this.incrementNumberOfRunningProcess();
    this.setNumberUnreadProcess(this._numberUnreadProcess + 1);

    this.on(p.key, EventType.COMPLETED, this.onCompleted);
    this.on(p.key, EventType.FAILED, this.onFailed);
    this.emit(p.key, EventType.STARTED);

    return _p;
  }

  private async executeProcess(p: ProcessItem, I18n: TranslatorProps) {
    const _p = this.getProcess(p.key);
    try {
      const response = await _p.process();
      this.onFinish(_p, ProcessStatus.COMPLETED, response, I18n);
    } catch (error) {
      this.onFinish(_p, ProcessStatus.FAILED, error, I18n);
    }
  }
}

export const processProvider = new ProcessProvider();
