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

interface ConfigContextState {
  showFilter: boolean;
  hideVirtualKeyboard: boolean;
  showActivityIndicator: boolean;
  showSubtitles: boolean;
  headerHeight: number;
  showBlockInteractionMessage: {show: boolean; message: string};
  setShowBlockInteractionMessage: (show: boolean, message: string) => void;
  setActivityIndicator: (option: boolean) => void;
  setShowSubtitles: (option: boolean) => void;
  setFilterConfig: (option: boolean) => void;
  toggleFilterConfig: () => void;
  setVirtualKeyboardConfig: (option: boolean) => void;
  toggleVirtualKeyboardConfig: () => void;
  setHeaderHeight: (height: number) => void;
}

interface ConfigAction {
  type: string;
  payload?: boolean | number | {show: boolean; message: string};
}

const defaultConfigContext = {
  showFilter: true,
  hideVirtualKeyboard: false,
  showActivityIndicator: false,
  showSubtitles: false,
  headerHeight: 115,
  showBlockInteractionMessage: {show: false, message: ''},
  setShowBlockInteractionMessage: () => {
    throw new Error(
      'ConfigProvider should be mounted to set showBlockInteractionMessage config',
    );
  },
  setActivityIndicator: () => {
    throw new Error('ConfigProvider should be mounted to set Indicator config');
  },
  setShowSubtitles: () => {
    throw new Error('ConfigProvider should be mounted to set subtitles config');
  },
  setFilterConfig: () => {
    throw new Error('ConfigProvider should be mounted to set filter config');
  },
  toggleFilterConfig: () => {
    throw new Error('ConfigProvider should be mounted to toggle filter config');
  },
  setVirtualKeyboardConfig: () => {
    throw new Error(
      'ConfigProvider should be mounted to set virtual keyboard config',
    );
  },
  toggleVirtualKeyboardConfig: () => {
    throw new Error(
      'ConfigProvider should be mounted to toggle virtual keyboard config',
    );
  },
  setHeaderHeight: () => {
    throw new Error(
      'ConfigProvider should be mounted to set header height config',
    );
  },
};

const ConfigContext = createContext<ConfigContextState>(defaultConfigContext);

const actionTypes = {
  setFilterConfig: 'setFilterConfig',
  toggleFilterConfig: 'toggleFilterConfig',
  setVirtualKeyboardConfig: 'setVirtualKeyboardConfig',
  setShowSubtitles: 'setShowSubtitles',
  toggleVirtualKeyboardConfig: 'toggleVirtualKeyboardConfig',
  setActivityIndicator: 'setActivityIndicator',
  setHeaderHeight: 'setHeaderHeight',
  setShowBlockInteractionMessage: 'setShowBlockInteractionMessage',
};

const configReducer = (
  state: ConfigContextState,
  action: ConfigAction,
): ConfigContextState => {
  switch (action.type) {
    case actionTypes.setShowBlockInteractionMessage: {
      return {
        ...state,
        showBlockInteractionMessage: action.payload as {
          show: boolean;
          message: string;
        },
      };
    }
    case actionTypes.setActivityIndicator: {
      return {
        ...state,
        showActivityIndicator: action.payload as boolean,
      };
    }
    case actionTypes.setShowSubtitles: {
      return {
        ...state,
        showSubtitles: action.payload as boolean,
      };
    }
    case actionTypes.setFilterConfig: {
      return {
        ...state,
        showFilter: action.payload as boolean,
      };
    }
    case actionTypes.toggleFilterConfig: {
      return {
        ...state,
        showFilter: !state.showFilter,
      };
    }
    case actionTypes.setVirtualKeyboardConfig: {
      return {
        ...state,
        hideVirtualKeyboard: action.payload as boolean,
      };
    }
    case actionTypes.toggleVirtualKeyboardConfig: {
      return {
        ...state,
        hideVirtualKeyboard: !state.hideVirtualKeyboard,
      };
    }
    case actionTypes.setHeaderHeight: {
      return {
        ...state,
        headerHeight: action.payload as number,
      };
    }
  }
};

const actions = {
  setShowBlockInteractionMessage: (show, message) => {
    return {
      type: actionTypes.setShowBlockInteractionMessage,
      payload: {show: show, message: message},
    };
  },
  setActivityIndicator: option => ({
    type: actionTypes.setActivityIndicator,
    payload: option,
  }),
  setShowSubtitles: option => ({
    type: actionTypes.setShowSubtitles,
    payload: option,
  }),
  setFilterConfig: option => ({
    type: actionTypes.setFilterConfig,
    payload: option,
  }),
  toggleFilterConfig: () => ({
    type: actionTypes.toggleFilterConfig,
  }),
  setVirtualKeyboardConfig: option => ({
    type: actionTypes.setVirtualKeyboardConfig,
    payload: option,
  }),
  toggleVirtualKeyboardConfig: () => ({
    type: actionTypes.toggleVirtualKeyboardConfig,
  }),
  setHeaderHeight: value => ({
    type: actionTypes.setHeaderHeight,
    payload: value,
  }),
};

export const ConfigProvider = ({children, showModulesSubtitle}) => {
  const [state, dispatch] = useReducer(configReducer, {
    ...defaultConfigContext,
    showSubtitles: showModulesSubtitle,
  });

  const setShowBlockInteractionMessage = useCallback((show, message) => {
    return dispatch(actions.setShowBlockInteractionMessage(show, message));
  }, []);
  const setActivityIndicator = useCallback(
    option => dispatch(actions.setActivityIndicator(option)),
    [],
  );
  const setShowSubtitles = useCallback(
    option => dispatch(actions.setShowSubtitles(option)),
    [],
  );
  const setFilterConfig = useCallback(
    option => dispatch(actions.setFilterConfig(option)),
    [],
  );
  const toggleFilterConfig = useCallback(
    () => dispatch(actions.toggleFilterConfig()),
    [],
  );
  const setVirtualKeyboardConfig = useCallback(
    option => dispatch(actions.setVirtualKeyboardConfig(option)),
    [],
  );
  const toggleVirtualKeyboardConfig = useCallback(
    () => dispatch(actions.toggleVirtualKeyboardConfig()),
    [],
  );
  const setHeaderHeight = useCallback(
    value => dispatch(actions.setHeaderHeight(value)),
    [],
  );
  const configContextState = useMemo<ConfigContextState>(
    () => ({
      ...state,
      setActivityIndicator,
      setShowSubtitles,
      setFilterConfig,
      toggleFilterConfig,
      setVirtualKeyboardConfig,
      toggleVirtualKeyboardConfig,
      setHeaderHeight,
      setShowBlockInteractionMessage,
    }),
    [
      setActivityIndicator,
      setShowSubtitles,
      setFilterConfig,
      setVirtualKeyboardConfig,
      state,
      toggleFilterConfig,
      toggleVirtualKeyboardConfig,
      setHeaderHeight,
      setShowBlockInteractionMessage,
    ],
  );

  return (
    <ConfigContext.Provider value={configContextState}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextState =>
  useContext<ConfigContextState>(ConfigContext);
