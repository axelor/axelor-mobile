/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Keyboard} from '../types';

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
  virtualKeyboardVisibility: number;
  showActivityIndicator: boolean;
  showSubtitles: boolean;
  showToolbox: boolean;
  headerHeight: number;
  blockInteractionConfig: BlockInteractionConfig;
  nbDecimalDigitForQty: number;
  nbDecimalDigitForUnitPrice: number;
  isScrollEnabled: boolean;
  setBlockInteractionConfig: (config: BlockInteractionConfig) => void;
  setNbDecimalDigitForQty: (option: number) => void;
  setNbDecimalDigitForUnitPrice: (option: number) => void;
  setActivityIndicator: (option: boolean) => void;
  setShowSubtitles: (option: boolean) => void;
  setShowToolbox: (option: boolean) => void;
  setFilterConfig: (option: boolean) => void;
  toggleFilterConfig: () => void;
  setVirtualKeyboardVisibility: (option: number) => void;
  setHeaderHeight: (height: number) => void;
  setIsScrollEnabled: (option: boolean) => void;
}

interface ConfigAction {
  type: string;
  payload?: boolean | number | BlockInteractionConfig;
}

const defaultConfigContext = {
  showFilter: true,
  virtualKeyboardVisibility: Keyboard.visibility.Always,
  showActivityIndicator: false,
  showSubtitles: false,
  showToolbox: false,
  headerHeight: 60,
  blockInteractionConfig: {
    visible: false,
    message: '',
    actionItems: [],
  },
  nbDecimalDigitForQty: 2,
  nbDecimalDigitForUnitPrice: 2,
  isScrollEnabled: true,
  setBlockInteractionConfig: () => {
    throw new Error(
      'ConfigProvider should be mounted to set blockInteractionConfig config',
    );
  },
  setNbDecimalDigitForQty: () => {
    throw new Error(
      'ConfigProvider should be mounted to set nbDecimalDigitForQty config',
    );
  },
  setNbDecimalDigitForUnitPrice: () => {
    throw new Error(
      'ConfigProvider should be mounted to set nbDecimalDigitForUnitPrice config',
    );
  },
  setActivityIndicator: () => {
    throw new Error('ConfigProvider should be mounted to set Indicator config');
  },
  setShowSubtitles: () => {
    throw new Error('ConfigProvider should be mounted to set subtitles config');
  },
  setShowToolbox: () => {
    throw new Error(
      'ConfigProvider should be mounted to set showToolbox config',
    );
  },
  setFilterConfig: () => {
    throw new Error('ConfigProvider should be mounted to set filter config');
  },
  toggleFilterConfig: () => {
    throw new Error('ConfigProvider should be mounted to toggle filter config');
  },
  setVirtualKeyboardVisibility: () => {
    throw new Error(
      'ConfigProvider should be mounted to set virtual keyboard visibility',
    );
  },
  setHeaderHeight: () => {
    throw new Error(
      'ConfigProvider should be mounted to set header height config',
    );
  },
  setIsScrollEnabled: () => {
    throw new Error(
      'ConfigProvider should be mounted to set isScrollEnabled config',
    );
  },
};

const ConfigContext = createContext<ConfigContextState>(defaultConfigContext);

