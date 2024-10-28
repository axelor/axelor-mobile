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
import type {Meta} from '@storybook/react';
import {FromTo as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/FromTo',
  component: Component,
};

export default meta;

export const FromTo: Story<typeof Component> = {
  args: {
    from: 'Origin',
    to: 'Destination',
  },
  argTypes: {
    fromComponent: disabledControl,
    toComponent: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      fromComponent={<Text>{args.from}</Text>}
      toComponent={<Text>{args.to}</Text>}
    />
  ),
};
