import {lightTheme} from '../../src/theme';

const colorKeys = Object.entries(lightTheme.colors)
  .filter(([, _color]) => typeof _color !== 'string')
  .map(([key]) => key);

export const colorPicker = {
  control: {type: 'select'},
  options: colorKeys,
  mapping: {
    ...Object.fromEntries(
      colorKeys.map(_k => [_k, lightTheme.colors[_k]?.background]),
    ),
  },
};

export const writingPicker = {
  control: {type: 'select'},
  options: ['title', 'subtitle', 'important', 'details', undefined],
};

export const keyboardPicker = {
  control: {type: 'select'},
  options: [
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'number-pad',
    'name-phone-pad',
    'decimal-pad',
    'twitter',
    'web-search',
    'visible-password',
  ],
};

export const disabledControl = {table: {disable: true}};
