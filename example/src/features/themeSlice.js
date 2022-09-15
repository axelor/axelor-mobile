import {getColorTheme, Themes} from '@/types/colors';
import {createSelector, createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

const defaultTheme = Themes.ligthTheme.id;

const initialState = {
  theme: defaultTheme,
  isColorBlind: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload.newTheme;
    },
    activateColorBlind: state => {
      state.theme = Themes.colorBlindTheme.id;
      state.isColorBlind = true;
    },
    desactivateColorBlind: state => {
      state.theme = defaultTheme;
      state.isColorBlind = false;
    },
  },
});

const themeSelector = createSelector(state => state.theme.theme, getColorTheme);

export const useThemeColor = () => useSelector(themeSelector);

export const {changeTheme, activateColorBlind, desactivateColorBlind} =
  themeSlice.actions;

export const themeReducer = themeSlice.reducer;
