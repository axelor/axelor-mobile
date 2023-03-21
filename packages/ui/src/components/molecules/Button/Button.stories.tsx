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
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Button} from './Button';
import {lightTheme} from '../../../theme/themes';

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
      title: {
        type: 'string',
        defaultValue: 'Press me',
        control: {type: 'text'},
      },
      color: {
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
        control: {
          type: 'select',
          labels: {
            primary: 'Primary',
            secondary: 'Secondary',
          },
        },
      },
      disabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      onPress: {
        action: 'clicked',
        table: {disable: true},
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
