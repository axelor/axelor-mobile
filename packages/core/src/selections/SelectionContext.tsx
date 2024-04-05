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

import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import {ModuleSelections, TypeConfig} from './types';
import {addModelSelections, formatSelections} from './selection.helpers';

interface ContextState {
  types: TypeConfig[];
  moduleConfigs: ModuleSelections;
  registerTypes: (type: TypeConfig) => void;
}

interface ContextAction {
  type: string;
  payload?: any;
}

const defaultValue = {
  types: [],
  moduleConfigs: [],
  registerTypes() {
    throw new Error('SelectionProvider should be mounted to register types');
  },
};

export const SelectionContext = createContext<ContextState>(defaultValue);

const actionTypes = {registerTypes: 'registerTypes'};

const selectionReducer = (
  state: ContextState,
  action: ContextAction,
): ContextState => {
  if (action.type === actionTypes.registerTypes) {
    return {...state, types: addModelSelections(state.types, action.payload)};
  }
};

const actions = {
  registerTypes: payload => ({
    type: actionTypes.registerTypes,
    payload,
  }),
};

export const SelectionProvider = ({
  children,
  typeConfigs,
}: {
  children?: ReactNode;
  typeConfigs: ModuleSelections;
}) => {
  const [state, dispatch] = useReducer(selectionReducer, {
    ...defaultValue,
    types: formatSelections(typeConfigs),
    moduleConfigs: typeConfigs,
  });

  const registerTypes = useCallback(
    (payload: TypeConfig) => dispatch(actions.registerTypes(payload)),
    [],
  );

  const contextState = useMemo<ContextState>(
    () => ({
      ...state,
      registerTypes,
    }),
    [registerTypes, state],
  );

  return (
    <SelectionContext.Provider value={contextState}>
      {children}
    </SelectionContext.Provider>
  );
};
