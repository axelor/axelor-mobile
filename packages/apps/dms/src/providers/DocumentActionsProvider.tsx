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

import {useEffect, useState} from 'react';

type LeafActionBuilder = (item: any, context?: any) => any[];
type BranchActionBuilder = (branch: any, context?: any) => any[];

class DocumentActionsProvider {
  private leafBuilders: {[key: string]: LeafActionBuilder} = {};
  private branchBuilders: {[key: string]: BranchActionBuilder} = {};
  private callbacks: Function[] = [];

  registerLeafActions(key: string, builder: LeafActionBuilder) {
    this.leafBuilders[key] = builder;
    this.notify();
  }

  registerBranchActions(key: string, builder: BranchActionBuilder) {
    this.branchBuilders[key] = builder;
    this.notify();
  }

  private aggregate(
    builders: {[key: string]: (arg: any, context?: any) => any[]},
    arg: any,
    context?: any,
  ): any[] {
    const keyedActions = new Map<string, any>();
    const unkeyedActions: any[] = [];

    Object.values(builders).forEach(_builder => {
      (_builder(arg, context) ?? []).forEach(_action => {
        if (_action == null) return;

        if (_action.key != null) {
          keyedActions.set(_action.key, _action);
        } else {
          unkeyedActions.push(_action);
        }
      });
    });

    return [...keyedActions.values(), ...unkeyedActions];
  }

  getLeafActions(item: any, context?: any): any[] {
    return this.aggregate(this.leafBuilders, item, context);
  }

  getBranchActions(branch: any, context?: any): any[] {
    return this.aggregate(this.branchBuilders, branch, context);
  }

  registerCallback(callback: Function) {
    this.callbacks.push(callback);
  }

  unregisterCallback(callback: Function) {
    this.callbacks = this.callbacks.filter(_callback => _callback !== callback);
  }

  private notify() {
    this.callbacks.forEach(_callback => _callback());
  }
}

export const documentActionsProvider = new DocumentActionsProvider();

export const useDocumentActions = () => {
  const [, setRefresh] = useState(0);

  useEffect(() => {
    const callback = () => setRefresh(_value => _value + 1);
    documentActionsProvider.registerCallback(callback);

    return () => documentActionsProvider.unregisterCallback(callback);
  }, []);

  return {
    getLeafActions: (item: any, context?: any) =>
      documentActionsProvider.getLeafActions(item, context),
    getBranchActions: (branch: any, context?: any) =>
      documentActionsProvider.getBranchActions(branch, context),
  };
};
