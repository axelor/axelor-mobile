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
import type {Meta} from '@storybook/react';
import {RightIconButton as Component, Icon} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/RightIconButton',
  component: Component,
};

export default meta;

export const RightIconButton: Story<typeof Component> = {
  args: {
    title: 'Title',
    iconName: 'heart',
  },
  argTypes: {
    onPress: disabledControl,
    icon: disabledControl,
  },
  render: args => <Component icon={<Icon name={args.iconName} />} {...args} />,
};
