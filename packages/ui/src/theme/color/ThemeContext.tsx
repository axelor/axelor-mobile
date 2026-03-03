/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {lightTheme, purpleTheme, colorBlindTheme} from './themes';
import {ConfigurableTheme, Theme, ThemeColors} from './types';
import {getActiveTheme, registerThemes} from './content.helpers';

function throwError(action: string) {
  throw new Error(`Theme provider should be mounted to ${action}`);
}

const DEFAULT_THEME = purpleTheme;
const COLORBLIND_THEME = colorBlindTheme;

interface ThemeContextState {
  activeTheme: Theme;
  isColorBlind: boolean;
  themes: Theme[];
  changeTheme: (themeKey: string) => void;
  addThemes: (themes: (ConfigurableTheme | Theme)[]) => void;
  activateColorBlind: () => void;
  desactivateColorBlind: () => void;
}

interface ThemeAction {
  type: string;
  payload?: string | (ConfigurableTheme | Theme)[];
}

const defaultThemeContext = {
  activeTheme: DEFAULT_THEME,
  isColorBlind: DEFAULT_THEME === COLORBLIND_THEME,
  themes: [lightTheme, purpleTheme],
  changeTheme: () => throwError('change theme'),
  addThemes: () => throwError('add themes'),
  activateColorBlind: () => throwError('activate color blind'),
  desactivateColorBlind: () => throwError('desactivate color blind'),
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
  addThemes: 'addThemes',
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
    case actionTypes.addThemes: {
      return {
        ...state,
        themes: registerThemes(
          state.themes,
          action.payload as (ConfigurableTheme | Theme)[],
        ),
      };
    }
    case actionTypes.activateColorBlind: {
      return {
        ...state,
        activeTheme: COLORBLIND_THEME,
        isColorBlind: true,
      };
    }
    case actionTypes.desactivateColorBlind: {
      return {
        ...state,
        activeTheme: DEFAULT_THEME,
        isColorBlind: false,
      };
    }
  }
};

const actions = {
  changeTheme: (themeKey: string) => ({
    type: actionTypes.changeTheme,
    payload: themeKey,
  }),
  addThemes: (themes: (ConfigurableTheme | Theme)[]) => ({
    type: actionTypes.addThemes,
    payload: themes,
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
    (themeKey: string) => dispatch(actions.changeTheme(themeKey)),
    [],
  );

  const addThemes = useCallback(
    (configurableThemes: (ConfigurableTheme | Theme)[]) =>
      dispatch(actions.addThemes(configurableThemes)),
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
      addThemes,
      activateColorBlind,
      desactivateColorBlind,
    }),
    [activateColorBlind, addThemes, changeTheme, desactivateColorBlind, state],
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
