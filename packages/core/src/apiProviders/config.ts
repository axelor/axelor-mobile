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

export class ApiProviderConfig {
  static allowConnectionBlock: boolean = false;

  private sessionExpired: boolean = false;
  private refreshCallBack: Function;

  constructor() {
    this.refreshCallBack = () => {};
  }

  register(callBack) {
    this.refreshCallBack = callBack;
  }

  private updateState() {
    this.refreshCallBack(this.sessionExpired);
  }

  setSessionExpired(_sessionExpired: boolean) {
    this.sessionExpired = _sessionExpired;

    this.updateState();
  }

  getSessionExpired(): boolean {
    return this.sessionExpired;
  }
}

export const apiProviderConfig = new ApiProviderConfig();

export const useSessionExpired = () => {
  const [sessionExpired, setSessionExpired] = useState();

  useEffect(() => {
    apiProviderConfig.register(setSessionExpired);
  }, []);

  return useMemo(() => ({sessionExpired: sessionExpired}), [sessionExpired]);
};
