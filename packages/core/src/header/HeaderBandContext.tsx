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

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {HeaderBandItem} from './types';
import {HeaderBandHelper} from './header-band-context.helper';

interface HeaderBandContextState {
  allBands: HeaderBandItem[];
  registerHeaderBand: (band: HeaderBandItem) => void;
}

interface HeaderBandAction {
  type: string;
  payload: HeaderBandItem;
}

const defaultHeaderBandContext = {
  allBands: [],
  registerHeaderBand: () => {
    throw new Error(
      'HeaderBandProvider should be mounted to register header band',
    );
  },
};

const HeaderBandContext = createContext<HeaderBandContextState>(
  defaultHeaderBandContext,
);

const actionTypes = {
  registerHeaderBand: 'registerHeaderBand',
};

const headerBandReducer = (
  state: HeaderBandContextState,
  action: HeaderBandAction,
): HeaderBandContextState => {
  switch (action.type) {
    case actionTypes.registerHeaderBand: {
      return {
        ...state,
        allBands: HeaderBandHelper.registerHeaderBand(
          state.allBands,
          action.payload as HeaderBandItem,
        ),
      };
    }
  }
};

const actions = {
  registerHeaderBand: band => ({
    type: actionTypes.registerHeaderBand,
    payload: band,
  }),
};

export const HeaderBandProvider = ({children}) => {
  const [state, dispatch] = useReducer(
    headerBandReducer,
    defaultHeaderBandContext,
  );

  const registerHeaderBand = useCallback(
    band => dispatch(actions.registerHeaderBand(band)),
    [],
  );

  const headerBandContextState = useMemo<HeaderBandContextState>(
    () => ({
      ...state,
      registerHeaderBand: registerHeaderBand,
    }),
    [state, registerHeaderBand],
  );

  return (
    <HeaderBandContext.Provider value={headerBandContextState}>
      {children}
    </HeaderBandContext.Provider>
  );
};

export const useHeaderBand = (): HeaderBandContextState =>
  useContext<HeaderBandContextState>(HeaderBandContext);
