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
import {default as FormInput} from './FormInput';

storiesOf('ui/molecules/FormInput', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <FormInput
          title="Input Title"
          defaultValue=""
          required
          onChange={console.log}
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
        defaultValue: 'Input Title',
      },
      defaultValue: {
        control: {
          type: 'text',
        },
        defaultValue: '',
      },
      required: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      onChange: {
        action: 'onChange',
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
