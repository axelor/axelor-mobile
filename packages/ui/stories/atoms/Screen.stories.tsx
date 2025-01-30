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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Screen, Text} from '../../src/components/atoms';

storiesOf('ui/atoms/Screen', module).add(
  'Default',
  args => {
    return (
      <Screen
        fixedItems={
          <View style={styles.container}>
            <Text>Fixed item</Text>
          </View>
        }
        {...args}>
        <View style={styles.container}>
          <Text>Hello World!</Text>
        </View>
      </Screen>
    );
  },
  {
    argTypes: {
      removeSpaceOnTop: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      loading: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
});