const actionTypes = {
  setFilterConfig: 'setFilterConfig',
  toggleFilterConfig: 'toggleFilterConfig',
  setShowSubtitles: 'setShowSubtitles',
  setShowToolbox: 'setShowToolbox',
  setVirtualKeyboardVisibility: 'setVirtualKeyboardVisibility',
  setActivityIndicator: 'setActivityIndicator',
  setHeaderHeight: 'setHeaderHeight',
  setBlockInteractionConfig: 'setBlockInteractionConfig',
  setNbDecimalDigitForQty: 'setNbDecimalDigitForQty',
  setNbDecimalDigitForUnitPrice: 'setNbDecimalDigitForUnitPrice',
  setIsScrollEnabled: 'setIsScrollEnabled',
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
    case actionTypes.setNbDecimalDigitForQty: {
      return {
        ...state,
        nbDecimalDigitForQty: action.payload as number,
      };
    }
    case actionTypes.setNbDecimalDigitForUnitPrice: {
      return {
        ...state,
        nbDecimalDigitForUnitPrice: action.payload as number,
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
    case actionTypes.setShowToolbox: {
      return {
        ...state,
        showToolbox: action.payload as boolean,
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
    case actionTypes.setVirtualKeyboardVisibility: {
      return {
        ...state,
        virtualKeyboardVisibility: action.payload as number,
      };
    }
    case actionTypes.setHeaderHeight: {
      return {
        ...state,
        headerHeight: action.payload as number,
      };
    }
    case actionTypes.setIsScrollEnabled: {
      return {
        ...state,
        isScrollEnabled: action.payload as boolean,
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
  setNbDecimalDigitForQty: option => ({
    type: actionTypes.setNbDecimalDigitForQty,
    payload: option,
  }),
  setNbDecimalDigitForUnitPrice: option => ({
    type: actionTypes.setNbDecimalDigitForUnitPrice,
    payload: option,
  }),
  setShowSubtitles: option => ({
    type: actionTypes.setShowSubtitles,
    payload: option,
  }),
  setShowToolbox: option => ({
    type: actionTypes.setShowToolbox,
    payload: option,
  }),
  setFilterConfig: option => ({
    type: actionTypes.setFilterConfig,
    payload: option,
  }),
  toggleFilterConfig: () => ({
    type: actionTypes.toggleFilterConfig,
  }),
  setVirtualKeyboardVisibility: option => ({
    type: actionTypes.setVirtualKeyboardVisibility,
    payload: option,
  }),
  setHeaderHeight: value => ({
    type: actionTypes.setHeaderHeight,
    payload: value,
  }),
  setIsScrollEnabled: option => ({
    type: actionTypes.setIsScrollEnabled,
    payload: option,
  }),
};

export const ConfigProvider = ({children, showModulesSubtitle}) => {
  const [state, dispatch] = useReducer(configReducer, {
    ...defaultConfigContext,
    showSubtitles: showModulesSubtitle,
  });

  const setBlockInteractionConfig = useCallback(
    config => dispatch(actions.setBlockInteractionConfig(config)),
    [],
  );
  const setNbDecimalDigitForQty = useCallback(
    option => dispatch(actions.setNbDecimalDigitForQty(option)),
    [],
  );
  const setNbDecimalDigitForUnitPrice = useCallback(
    option => dispatch(actions.setNbDecimalDigitForUnitPrice(option)),
    [],
  );
  const setActivityIndicator = useCallback(
    option => dispatch(actions.setActivityIndicator(option)),
    [],
  );
  const setShowSubtitles = useCallback(
    option => dispatch(actions.setShowSubtitles(option)),
    [],
  );
  const setShowToolbox = useCallback(
    option => dispatch(actions.setShowToolbox(option)),
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
  const setVirtualKeyboardVisibility = useCallback(
    option => dispatch(actions.setVirtualKeyboardVisibility(option)),
    [],
  );
  const setHeaderHeight = useCallback(
    value => dispatch(actions.setHeaderHeight(value)),
    [],
  );
  const setIsScrollEnabled = useCallback(
    option => dispatch(actions.setIsScrollEnabled(option)),
    [],
  );
  const configContextState = useMemo<ConfigContextState>(
    () => ({
      ...state,
      setNbDecimalDigitForQty,
      setNbDecimalDigitForUnitPrice,
      setActivityIndicator,
      setShowSubtitles,
      setShowToolbox,
      setFilterConfig,
      toggleFilterConfig,
      setVirtualKeyboardVisibility,
      setHeaderHeight,
      setBlockInteractionConfig,
      setIsScrollEnabled,
    }),
    [
      state,
      setNbDecimalDigitForQty,
      setNbDecimalDigitForUnitPrice,
      setActivityIndicator,
      setShowSubtitles,
      setShowToolbox,
      setFilterConfig,
      toggleFilterConfig,
      setVirtualKeyboardVisibility,
      setHeaderHeight,
      setBlockInteractionConfig,
      setIsScrollEnabled,
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
