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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {SearchBar} from '../../src/components/organisms';

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

storiesOf('ui/organisms/SearchBar', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add(
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

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '50%',
    marginLeft: '20%',
  },
});
