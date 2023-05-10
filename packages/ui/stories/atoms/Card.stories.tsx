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
import {Card, Text} from '../../src/components/atoms';

storiesOf('ui/atoms/Card', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('Default', () => (
    <Card>
      <View />
    </Card>
  ))
  .add('Text', () => (
    <Card>
      <Text>Text</Text>
    </Card>
  ))
  .add(
    'Custom Style',
    args => (
      <Card {...args}>
        <View style={styles.defaultCustom} />
      </Card>
    ),
    {
      argTypes: {
        style: {
          control: {
            type: 'object',
          },
          defaultValue: {
            width: 0,
            height: 5,
            backgroundColor: 'green',
          },
        },
      },
    },
  );

const styles = StyleSheet.create({
  decorator: {
    padding: 20,
  },
  defaultCustom: {
    height: 100,
    backgroundColor: '#B4503B',
  },
});
