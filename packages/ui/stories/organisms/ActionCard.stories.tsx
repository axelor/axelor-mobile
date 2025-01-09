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
import type {Meta} from '@storybook/react';
import {ActionCard as Component, Card, Text} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/ActionCard',
  component: Component,
};

export default meta;

export const ActionCard: Story<typeof Component> = {
  args: {
    horizontal: false,
    carLarge: false,
    busColor: 'primaryColor',
    truckHidden: false,
    truckDisabled: false,
  },
  argTypes: {
    busColor: colorPicker,
    actionList: disabledControl,
    forceActionsDisplay: disabledControl,
    translator: disabledControl,
  },
  render: args => (
    <Component
      children={
        <Card>
          <Text>TEST</Text>
        </Card>
      }
      translator={key => key}
      {...args}
      actionList={[
        {
          iconName: 'car-front',
          helper: 'Car',
          large: args.carLarge,
          onPress: () => {},
        },
        {
          iconName: 'bus-front',
          iconColor: args.busColor?.background,
          helper: 'Bus',
          onPress: () => {},
        },
        {
          iconName: 'truck',
          helper: 'Truck',
          onPress: () => {},
          hidden: args.truckHidden,
          disabled: args.truckDisabled,
        },
      ]}
    />
  ),
};
