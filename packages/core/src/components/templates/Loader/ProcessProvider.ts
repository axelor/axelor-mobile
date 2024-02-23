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

class ProcessProvider {
  private _events: Map<string, Event>;
  private _processMap: Map<string, ProcessItem>;

  constructor() {
    this._events = new Map();
    this._processMap = new Map();
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
      notifyMe: false,
      message: null,
      status: null,
      completed: false,
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
    });

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
      onSuccess();
    } else {
      showToastMessage({
        type: 'success',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Success'),
        text2: message || I18n.t('Base_Loader_ProccessSuccessMessage'),
        onPress: () => !disabled && onSuccess(),
      });
    }
  }

  private onFailed(p: ProcessItem, I18n: TranslatorProps) {
    const {notifyMe, message, disabled, onError} = p;
    if (!notifyMe) {
      onError();
    } else {
      showToastMessage({
        type: 'error',
        position: 'top',
        topOffset: 30,
        text1: I18n.t('Base_Error'),
        text2: message || I18n.t('Base_Loader_ProccessErrorMessage'),
        onPress: () => !disabled && onError(),
      });
    }
  }

  private onStart(p: ProcessItem) {
    this._processMap.set(p.key, {
      ...p,
      loading: true,
      status: ProcessStatus.RUNNING,
    });

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
