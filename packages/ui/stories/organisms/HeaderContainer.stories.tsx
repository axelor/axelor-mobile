/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import type {Meta} from '@storybook/react';
import {HeaderContainer as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

import {hexToRgb} from '../../src/utils';

const Content = ({content, color}: {content: string; color: string}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(${hexToRgb(color)}, 0.3)`},
      ]}>
      <Text>{content}</Text>
    </View>
  );
};

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/HeaderContainer',
  component: Component,
};

export default meta;

export const HeaderContainer: Story<typeof Component> = {
  args: {
    expandableFilter: true,
    forceHideByDefault: false,
  },
  argTypes: {
    fixedItems: disabledControl,
    children: disabledControl,
    chipComponent: disabledControl,
    topChildren: disabledControl,
  },
  render: args => (
    <Component
      topChildren={<Content content="Top children item" color="#03A9F4" />}
      fixedItems={<Content content="Fixed item" color="#198754" />}
      chipComponent={<Content content="Chip component" color="#FFC107" />}
      children={<Content content="Children" color="#673AB7" />}
      {...args}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
