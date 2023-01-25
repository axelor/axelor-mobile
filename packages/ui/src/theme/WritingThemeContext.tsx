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
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {Writing, writingDefaultTheme} from './writingTheme';

const DEFAULT_WRITING_THEME = writingDefaultTheme;

interface ThemeWritingContextState {
  activeWritingTheme: Writing;
  WritingThemes: Writing[];
  changeWritingTheme: (themeKey: string) => void;
}

interface ThemeWritingAction {
  type: string;
  payload?: string;
}

const defaultWritingThemeContext = {
  activeWritingTheme: DEFAULT_WRITING_THEME,
  WritingThemes: [writingDefaultTheme],
  changeWritingTheme: () => {
    throw new Error('WritingThemeProvider should be mounted to change theme');
  },
};

const getInitialWritingThemeState = (
  additionalWritingThemes: Writing[] = [],
  defaultWritingTheme: Writing = DEFAULT_WRITING_THEME,
) => {
  return {
    ...defaultWritingThemeContext,
    activeWritingTheme: defaultWritingTheme,
    themes: [
      ...defaultWritingThemeContext.WritingThemes,
      ...additionalWritingThemes,
    ],
  };
};

const WritingThemeContext = createContext<ThemeWritingContextState>(
  defaultWritingThemeContext,
);

const actionWritingTypes = {
  changeWritingTheme: 'changeWritingTheme',
};

const themeWritingReducer = (
  state: ThemeWritingContextState,
  action: ThemeWritingAction,
): ThemeWritingContextState => {
  switch (action.type) {
    case actionWritingTypes.changeWritingTheme: {
      const newActiveTheme = state.WritingThemes.find(
        theme => theme.key === action.payload,
      );
      if (newActiveTheme == null) {
        return state;
      }
      return {
        ...state,
        activeWritingTheme: newActiveTheme,
      };
    }
  }
};

const writingActions = {
  changeWritingTheme: themeKey => ({
    type: actionWritingTypes.changeWritingTheme,
    payload: themeKey,
  }),
};

interface WritingThemeProviderProps {
  themes?: Writing[];
  defaultTheme?: Writing;
  children?: ReactNode;
}

export const WritingThemeProvider = ({
  children,
  themes,
  defaultTheme,
}: WritingThemeProviderProps) => {
  const [state, dispatch] = useReducer(
    themeWritingReducer,
    getInitialWritingThemeState(themes, defaultTheme),
  );
  const changeWritingTheme = useCallback(
    themeKey => dispatch(writingActions.changeWritingTheme(themeKey)),
    [],
  );
  const themeWritingContextState = useMemo<ThemeWritingContextState>(
    () => ({
      ...state,
      changeWritingTheme,
    }),
    [changeWritingTheme, state],
  );

  return (
    <WritingThemeContext.Provider value={themeWritingContextState}>
      {children}
    </WritingThemeContext.Provider>
  );
};

export const useWritingStyle = () => {
  const {activeWritingTheme} =
    useContext<ThemeWritingContextState>(WritingThemeContext);
  return useMemo(() => activeWritingTheme.style, [activeWritingTheme]);
};
