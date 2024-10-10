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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {useIsFocused} from '../hooks/use-navigation';
import {Module, Tool} from '../app';
import {addModuleTools, addToolDefaultValues} from './module.helper';

class ActiveScreenProvider {
  private screenName: string;
  private screenContext: any;
  private tools: Tool[];
  private refreshCallBack: Function[];

  constructor() {
    this.screenName = null;
    this.screenContext = null;
    this.tools = [];
    this.refreshCallBack = [];
  }

  registerCallback(callBack: Function) {
    this.refreshCallBack.push(callBack);
  }

  unregisterCallback(callBack: Function) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  registerActiveScreen(state: any) {
    this.screenName = state?.routes?.at(-1)?.name;
    this.screenContext = null;
    this.updateState();
  }

  registerScreenContext(context: any) {
    this.screenContext = context;
    this.updateState();
  }

  registerScreenTools(modules: Module[]) {
    this.tools = modules
      .filter(_m => _m.globalTools?.length > 0)
      .reduce(addModuleTools, [])
      .map(addToolDefaultValues);

    this.updateState();
  }

  private updateState() {
    this.refreshCallBack.forEach(_f =>
      _f({
        screenName: this.screenName,
        screenContext: this.screenContext,
        registeredTools: this.tools,
      }),
    );
  }
}

export const activeScreenProvider = new ActiveScreenProvider();

export const useActiveScreen = () => {
  const [activeScreen, setActiveScreen] = useState<string>();
  const [context, setContext] = useState<any>();
  const [tools, setTools] = useState<Tool[]>([]);

  const refreshData = useCallback(
    ({screenName, screenContext, registeredTools}) => {
      setActiveScreen(screenName);
      setContext(screenContext);
      setTools(registeredTools);
    },
    [],
  );

  useEffect(() => {
    activeScreenProvider.registerCallback(refreshData);

    return () => {
      activeScreenProvider.unregisterCallback(refreshData);
    };
  }, [refreshData]);

  return useMemo(
    () => ({name: activeScreen, context, tools}),
    [activeScreen, context, tools],
  );
};

export const useContextRegister = (data: any) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      activeScreenProvider.registerScreenContext(data);
    }
  }, [data, isFocused]);
};
