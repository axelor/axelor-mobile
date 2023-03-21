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
import {default as TitledValue} from './TitledValue';

storiesOf('ui/molecules/TitledValue', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <TitledValue title="" value="" {...args} />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'title',
        control: {type: 'text'},
      },
      value: {
        type: 'string',
        defaultValue: 'value',
        control: {type: 'text'},
      },
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 20,
        },
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
