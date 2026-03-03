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

import {StatusBar} from 'react-native';
import {showToastMessage} from '../utils';
import {TranslatorProps} from '../i18n';
import {processStorage} from './ProcessStorage';
import {
  CallBack,
  Event,
  ProcessItem,
  ProcessOption,
  ProcessStatus,
} from './types';

type NRProcessChangeCallback = (newNumber: number) => void;

class ProcessProvider {
  private _events: Map<string, Event>;
  private _processMap: Map<string, ProcessItem>;
  private _numberRunningProcess: number;
  private _NRProcessSubscribers: NRProcessChangeCallback[] = [];
  private _numberUnreadProcess: number;

  constructor() {
    this._events = new Map();
    this._processMap = new Map(
      processStorage.getProcessList().map(p => [p.key, p]),
    );
    this._numberRunningProcess = 0;
    this._NRProcessSubscribers = [];
    this._numberUnreadProcess = processStorage.getNumberUnreadProcess();
    this.onCompleted = this.onCompleted.bind(this);
    this.removeOldProcesses = this.removeOldProcesses.bind(this);
  }

  getNumberRunningProcess() {
    return this._numberRunningProcess;
  }

  setNumberRunningProcess(value) {
    this._numberRunningProcess = value;
    this.notifyNRProcessSubscribers();
  }

  subscribeNRProcess(callback) {
    this._NRProcessSubscribers.push(callback);
  }

  unsubscribeNRProcess(callback) {
    this._NRProcessSubscribers = this._NRProcessSubscribers.filter(
      sub => sub !== callback,
    );
  }

  private notifyNRProcessSubscribers() {
    this._NRProcessSubscribers.forEach(callback =>
      callback(this._numberRunningProcess),
    );
  }

  setNumberUnreadProcess(value) {
    this._numberUnreadProcess = value;
    processStorage.saveNumberUnreadProcess(value);
  }

  registerProcess(key: string, processOptions: ProcessOption): ProcessItem {
    const process = {
      ...processOptions,
      key,
      loading: false,
      notifyMe: false,
      response: null,
      status: null,
      executed: false,
      startedDate: null,
      endDate: null,
    };

    this._processMap.set(key, process);
    processStorage.saveProcess(process);

    return process;
  }

  private getProcess(key: string): ProcessItem {
    if (!this._processMap.has(key)) {
      console.error(`Process with key ${key} not found.`);
      return null;
    }

    return this._processMap.get(key);
  }

  async runProcess(key: string, I18n: TranslatorProps) {
    const process = this.getProcess(key);

    if (!this._processMap.has(key)) {
      throw new Error(`Process with key ${process.key} not found.`);
    }

    this.onStart(key);
    this.executeProcess(key, I18n);
  }

  private onStart(key: string) {
    const process = this.getProcess(key);

    const _process = {
      ...process,
      loading: true,
      status: ProcessStatus.InProgress,
      startedDate: new Date().toISOString(),
    };
    this._processMap.set(key, _process);
    processStorage.saveProcess(_process);

    this.on(key, ProcessStatus.Success, this.onCompleted);
    this.on(key, ProcessStatus.Failed, this.onCompleted);
    this.emit(key, ProcessStatus.InProgress);

    this.setNumberRunningProcess(this._numberRunningProcess + 1);
    this.setNumberUnreadProcess(this._numberUnreadProcess + 1);
  }

  private async executeProcess(key: string, I18n: TranslatorProps) {
    const process = this.getProcess(key);

    try {
      const response = await process.process();
      this.onFinish(key, ProcessStatus.Success, response, I18n);
    } catch (error) {
      this.onFinish(key, ProcessStatus.Failed, error, I18n);
    }
  }

  on(key: string, event: ProcessStatus, callBack: CallBack) {
    const _event = this._events.has(key)
      ? this._events.get(key)
      : ({} as Event);

    if (!_event[event]) {
      _event[event] = [];
    }

    _event[event].push(callBack);

    this._events.set(key, _event);
  }

  private emit(key: string, event: ProcessStatus, ...args) {
    if (this._events.has(key) && this._events.get(key)[event]) {
      this._events.get(key)[event].forEach(callBack => callBack(...args));
    }
  }

  private onFinish(
    key: string,
    status: ProcessStatus,
    response: any,
    I18n: TranslatorProps,
  ) {
    const process = this.getProcess(key);

    const _process = {
      ...process,
      loading: false,
      response,
      status,
      endDate: new Date().toISOString(),
    };
    this._processMap.set(key, _process);
    processStorage.saveProcess(_process);

    this.emit(
      key,
      status === ProcessStatus.Success
        ? ProcessStatus.Success
        : ProcessStatus.Failed,
      _process,
      I18n,
    );

    this.setNumberRunningProcess(this._numberRunningProcess - 1);
  }

  private onCompleted(process: ProcessItem, I18n: TranslatorProps) {
    const _process = this.getProcess(process.key);
    const {status, notifyMe, response, disabled, onSuccess, onError} = _process;

    const isSuccess = status === ProcessStatus.Success;

    const handleEndOfProcess = () => {
      isSuccess ? onSuccess(response) : onError(response);
      this.resolveProcess(_process.key);
    };

    if (!notifyMe) {
      handleEndOfProcess();
    } else {
      showToastMessage({
        type: isSuccess ? 'success' : 'error',
        position: 'top',
        topOffset: StatusBar.currentHeight + 30,
        text1: I18n.t(isSuccess ? 'Base_Success' : 'Base_Error'),
        text2:
          typeof response === 'string'
            ? response
            : I18n.t(
                isSuccess
                  ? 'Base_Loader_ProccessSuccessMessage'
                  : 'Base_Loader_ProccessErrorMessage',
              ),
        onPress: () => !disabled && handleEndOfProcess(),
      });
    }
  }

  resolveProcess(key: string) {
    const process = this.getProcess(key);

    if (!this._processMap.has(key)) {
      throw new Error(`Process with key ${key} not found.`);
    }

    const _process = {
      ...process,
      executed: true,
    };
    this._processMap.set(key, _process);
    processStorage.saveProcess(_process);
  }

  notifyMe(key: string) {
    const process = this.getProcess(key);

    process.notifyMe = true;
    this._processMap.set(key, process);
    processStorage.saveProcess(process);
  }

  removeOldProcesses() {
    const now = new Date();
    const processList = processStorage.getProcessList();
    const processSortedByDate = processList.sort((a, b) =>
      new Date(a.startedDate) <= new Date(b.startedDate) ? 1 : -1,
    );

    let processesLessThanOneMonthOld = [];

    for (const process of processSortedByDate) {
      const removeDate = new Date(process.startedDate);
      removeDate.setMonth(removeDate.getMonth() + 1);

      if (removeDate >= now) {
        processesLessThanOneMonthOld.push(process);
      } else {
        break;
      }
    }

    if (this._numberRunningProcess > processesLessThanOneMonthOld.length) {
      this.setNumberUnreadProcess(processesLessThanOneMonthOld.length);
    }

    processStorage.saveProcessList(processesLessThanOneMonthOld);
  }
}

export const processProvider = new ProcessProvider();
