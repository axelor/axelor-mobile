import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

interface ConfigContextState {
  showFilter: boolean;
  showVirtualKeyboard: boolean;
  showActivityIndicator: boolean;
  setActivityIndicator: (option: boolean) => void;
  setFilterConfig: (option: boolean) => void;
  toggleFilterConfig: () => void;
  setVirtualKeyboardConfig: (option: boolean) => void;
  toggleVirtualKeyboardConfig: () => void;
}

interface ConfigAction {
  type: string;
  payload?: boolean;
}

const defaultConfigContext = {
  showFilter: true,
  showVirtualKeyboard: true,
  showActivityIndicator: false,
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
};

const ConfigContext = createContext<ConfigContextState>(defaultConfigContext);

const actionTypes = {
  setFilterConfig: 'setFilterConfig',
  toggleFilterConfig: 'toggleFilterConfig',
  setVirtualKeyboardConfig: 'setVirtualKeyboardConfig',
  toggleVirtualKeyboardConfig: 'toggleVirtualKeyboardConfig',
  setActivityIndicator: 'setActivityIndicator',
};

const configReducer = (
  state: ConfigContextState,
  action: ConfigAction,
): ConfigContextState => {
  switch (action.type) {
    case actionTypes.setActivityIndicator: {
      return {
        ...state,
        showActivityIndicator: action.payload,
      };
    }
    case actionTypes.setFilterConfig: {
      return {
        ...state,
        showFilter: action.payload,
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
        showVirtualKeyboard: action.payload,
      };
    }
    case actionTypes.toggleVirtualKeyboardConfig: {
      return {
        ...state,
        showVirtualKeyboard: !state.showVirtualKeyboard,
      };
    }
  }
};

const actions = {
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
};

export const ConfigProvider = ({children}) => {
  const [state, dispatch] = useReducer(configReducer, defaultConfigContext);

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
  const configContextState = useMemo<ConfigContextState>(
    () => ({
      ...state,
      setActivityIndicator,
      setFilterConfig,
      toggleFilterConfig,
      setVirtualKeyboardConfig,
      toggleVirtualKeyboardConfig,
    }),
    [
      setActivityIndicator,
      setFilterConfig,
      setVirtualKeyboardConfig,
      state,
      toggleFilterConfig,
      toggleVirtualKeyboardConfig,
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
