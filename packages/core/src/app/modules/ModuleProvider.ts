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

import {useEffect, useMemo, useState} from 'react';
import {Module} from './types';

class ModuleProvider {
  private modules: Module[];
  private refreshCallBack: Function[];

  constructor() {
    this.modules = [];
    this.refreshCallBack = [];
  }

  init(_modules: Module[]) {
    this.modules = _modules ?? [];
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

  useEffect(() => {
    modulesProvider.registerCallback(data => setModules([...data]));

    return () => {
      modulesProvider.unregisterCallback(setModules);
    };
  }, []);

  return useMemo(
    () => ({
      modules,
      checkModule: moduleName =>
        modules.find(({name}) => name === moduleName) != null,
    }),
    [modules],
  );
};
