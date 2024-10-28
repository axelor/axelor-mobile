/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import type {Meta} from '@storybook/react';
import {CardIndicator as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/CardIndicator',
  component: Component,
};

export default meta;

export const CardIndicator: Story<typeof Component> = {
  args: {
    indication: 'this is an indication',
    position: 'right',
    space: 50,
    isVisible: true,
  },
  argTypes: {
    handleClose: disabledControl,
  },
  render: args => {
    return (
      <View style={styles.view}>
        <Component {...args} handleClose={() => {}}>
          <Text>Test</Text>
        </Component>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  view: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
