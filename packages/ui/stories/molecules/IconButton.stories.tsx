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
import {IconButton} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/IconButton', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add(
    'Default',
    args => {
      return (
        <View style={styles.container}>
          <IconButton
            FontAwesome5={true}
            title="Press me"
            iconName="check-circle"
            onPress={console.log}
            color={lightTheme.colors.primaryColor}
            {...args}
          />
        </View>
      );
    },
    {
      argTypes: {
        title: {
          control: {
            type: 'text',
          },
          defaultValue: 'Button Title',
        },
        iconName: {
          control: {
            type: 'text',
          },
          defaultValue: 'check-circle',
        },
        onPress: {
          action: 'onPress',
        },
        disabled: {
          control: {
            type: 'boolean',
          },
          defaultValue: false,
        },
        color: {
          options: Object.keys(lightTheme.colors),
          mapping: lightTheme.colors,
          control: {
            type: 'select',
            labels: {
              primary: 'Primary',
              caution: 'Caution',
            },
          },
        },
        style: {
          control: {
            type: 'object',
          },
          defaultValue: {},
        },
      },
    },
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorator: {
    flex: 1,
    padding: 20,
  },
});
