import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as SearchBar} from './SearchBar';

const defaultArgs = {
  valueTxt: '',
  placeholder: 'Search',
  onClearPress: () => {},
  onChangeTxt: () => {},
  onSelection: () => {},
  onEndFocus: () => {},
  isFocus: false,
  onScanPress: () => {},
  scanIconColor: null,
};

storiesOf('ui/organisms/SearchBar', module).add(
  'Default',
  args => {
    const props = {...defaultArgs, ...args};
    return <SearchBar {...props} />;
  },
  {
    argTypes: {
      valueTxt: {control: {type: 'text'}, defaultValue: defaultArgs.valueTxt},
      placeholder: {
        control: {type: 'text'},
        defaultValue: defaultArgs.placeholder,
      },
      onClearPress: {action: 'onClearPress'},
      onChangeTxt: {action: 'onPress'},
      onSelection: {
        action: 'onSelection',
      },
      onEndFocus: {
        action: 'onEndFocus',
      },
      isFocus: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      onScanPress: {
        action: 'onScanPress',
      },
      scanIconColor: {
        control: {
          type: 'color',
        },
      },
    },
  },
);
