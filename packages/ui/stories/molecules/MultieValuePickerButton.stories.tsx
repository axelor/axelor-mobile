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
import {action} from '@storybook/addon-actions';
import {MultiValuePickerButton} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/MultiValuePickerButton', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add(
    'custom',
    args => (
      <MultiValuePickerButton
        onPress={() => action('onPress')}
        onPressItem={() => action('onPressItem')}
        listItem={[
          {id: 1, name: 'name1'},
          {id: 2, name: 'name2'},
          {id: 3, name: 'name3'},
        ]}
        labelField={'name'}
        itemColor={lightTheme.colors.primaryColor}
        {...args}
      />
    ),
    {
      argTypes: {
        style: {
          control: {
            type: 'object',
          },
          defaultValue: {
            marginHorizontal: 20,
          },
        },
        labelField: {
          control: 'select',
          options: ['name', 'id'],
        },
        itemColor: {
          options: Object.keys(lightTheme.colors),
          mapping: lightTheme.colors,
          control: {
            type: 'select',
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
    marginLeft: '15%',
  },
});
