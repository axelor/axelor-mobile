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
import {Color} from '../theme';

interface Action {
  iconName?: string;
  title: string;
  onPress: () => void;
  color?: Color;
}

interface BlockInteractionConfig {
  style?: any;
  visible: boolean;
  message: string;
  actionItems: Action[];
}

interface ConfigContextState {
  showFilter: boolean;
  hideVirtualKeyboard: boolean;
  showActivityIndicator: boolean;
  headerHeight: number;
  isHeaderIndicatorVisible: boolean;
  headerIndicatorState: HeaderIndicatorState;
  blockInteractionConfig: BlockInteractionConfig;
  setBlockInteractionConfig: (config: BlockInteractionConfig) => void;
  setActivityIndicator: (option: boolean) => void;
  setFilterConfig: (option: boolean) => void;
  toggleFilterConfig: () => void;
  setVirtualKeyboardConfig: (option: boolean) => void;
  toggleVirtualKeyboardConfig: () => void;
  setHeaderHeight: (height: number) => void;
  setIsHeaderIndicatorVisible: (option: boolean) => void;
  setHeaderIndicatorState: (state: HeaderIndicatorState) => void;
}

interface ConfigAction {
  type: string;
  payload?: boolean | number | HeaderIndicatorState | BlockInteractionConfig;
}

interface HeaderIndicatorState {
  text: string;
  color?: string;
  textColor?: string;
}

const defaultConfigContext = {
  showFilter: true,
  hideVirtualKeyboard: false,
  showActivityIndicator: false,
  headerHeight: 115,
  isHeaderIndicatorVisible: false,
  headerIndicatorState: {
    text: '',
  },
  blockInteractionConfig: {
    visible: false,
    message: '',
    actionItems: [],
  },
  setBlockInteractionConfig: () => {
    throw new Error(
      'ConfigProvider should be mounted to set blockInteractionConfig config',
    );
  },
  setActivityIndicator: () => {
    throw new Error('ConfigProvider should be mounted to set Indicator config');
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
  setIsHeaderIndicatorVisible: () => {
    throw new Error(
      'ConfigProvider should be mounted to set is header indicator visible config',
    );
  },
  setHeaderIndicatorState: () => {
    throw new Error(
      'ConfigProvider should be mounted to set header indicator state config',
    );
  },
};

const ConfigContext = createContext<ConfigContextState>(defaultConfigContext);

const actionTypes = {
  setFilterConfig: 'setFilterConfig',
  toggleFilterConfig: 'toggleFilterConfig',
  setVirtualKeyboardConfig: 'setVirtualKeyboardConfig',
  toggleVirtualKeyboardConfig: 'toggleVirtualKeyboardConfig',
  setActivityIndicator: 'setActivityIndicator',
  setHeaderHeight: 'setHeaderHeight',
  setIsHeaderIndicatorVisible: 'setIsHeaderIndicatorVisible',
  setHeaderIndicatorState: 'setHeaderIndicatorState',
  setBlockInteractionConfig: 'setBlockInteractionConfig',
};

const configReducer = (
  state: ConfigContextState,
  action: ConfigAction,
): ConfigContextState => {
  switch (action.type) {
    case actionTypes.setBlockInteractionConfig: {
      return {
        ...state,
        blockInteractionConfig: action.payload as BlockInteractionConfig,
      };
    }
    case actionTypes.setActivityIndicator: {
      return {
        ...state,
        showActivityIndicator: action.payload as boolean,
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
    case actionTypes.setIsHeaderIndicatorVisible: {
      return {
        ...state,
        isHeaderIndicatorVisible: action.payload as boolean,
      };
    }
    case actionTypes.setHeaderIndicatorState: {
      return {
        ...state,
        headerIndicatorState: action.payload as HeaderIndicatorState,
      };
    }
  }
};

const actions = {
  setBlockInteractionConfig: config => {
    return {
      type: actionTypes.setBlockInteractionConfig,
      payload: config,
    };
  },
  setActivityIndicator: option => ({
    type: actionTypes.setActivityIndicator,
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
  setIsHeaderIndicatorVisible: option => ({
    type: actionTypes.setIsHeaderIndicatorVisible,
    payload: option,
  }),
  setHeaderIndicatorState: state => ({
    type: actionTypes.setHeaderIndicatorState,
    payload: state,
  }),
};

export const ConfigProvider = ({children}) => {
  const [state, dispatch] = useReducer(configReducer, defaultConfigContext);

  const setBlockInteractionConfig = useCallback(
    config => dispatch(actions.setBlockInteractionConfig(config)),
    [],
  );
  const setActivityIndicator = useCallback(
    option => dispatch(actions.setActivityIndicator(option)),
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
  const setIsHeaderIndicatorVisible = useCallback(
    option => dispatch(actions.setIsHeaderIndicatorVisible(option)),
    [],
  );
  const setHeaderIndicatorState = useCallback(
    headerIndicatorState =>
      dispatch(actions.setHeaderIndicatorState(headerIndicatorState)),
    [],
  );

  const configContextState = useMemo<ConfigContextState>(
    () => ({
      ...state,
      setActivityIndicator,
      setFilterConfig,
      toggleFilterConfig,
      setVirtualKeyboardConfig,
      toggleVirtualKeyboardConfig,
      setHeaderHeight,
      setIsHeaderIndicatorVisible,
      setHeaderIndicatorState,
      setBlockInteractionConfig,
    }),
    [
      setActivityIndicator,
      setFilterConfig,
      setVirtualKeyboardConfig,
      state,
      toggleFilterConfig,
      toggleVirtualKeyboardConfig,
      setHeaderHeight,
      setIsHeaderIndicatorVisible,
      setHeaderIndicatorState,
      setBlockInteractionConfig,
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
