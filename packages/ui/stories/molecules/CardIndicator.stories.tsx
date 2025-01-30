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
import {Dimensions, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {CardIndicator, Text} from '../../src/components';

storiesOf('ui/molecules/CardIndicator', module).add(
  'Default',
  args => {
    return (
      <View style={styles.view}>
        <CardIndicator {...args} handleClose={() => {}}>
          <Text>Test</Text>
        </CardIndicator>
      </View>
    );
  },
  {
    argTypes: {
      indication: {
        control: {
          type: 'text',
        },
        defaultValue: 'this is an indication',
      },
      position: {
        control: {
          type: 'select',
        },
        options: ['right', 'left'],
        defaultValue: 'right',
      },
      space: {
        control: {
          type: 'number',
        },
        defaultValue: 50,
      },
      isVisible: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      usePopup: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
