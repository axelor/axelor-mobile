import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {Theme, lightTheme, colorBlindTheme} from './themes';

const DEFAULT_THEME = lightTheme;

interface ThemeContextState {
  activeTheme: Theme;
  themes: Theme[];
  changeTheme: (themeKey: string) => void;
  activateColorBlind: () => void;
  desactivateColorBlind: () => void;
}

interface ThemeAction {
  type: string;
  payload?: string;
}

const defaultThemeContext = {
  activeTheme: DEFAULT_THEME,
  themes: [lightTheme, colorBlindTheme],
  changeTheme: () => {
    throw new Error('ThemeProvider should be mounted to change theme');
  },
  activateColorBlind() {
    throw new Error('ThemeProvider should be mounted to activate color blind');
  },
  desactivateColorBlind() {
    throw new Error(
      'ThemeProvider should be mounted to desactivate color blind',
    );
  },
};

const ThemeContext = createContext<ThemeContextState>(defaultThemeContext);

const actionTypes = {
  changeTheme: 'changeTheme',
  activateColorBlind: 'activateColorBlind',
  desactivateColorBlind: 'desactivateColorBlind',
};

const themeReducer = (state: ThemeContextState, action: ThemeAction) => {
  switch (action.type) {
    case actionTypes.changeTheme: {
      const newActiveTheme = state.themes.find(
        theme => theme.key === action.payload,
      );
      if (newActiveTheme == null) {
        return state;
      }
      return {...state, activeTheme: newActiveTheme};
    }
    case actionTypes.activateColorBlind: {
      return {
        ...state,
        activeTheme: colorBlindTheme,
      };
    }
    case actionTypes.desactivateColorBlind: {
      return {
        ...state,
        activeTheme: lightTheme,
      };
    }
  }
};

const actions = {
  changeTheme: themeKey => ({
    type: actionTypes.changeTheme,
    payload: themeKey,
  }),
  activateColorBlind: () => ({
    type: actionTypes.activateColorBlind,
  }),
  desactivateColorBlind: () => ({
    type: actionTypes.desactivateColorBlind,
  }),
};

export const ThemeProvider = ({children}) => {
  const [state, dispatch] = useReducer(themeReducer, defaultThemeContext);
  const changeTheme = useCallback(
    themeKey => dispatch(actions.changeTheme(themeKey)),
    [],
  );
  const activateColorBlind = useCallback(
    () => dispatch(actions.activateColorBlind()),
    [],
  );
  const desactivateColorBlind = useCallback(
    () => dispatch(actions.desactivateColorBlind()),
    [],
  );
  const themeContextState = useMemo<ThemeContextState>(
    () => ({
      ...state,
      changeTheme,
      activateColorBlind,
      desactivateColorBlind,
    }),
    [activateColorBlind, changeTheme, desactivateColorBlind, state],
  );

  return (
    <ThemeContext.Provider value={themeContextState}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColor = () => {
  const {activeTheme} = useContext<ThemeContextState>(ThemeContext);
  return useMemo(() => activeTheme.colors, [activeTheme]);
};

export const useTheme = () => useContext<ThemeContextState>(ThemeContext);
