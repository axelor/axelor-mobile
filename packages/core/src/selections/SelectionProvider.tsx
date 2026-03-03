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
import {fetchMetaConfig} from './api.helpers';
import {
  ModelSelection,
  ModuleSelections,
  SelectionItem,
  SelectionFields,
  TypeConfig,
} from './types';

class SelectionProvider {
  private moduleSelections: ModuleSelections;
  private typeconfigs: TypeConfig[];
  private refreshCallBack: Function[];

  constructor() {
    this.moduleSelections = [];
    this.typeconfigs = [];
    this.refreshCallBack = [];
  }

  init(models: ModuleSelections) {
    this.moduleSelections = models;
  }

  registerCallback(fct) {
    this.refreshCallBack.push(fct);
  }

  unregisterCallback(fct) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== fct);
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.typeconfigs));
  }

  registerTypes() {
    this.moduleSelections.forEach(config => {
      this.fetchConfigs(config);
    });
  }

  private async fetchConfigs({modelName, specificKey, fields}: ModelSelection) {
    const metaFields = await fetchMetaConfig({modelName});
    const modelSelections: SelectionFields = {};

    Object.entries(fields).forEach(([name, {content, useWebContent}]) => {
      const selectConfig: any = useWebContent
        ? metaFields.find(_i => _i.name === name).selectionList
        : content;

      modelSelections[name] = {
        list: selectConfig
          .map(_i => {
            const value =
              typeof _i.value === 'boolean' || Number.isNaN(Number(_i.value))
                ? _i.value
                : Number(_i.value);
            const moduleContent: SelectionItem = content.find(
              _s => _s.value === value,
            );

            return {
              ...(moduleContent ?? {}),
              title: _i.title ?? moduleContent?.title,
              value: value,
              order: _i.order ?? moduleContent?.order,
              color: _i.color ?? moduleContent?.color,
              key: moduleContent?.key,
            } as SelectionItem;
          })
          .sort((a, b) =>
            a.order === b.order ? a.value - b.value : a.order - b.order,
          ),
      };
    });

    this.typeconfigs = [
      ...this.typeconfigs,
      {modelName, specificKey, selections: modelSelections},
    ];

    this.updateState();
  }

  getTypes(): TypeConfig[] {
    return this.typeconfigs;
  }
}

const selectionProvider = new SelectionProvider();

export function initSelections(models: ModuleSelections) {
  return selectionProvider.init(models);
}

export function registerTypes() {
  return selectionProvider.registerTypes();
}

export function getSelectionTypes(): TypeConfig[] {
  return selectionProvider.getTypes();
}

export function useTypeConfigs(): {typeConfigs: TypeConfig[]} {
  const [typeConfigs, setTypeConfigs] = useState<TypeConfig[]>(
    selectionProvider.getTypes(),
  );

  useEffect(() => {
    selectionProvider.registerCallback(options => setTypeConfigs([...options]));

    return () => {
      selectionProvider.unregisterCallback(setTypeConfigs);
    };
  }, []);

  return useMemo(() => ({typeConfigs}), [typeConfigs]);
}
