/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from '../../redux/hooks';
import {checkModulesMenusAccessibility} from '../../navigator';
import {Module} from './types';

class ModuleProvider {
  private modules: Module[];
  private moduleRegisters: Function[];
  private refreshCallBack: Function[];

  constructor() {
    this.modules = [];
    this.moduleRegisters = [];
    this.refreshCallBack = [];
  }

  init(_modules: Module[], _moduleRegisters: Function[]) {
    this.modules = _modules ?? [];
    this.moduleRegisters = _moduleRegisters ?? [];
    this.updateState();
  }

  registerCallback(callBack: Function) {
    this.refreshCallBack.push(callBack);
  }

  unregisterCallback(callBack: Function) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  registerModule(_module: Module) {
    if (this.modules.find(({name}) => name === _module.name) == null) {
      this.modules = [...this.modules, _module];
    } else {
      this.modules = this.modules.map(_m => {
        if (_m.name === _module.name) {
          return _module;
        } else {
          return _m;
        }
      });
    }

    this.updateState();
  }

  getModules() {
    return this.modules;
  }

  getModuleRegisters(): Function[] {
    return this.moduleRegisters;
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.modules));
  }
}

export const modulesProvider = new ModuleProvider();

export const useModules = (): {
  modules: Module[];
  checkModule: (name: string) => boolean;
} => {
  const [modules, setModules] = useState<Module[]>(
    modulesProvider.getModules(),
  );
  const {mobileSettings} = useSelector(state => state.appConfig);

  const _modules = useMemo(
    () => checkModulesMenusAccessibility(modules, mobileSettings?.apps),
    [mobileSettings?.apps, modules],
  );

  const refreshData = useCallback(
    (data: Module[]) => setModules([...data]),
    [],
  );

  useEffect(() => {
    modulesProvider.registerCallback(refreshData);

    return () => {
      modulesProvider.unregisterCallback(refreshData);
    };
  }, [refreshData]);

  return useMemo(
    () => ({
      modules: _modules,
      checkModule: moduleName =>
        _modules.find(({name}) => name === moduleName) != null,
    }),
    [_modules],
  );
};
