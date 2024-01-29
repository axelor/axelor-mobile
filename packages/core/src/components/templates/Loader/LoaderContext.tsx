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
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

interface LoaderContextState {
  notifyMe: boolean;
  showPopup: boolean;
  getCurrentNotifyMe: () => boolean;
  setNotifyMe: (option: boolean) => void;
  setShowPopup: (option: boolean) => void;
}

interface LoaderAction {
  type: string;
  payload: boolean;
}

const defaultLoaderContext = {
  notifyMe: false,
  showPopup: false,
  getCurrentNotifyMe: () => {
    throw new Error(
      'LoaderProvider should be mounted to get current notify me',
    );
  },
  setNotifyMe: () => {
    throw new Error('LoaderProvider should be mounted to set notify me');
  },
  setShowPopup: () => {
    throw new Error('LoaderProvider should be mounted to show popup');
  },
};

const LoaderContext = createContext<LoaderContextState>(defaultLoaderContext);

const actionTypes = {
  getCurrentNotifyMe: 'getCurrentNotifyMe',
  setNotifyMe: 'setNotifyMe',
  setShowPopup: 'setShowPopup',
};

const LoaderReducer = (
  state: LoaderContextState,
  action: LoaderAction,
): LoaderContextState => {
  switch (action.type) {
    case actionTypes.setNotifyMe: {
      return {
        ...state,
        notifyMe: action.payload as boolean,
      };
    }
    case actionTypes.setShowPopup: {
      return {
        ...state,
        showPopup: action.payload as boolean,
      };
    }
  }
};

const actions = {
  setNotifyMe: option => ({
    type: actionTypes.setNotifyMe,
    payload: option,
  }),
  setShowPopup: option => ({
    type: actionTypes.setShowPopup,
    payload: option,
  }),
};

export const LoaderProvider = ({children}) => {
  const [state, dispatch] = useReducer(LoaderReducer, defaultLoaderContext);

  const getCurrentNotifyMe = useCallback(() => {
    console.log('getCurrentNotifyMe', state.notifyMe);
    return state.notifyMe;
  }, [state]);

  const setNotifyMe = useCallback(option => {
    console.log('setNotifyMe', option);
    dispatch(actions.setNotifyMe(option));
  }, []);

  const setShowPopup = useCallback(
    option => dispatch(actions.setShowPopup(option)),
    [],
  );

  const LoaderContextState = useMemo<LoaderContextState>(
    () => ({
      ...state,
      getCurrentNotifyMe,
      setNotifyMe,
      setShowPopup,
    }),
    [state, getCurrentNotifyMe, setNotifyMe, setShowPopup],
  );

  return (
    <LoaderContext.Provider value={LoaderContextState}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextState =>
  useContext<LoaderContextState>(LoaderContext);
