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
import {MaintenanceError} from '@axelor/aos-mobile-error';

const MAINTENANCE_CODE = 503;

class MaintenanceManager {
  private refreshCallBack: Function[];
  private isMaintenance: boolean;

  constructor() {
    this.refreshCallBack = [];
    this.isMaintenance = false;
  }

  registerCallback(callBack: Function) {
    this.refreshCallBack.push(callBack);
  }

  unregisterCallback(callBack: Function) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.isMaintenance));
  }

  trigger() {
    this.isMaintenance = true;
    this.updateState();
  }
}

const maintenanceManager = new MaintenanceManager();

export const maintenanceMiddleware = (error: any): any => {
  if (error?.response?.status === MAINTENANCE_CODE) {
    maintenanceManager.trigger();
  }

  return Promise.reject(error);
};

export const useMaintenance = (): {isMaintenance: boolean} => {
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    maintenanceManager.registerCallback(setMaintenance);

    return () => maintenanceManager.unregisterCallback(setMaintenance);
  }, []);

  return useMemo(() => ({isMaintenance: maintenance}), [maintenance]);
};

export function MaintenanceTrigger() {
  const {isMaintenance} = useMaintenance();

  if (isMaintenance) throw new MaintenanceError();

  return null;
}
