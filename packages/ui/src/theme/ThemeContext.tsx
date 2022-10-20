import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {Theme, lightTheme, colorBlindTheme} from './themes';

const DEFAULT_THEME = lightTheme;
const COLORBLIND_THEME = colorBlindTheme;

interface ThemeContextState {
  activeTheme: Theme;
  isColorBlind: boolean;
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
  isColorBlind: DEFAULT_THEME === COLORBLIND_THEME,
  themes: [lightTheme],
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

const getInitialThemeState = (additionalThemes: Theme[] = []) => {
  return {
    ...defaultThemeContext,
    themes: [...defaultThemeContext.themes, ...additionalThemes],
  };
};

const ThemeContext = createContext<ThemeContextState>(defaultThemeContext);

const actionTypes = {
  changeTheme: 'changeTheme',
  activateColorBlind: 'activateColorBlind',
  desactivateColorBlind: 'desactivateColorBlind',
};

const themeReducer = (
  state: ThemeContextState,
  action: ThemeAction,
): ThemeContextState => {
  switch (action.type) {
    case actionTypes.changeTheme: {
      const newActiveTheme = state.themes.find(
        theme => theme.key === action.payload,
      );
      if (newActiveTheme == null) {
        return state;
      }
      return {
        ...state,
        activeTheme: newActiveTheme,
        isColorBlind: newActiveTheme === COLORBLIND_THEME,
      };
    }
    case actionTypes.activateColorBlind: {
      return {
        ...state,
        activeTheme: colorBlindTheme,
        isColorBlind: true,
      };
    }
    case actionTypes.desactivateColorBlind: {
      return {
        ...state,
        activeTheme: lightTheme,
        isColorBlind: false,
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

interface ThemeProviderProps {
  themes?: Theme[];
  children?: ReactNode;
}

export const ThemeProvider = ({children, themes}: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(
    themeReducer,
    getInitialThemeState(themes),
  );
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

export const useTheme = (): ThemeContextState =>
  useContext<ThemeContextState>(ThemeContext);
