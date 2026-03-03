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
import {MovementIndicationCard as Component, Icon} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/MovementIndicationCard',
  component: Component,
};

export default meta;

export const MovementIndicationCard: Story<typeof Component> = {
  args: {
    titleTop: 'Title top',
    disabledTop: false,
    topIcon_name: 'truck',
    topIcon_color: 'primaryColor',
    titleDown: 'Title down',
    disabledDown: false,
    downIcon_name: 'geo-alt',
    downIcon_color: 'plannedColor',
  },
  argTypes: {
    topIcon_color: colorPicker,
    downIcon_color: colorPicker,
    iconDown: disabledControl,
    iconTop: disabledControl,
    onPressTitleDown: disabledControl,
    onPressTitleTop: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      iconTop={
        <Icon name={args.topIcon_name} color={args.topIcon_color?.background} />
      }
      iconDown={
        <Icon
          name={args.downIcon_name}
          color={args.downIcon_color?.background}
        />
      }
    />
  ),
};
