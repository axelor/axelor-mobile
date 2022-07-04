import React, {createContext, useContext, useReducer} from 'react';
import {getColorTheme, Themes} from './types/colors';

const defaultTheme = Themes.ligthTheme.id;

const initialState = {
  theme: defaultTheme,
  isColorBlind: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme,
      };
    case 'activateColorBlind':
      return {
        ...state,
        theme: Themes.colorBlindTheme.id,
        isColorBlind: true,
      };
    case 'desactivateColorBlind':
      return {
        ...state,
        theme: defaultTheme,
        isColorBlind: false,
      };
    default:
      return state;
  }
};

const ThemeContext = createContext();

export const ThemeConsumer = ThemeContext.Consumer;
export const ThemeConsumerHook = () => useContext(ThemeContext);

export const ColorHook = () => getColorTheme(useContext(ThemeContext)[0].theme);

export const ThemeProvider = ({children}) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ThemeContext.Provider>
);
