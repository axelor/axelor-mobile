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
import {Button} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/Button', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Button title={'Press me'} {...args} />
      </View>
    );
  },
  {
    argTypes: {
      color: {
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
        control: {
          type: 'select',
        },
      },
      disabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      FontAwesome5: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      iconName: {
        type: 'string',
        defaultValue: 'check',
        control: {type: 'text'},
      },
      isNeutralBackground: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      onDisabledPress: {
        action: 'clicked',
        table: {disable: true},
      },
      onPress: {
        action: 'clicked',
        table: {disable: true},
      },
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {},
      },
      styleTxt: {
        control: {
          type: 'object',
        },
        defaultValue: {},
      },
      title: {
        type: 'string',
        defaultValue: 'Press me',
        control: {type: 'text'},
      },
      width: {
        type: 'string',
        defaultValue: '',
        control: {type: 'text'},
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
});
