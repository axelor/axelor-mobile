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

//TODO: resolve toast press
class ProcessProvider {
  private _events: Map<string, Event>;
  private _processMap: Map<string, ProcessItem>;
  private _processList: ProcessItem[];
  private _numberRunningProcess: number;

  constructor() {
    this._events = new Map();
    this._processList = processStorage.getProcessList();
    this._processMap = new Map(this._processList.map(p => [p.key, p]));
    this._numberRunningProcess = 0;

    this.onCompleted = this.onCompleted.bind(this);
    this.onFailed = this.onFailed.bind(this);
  }

  get numberRunningProcess() {
    return this._numberRunningProcess;
  }

  get numberUnresolvedProcess() {
    return this._processList.filter(p => p.completed && !p.resolved).length;
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
    p.notifyMe = true;
    this._processMap.set(p.key, p);
    processStorage.saveProcess(p);
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
    const _p = {
      ...p,
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
    this.resolveProcess(_p);

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
      this.resolveProcess(p);
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
        onPress: () => !disabled && onSuccess(response),
      });
    }
  }

  private onFailed(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, response, disabled, onError} = p;

    if (!notifyMe) {
      onError(response);
      this.resolveProcess(p);
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
        onPress: () => !disabled && onError(response),
      });
    }
  }

  private incrementNumberOfRunningProcess() {
    this._numberRunningProcess++;
  }

  private decrementNumberOfRunningProcess() {
    this._numberRunningProcess = Math.max(0, this._numberRunningProcess - 1);
  }

  private resolveProcess(p: ProcessItem) {
    if (!this._processMap.has(p?.key)) {
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
    const _p = {
      ...p,
      loading: true,
      status: ProcessStatus.RUNNING,
      startedDate: new Date().toISOString(),
    };
    this._processMap.set(p.key, _p);
    processStorage.saveProcess(_p);

    this.incrementNumberOfRunningProcess();

    this.on(p.key, EventType.COMPLETED, this.onCompleted);
    this.on(p.key, EventType.FAILED, this.onFailed);
    this.emit(p.key, EventType.STARTED);

    return _p;
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
