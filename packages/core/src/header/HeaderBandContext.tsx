/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  filteredBands: HeaderBandItem[];
  filterHeaderBands: () => HeaderBandItem[];
  addHeaderBand: (band: HeaderBandItem) => void;
  upadateHeaderBand: (band: HeaderBandItem) => void;
  removeHeaderBand: (band: HeaderBandItem) => void;
}

interface HeaderBandAction {
  type: string;
  payload?: HeaderBandItem | UpdateHeaderBandActionPayload | string;
}

interface UpdateHeaderBandActionPayload {
  key: string;
  band: HeaderBandItem;
}

const defaultHeaderBandContext = {
  allBands: [],
  filteredBands: [],
  filterHeaderBands: () => {
    throw new Error(
      'HeaderBandProvider should be mounted to filter header band',
    );
  },
  addHeaderBand: () => {
    throw new Error('HeaderBandProvider should be mounted to add header band');
  },
  upadateHeaderBand: () => {
    throw new Error(
      'HeaderBandProvider should be mounted to update header band',
    );
  },
  removeHeaderBand: () => {
    throw new Error(
      'HeaderBandProvider should be mounted to remove header band',
    );
  },
};

const HeaderBandContext = createContext<HeaderBandContextState>(
  defaultHeaderBandContext,
);

const actionTypes = {
  fitlerHeaderBand: 'fitlerHeaderBand',
  addHeaderBand: 'addHeaderBand',
  upadateHeaderBand: 'upadateHeaderBand',
  removeHeaderBand: 'removeHeaderBand',
};

const headerBandReducer = (
  state: HeaderBandContextState,
  action: HeaderBandAction,
): HeaderBandContextState => {
  switch (action.type) {
    case actionTypes.addHeaderBand: {
      const _allBands = HeaderBandHelper.addHeaderBand(
        state.allBands,
        action.payload as HeaderBandItem,
      );

      return {
        ...state,
        allBands: _allBands,
        filteredBands: HeaderBandHelper.filterBands(_allBands),
      };
    }
    case actionTypes.upadateHeaderBand: {
      const {key, band} = action.payload as UpdateHeaderBandActionPayload;
      const _allBands = HeaderBandHelper.updateHeaderBand(
        state.allBands,
        key,
        band,
      );

      return {
        ...state,
        allBands: _allBands,
        filteredBands: HeaderBandHelper.filterBands(_allBands),
      };
    }
    case actionTypes.removeHeaderBand: {
      const _allBands = HeaderBandHelper.removeHeaderBand(
        state.allBands,
        action.payload as string,
      );

      return {
        ...state,
        allBands: _allBands,
        filteredBands: HeaderBandHelper.filterBands(_allBands),
      };
    }
    case actionTypes.fitlerHeaderBand: {
      return {
        ...state,
        filteredBands: HeaderBandHelper.filterBands(state.allBands),
      };
    }
  }
};

const actions = {
  addHeaderBand: band => ({
    type: actionTypes.addHeaderBand,
    payload: band,
  }),
  upadateHeaderBand: (key, band) => ({
    type: actionTypes.upadateHeaderBand,
    payload: {key, band},
  }),
  removeHeaderBand: key => ({
    type: actionTypes.removeHeaderBand,
    payload: key,
  }),
  fitlerHeaderBand: () => ({
    type: actionTypes.fitlerHeaderBand,
  }),
};

export const HeaderBandProvider = ({children}) => {
  const [state, dispatch] = useReducer(
    headerBandReducer,
    defaultHeaderBandContext,
  );

  const addHeaderBand = useCallback(
    band => dispatch(actions.addHeaderBand(band)),
    [],
  );

  const updateHeaderBand = useCallback(
    (key, band) => dispatch(actions.upadateHeaderBand(key, band)),
    [],
  );

  const removeHeaderBand = useCallback(
    key => dispatch(actions.removeHeaderBand(key)),
    [],
  );

  const fitlerHeaderBand = useCallback(
    () => dispatch(actions.fitlerHeaderBand()),
    [],
  );

  const headerBandContextState = useMemo<HeaderBandContextState>(
    () => ({
      ...state,
      addHeaderBand,
      updateHeaderBand,
      removeHeaderBand,
      fitlerHeaderBand,
    }),
    [
      state,
      addHeaderBand,
      updateHeaderBand,
      removeHeaderBand,
      fitlerHeaderBand,
    ],
  );

  return (
    <HeaderBandContext.Provider value={headerBandContextState}>
      {children}
    </HeaderBandContext.Provider>
  );
};

export const useHeaderBand = (): HeaderBandContextState =>
  useContext<HeaderBandContextState>(HeaderBandContext);
