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
import {default as Screen} from './Screen';
import Text from '../Text/Text';

storiesOf('ui/atoms/Screen', module)
  .addDecorator(story => <View style={styles.padding}>{story()}</View>)
  .add('default', () => (
    <Screen>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </Screen>
  ))
  .add('loading', () => (
    <Screen loading>
      <Text>Hello World loading!</Text>
    </Screen>
  ))
  .add('with fixed items', () => (
    <Screen
      fixedItems={<Text style={styles.padding}>Fixed Item</Text>}
      style={styles.padding}>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </Screen>
  ))
  .add('without top space', () => (
    <Screen removeSpaceOnTop>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </Screen>
  ));

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  padding: {padding: 16},
});
