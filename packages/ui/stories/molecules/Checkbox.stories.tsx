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
import {Checkbox} from '../../src/components/molecules';

const colors = {
  primary: {
    background: '#3ECF8E',
  },
  secondary: {
    background: '#84DCB7',
  },
};

storiesOf('ui/molecules/Checkbox', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Checkbox
          title="Check me"
          isDefaultChecked={false}
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
        defaultValue: 'Checkbox Title',
      },
      isDefaultChecked: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      disabled: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      onChange: {
        action: 'onChange',
      },
      iconSize: {
        control: {
          type: 'range',
          min: 10,
          max: 50,
          step: 2,
        },
        defaultValue: 30,
      },
      style: {
        control: {
          type: 'object',
        },
      },
      styleTxt: {
        control: {
          type: 'object',
        },
      },
    },
    parameters: {
      backgrounds: {
        default: 'white',
        values: [
          {name: 'white', value: '#ffffff'},
          {name: 'primary', value: colors.primary.background},
          {name: 'secondary', value: colors.secondary.background},
        ],
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
