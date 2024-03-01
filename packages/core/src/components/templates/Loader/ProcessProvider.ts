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

// TODO: add register process to all process list
class ProcessProvider {
  private _events: Map<string, Event>;
  private _processMap: Map<string, ProcessItem>;
  private _allProcessList: ProcessItem[];
  private _numberRunningProcess: number;
  private _numberUnresolvedProcess: number;

  constructor() {
    this._numberRunningProcess = 0;
    this._numberUnresolvedProcess = 0;
    this._events = new Map();
    this._processMap = new Map();

    this._allProcessList = [
      {
        key: '1645554000001',
        name: 'Process 1',
        disabled: false,
        loading: false,
        notifyMe: true,
        status: ProcessStatus.RUNNING,
        message: 'Process is running...',
        completed: false,
        resolved: false,
        startedDate: '2024-03-01T08:00:00.000Z',
        completedDate: null,
        failedDate: null,
        process: async () => {
          return new Promise(resolve => {
            setTimeout(resolve, 3000);
          });
        },
        onSuccess: () => {
          console.log('Process completed successfully');
        },
        onError: () => {
          console.error('Error occurred during process');
        },
      },
      {
        key: '1645554100001',
        name: 'Process 2',
        disabled: true,
        loading: false,
        notifyMe: false,
        status: ProcessStatus.COMPLETED,
        message: 'Process completed',
        completed: true,
        resolved: true,
        startedDate: '2023-01-16T10:30:00.000Z',
        completedDate: '2023-01-16T11:45:00.000Z',
        failedDate: null,
        process: async () => {
          return new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
        },
        onSuccess: () => {
          console.log('Process completed successfully');
        },
        onError: () => {
          console.error('Error occurred during process');
        },
      },
      {
        key: '1645554000000',
        name: 'Process 3',
        disabled: false,
        loading: false,
        notifyMe: true,
        status: ProcessStatus.RUNNING,
        message: 'Process is running...',
        completed: false,
        resolved: false,
        startedDate: '2023-01-17T12:45:00.000Z',
        completedDate: null,
        failedDate: null,
        process: async () => {
          return new Promise(resolve => {
            setTimeout(resolve, 3000);
          });
        },
        onSuccess: () => {
          console.log('Process completed successfully');
        },
        onError: () => {
          console.error('Error occurred during process');
        },
      },
      {
        key: '1645554100000',
        name: 'Process 4',
        disabled: true,
        loading: false,
        notifyMe: false,
        status: ProcessStatus.COMPLETED,
        message: 'Process completed',
        completed: true,
        resolved: true,
        startedDate: '2023-01-20T09:30:00.000Z',
        completedDate: '2023-01-20T09:35:00.000Z',
        failedDate: null,
        process: async () => {
          return new Promise(resolve => {
            setTimeout(resolve, 2000);
          });
        },
        onSuccess: () => {
          console.log('Process completed successfully');
        },
        onError: () => {
          console.error('Error occurred during process');
        },
      },
      {
        key: '1645554200000',
        name: 'Process 5',
        disabled: false,
        loading: false,
        notifyMe: true,
        status: ProcessStatus.FAILED,
        message: 'Process failed',
        completed: true,
        resolved: false,
        startedDate: '2024-03-01T01:00:00.000Z',
        completedDate: null,
        failedDate: '2024-03-01T11:15:00.000Z',
        process: async () => {
          return new Promise((resolve, reject) => {
            setTimeout(reject, 1500);
          });
        },
        onSuccess: () => {
          console.log('Process completed successfully');
        },
        onError: () => {
          console.error('Error occurred during process');
        },
      },
    ];
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
      message: null,
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
    message: string,
    I18n: TranslatorProps,
  ) {
    this._processMap.set(p.key, {
      ...p,
      status,
      loading: false,
      message: message,
      completed: true,
      completedDate:
        status === ProcessStatus.COMPLETED && new Date().toISOString(),
      failedDate: status === ProcessStatus.FAILED && new Date().toISOString(),
    });

    this.decrementNumberOfRunningProcess();

    this.emit(
      p.key,
      status === ProcessStatus.COMPLETED
        ? EventType.COMPLETED
        : EventType.FAILED,
      p,
      I18n,
    );
  }

  private onCompleted(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, message, disabled, onSuccess} = p;
    if (!notifyMe) {
      this.onFinishCallBack(p.key, onSuccess);
    } else {
      showToastMessage({
        type: 'success',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Success'),
        text2: message || I18n.t('Base_Loader_ProccessSuccessMessage'),
        onPress: () => !disabled && this.onFinishCallBack(p.key, onSuccess),
      });
    }
  }

  private onFailed(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, message, disabled, onError} = p;
    if (!notifyMe) {
      this.onFinishCallBack(p.key, onError);
    } else {
      showToastMessage({
        type: 'error',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Error'),
        text2: message || I18n.t('Base_Loader_ProccessErrorMessage'),
        onPress: () => !disabled && this.onFinishCallBack(p.key, onError),
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

  private onFinishCallBack(key: string, cb: callBack) {
    this.resolveProcess(key);
    cb();
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
