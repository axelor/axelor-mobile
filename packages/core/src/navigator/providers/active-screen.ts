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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {Module, Tool} from '../../app';
import {useIsFocused} from '../../hooks';
import {addModuleTools, addToolDefaultValues} from '../helpers';

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

interface Model {
  model: string;
  key?: string;
  id?: number;
  ids?: number[];
  [key: string]: any;
}

interface Data {
  models?: Model[];
  [key: string]: any;
}

export const useContextRegister = (data: Data) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      activeScreenProvider.registerScreenContext(data);
    }
  }, [data, isFocused]);
};

const computeModelIds = (model: Model): undefined | number | number[] => {
  if (!model) {
    return undefined;
  }

  const {id, ids} = model;

  if (Array.isArray(ids) && ids.length > 0) {
    const filteredIds = ids.filter(
      (item, idx, self) =>
        item != null && self.findIndex(_i => _i === item) === idx,
    );

    if (filteredIds.length > 0) return filteredIds;
  }

  if (id) return id;

  return undefined;
};

const isModelMatch = (model: Model, modelName: string, key: string) => {
  const isBaseMatch =
    model.model === modelName && computeModelIds(model) != null;

  if (!isBaseMatch) return false;

  if (key) return model.key === key;

  return true;
};

export const isModel = (
  context: Data,
  model: string,
  key?: string,
): boolean => {
  if (!Array.isArray(context?.models) || context?.models.length === 0) {
    return false;
  }

  return context?.models.some(m => isModelMatch(m, model, key));
};

export const getModelId = (
  context: Data,
  model: string,
  key?: string,
): undefined | number | number[] => {
  if (!Array.isArray(context?.models) || context?.models.length === 0) {
    return undefined;
  }

  const foundModel = context?.models.find(m => isModelMatch(m, model, key));

  return computeModelIds(foundModel);
};
