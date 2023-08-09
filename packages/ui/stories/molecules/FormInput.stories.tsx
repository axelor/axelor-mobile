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
import {FormInput} from '../../src/components/molecules';

storiesOf('ui/molecules/FormInput', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <FormInput {...args} />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Input Title',
      },
      defaultValue: {
        control: {
          type: 'text',
        },
        defaultValue: '',
      },
      readOnly: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      required: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      multiline: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      adjustHeightWithLines: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
