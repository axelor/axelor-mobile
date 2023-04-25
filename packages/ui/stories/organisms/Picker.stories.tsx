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
import {action} from '@storybook/addon-actions';
import {Picker} from '../../src/components/organisms';

const listItems = [
  {id: '1', label: 'Item 1'},
  {id: '2', label: 'Item 2'},
  {id: '3', label: 'Item 3'},
];

storiesOf('ui/organisms/Picker', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('Default', () => (
    <Picker
      title="Select an item"
      onValueChange={action('onValueChange')}
      defaultValue="1"
      listItems={listItems}
      labelField="label"
      valueField="id"
    />
  ));

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '15%',
    marginLeft: '50%',
  },
});
