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

export type LoaderStatus = 'ok' | 'error' | undefined;

type callBack = () => void;

interface LoaderContextState {
  loading: boolean;
  notifyMe: boolean;
  showPopup: boolean;
  status: LoaderStatus;
  message: string;
  finished: boolean;
  disabled: boolean;
  onSuccessCallBack: () => void;
  onErrorCallBack: () => void;
  setLoading: (option: boolean) => void;
  setNotifyMe: (option: boolean) => void;
  setShowPopup: (option: boolean) => void;
  setStatus: (option: LoaderStatus) => void;
  setMessage: (message: string) => void;
  setFinished: (option: boolean) => void;
  setDisabled: (option: boolean) => void;
  setOnSuccessCallBack: (f: callBack) => void;
  setOnErrorCallBack: (f: callBack) => void;
}

interface LoaderAction {
  type: string;
  payload: boolean | string | callBack | LoaderStatus;
}

const defaultLoaderContext = {
  loading: false,
  notifyMe: false,
  showPopup: false,
  status: null,
  message: null,
  finished: false,
  disabled: false,
  onSuccessCallBack: () => {},
  onErrorCallBack: () => {},
  setLoading: () => {
    throw new Error('LoaderProvider should be mounted to set loading');
  },
  setNotifyMe: () => {
    throw new Error('LoaderProvider should be mounted to set notify me');
  },
  setShowPopup: () => {
    throw new Error('LoaderProvider should be mounted to set show popup');
  },
  setStatus: () => {
    throw new Error('LoaderProvider should be mounted to set status');
  },
  setMessage: () => {
    throw new Error('LoaderProvider should be mounted to set message');
  },
  setFinished: () => {
    throw new Error('LoaderProvider should be mounted to set finished');
  },
  setDisabled: () => {
    throw new Error('LoaderProvider should be mounted to set disabled');
  },
  setOnSuccessCallBack: () => {
    throw new Error(
      'LoaderProvider should be mounted to set on success callback',
    );
  },
  setOnErrorCallBack: () => {
    throw new Error(
      'LoaderProvider should be mounted to set on success callback',
    );
  },
};

const LoaderContext = createContext<LoaderContextState>(defaultLoaderContext);

const actionTypes = {
  setLoading: 'setLoading',
  setNotifyMe: 'setNotifyMe',
  setShowPopup: 'setShowPopup',
  setStatus: 'setStatus',
  setMessage: 'setMessage',
  setFinished: 'setFinished',
  setDisabled: 'setDisabled',
  setOnSuccessCallBack: 'setOnSuccessCallBack',
  setOnErrorCallBack: 'setOnErrorCallBack',
};

const LoaderReducer = (
  state: LoaderContextState,
  action: LoaderAction,
): LoaderContextState => {
  switch (action.type) {
    case actionTypes.setLoading: {
      return {
        ...state,
        loading: action.payload as boolean,
      };
    }
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
    case actionTypes.setStatus: {
      return {
        ...state,
        status: action.payload as LoaderStatus,
      };
    }
    case actionTypes.setMessage: {
      return {
        ...state,
        message: action.payload as string,
      };
    }
    case actionTypes.setFinished: {
      return {
        ...state,
        finished: action.payload as boolean,
      };
    }
    case actionTypes.setDisabled: {
      return {
        ...state,
        disabled: action.payload as boolean,
      };
    }
    case actionTypes.setOnSuccessCallBack: {
      return {
        ...state,
        onSuccessCallBack: action.payload as callBack,
      };
    }
    case actionTypes.setOnErrorCallBack: {
      return {
        ...state,
        onErrorCallBack: action.payload as callBack,
      };
    }
  }
};

const actions = {
  setLoading: option => ({
    type: actionTypes.setLoading,
    payload: option,
  }),
  setNotifyMe: option => ({
    type: actionTypes.setNotifyMe,
    payload: option,
  }),
  setShowPopup: option => ({
    type: actionTypes.setShowPopup,
    payload: option,
  }),
  setStatus: status => ({
    type: actionTypes.setStatus,
    payload: status,
  }),
  setMessage: message => ({
    type: actionTypes.setMessage,
    payload: message,
  }),
  setFinished: option => ({
    type: actionTypes.setFinished,
    payload: option,
  }),
  setDisabled: option => ({
    type: actionTypes.setDisabled,
    payload: option,
  }),
  setOnSuccessCallBack: f => ({
    type: actionTypes.setOnSuccessCallBack,
    payload: f,
  }),
  setOnErrorCallBack: f => ({
    type: actionTypes.setOnErrorCallBack,
    payload: f,
  }),
};

export const LoaderProvider = ({children}) => {
  const [state, dispatch] = useReducer(LoaderReducer, defaultLoaderContext);

  const setLoading = useCallback(
    option => dispatch(actions.setLoading(option)),
    [],
  );

  const setNotifyMe = useCallback(
    option => dispatch(actions.setNotifyMe(option)),
    [],
  );

  const setShowPopup = useCallback(
    option => dispatch(actions.setShowPopup(option)),
    [],
  );

  const setStatus = useCallback(
    status => dispatch(actions.setStatus(status)),
    [],
  );

  const setMessage = useCallback(
    message => dispatch(actions.setMessage(message)),
    [],
  );

  const setFinished = useCallback(
    option => dispatch(actions.setFinished(option)),
    [],
  );

  const setDisabled = useCallback(
    option => dispatch(actions.setDisabled(option)),
    [],
  );

  const setOnSuccessCallBack = useCallback(
    f => dispatch(actions.setOnSuccessCallBack(f)),
    [],
  );

  const setOnErrorCallBack = useCallback(
    f => dispatch(actions.setOnErrorCallBack(f)),
    [],
  );

  const LoaderContextState = useMemo<LoaderContextState>(
    () => ({
      ...state,
      setLoading,
      setNotifyMe,
      setShowPopup,
      setStatus,
      setMessage,
      setFinished,
      setDisabled,
      setOnSuccessCallBack,
      setOnErrorCallBack,
    }),
    [
      state,
      setLoading,
      setNotifyMe,
      setShowPopup,
      setStatus,
      setMessage,
      setFinished,
      setDisabled,
      setOnSuccessCallBack,
      setOnErrorCallBack,
    ],
  );

  return (
    <LoaderContext.Provider value={LoaderContextState}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextState =>
  useContext<LoaderContextState>(LoaderContext);
