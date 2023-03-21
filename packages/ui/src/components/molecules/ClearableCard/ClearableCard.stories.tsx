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
import {default as ClearableCard} from './ClearableCard';

const Colors = {
  background: '#ffffff',
  text: '#000000',
  primary: '#3ECF8E',
};

storiesOf('ui/molecules/ClearableCard', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <ClearableCard
          valueTxt="Some text"
          onClearPress={console.log}
          clearable={true}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      valueTxt: {
        control: {
          type: 'text',
        },
        defaultValue: 'Some text',
      },
      clearable: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      onClearPress: {
        action: 'onClearPress',
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
    backgroundColor: Colors.background,
    padding: 20,
  },
});
