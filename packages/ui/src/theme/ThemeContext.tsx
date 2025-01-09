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
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {Theme, lightTheme, colorBlindTheme, ThemeColors} from './themes';
import {getActiveTheme} from './theme-context.helper';

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

const getInitialThemeState = (
  additionalThemes: Theme[] = [],
  defaultTheme: Theme = DEFAULT_THEME,
  themeColorsConfig: ThemeColors,
) => {
  return {
    ...defaultThemeContext,
    activeTheme: getActiveTheme(defaultTheme, themeColorsConfig),
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
  defaultTheme?: Theme;
  themeColorsConfig?: ThemeColors;
  children?: ReactNode;
}

export const ThemeProvider = ({
  children,
  themes,
  defaultTheme,
  themeColorsConfig,
}: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(
    themeReducer,
    getInitialThemeState(themes, defaultTheme, themeColorsConfig),
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
