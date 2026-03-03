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
import {Text as Component} from '../../src/components/atoms';
import {
  colorPicker,
  disabledControl,
  Story,
  writingPicker,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/atoms/Text',
  component: Component,
};

export default meta;

export const Text: Story<typeof Component> = {
  args: {
    numberOfLines: 1,
    adjustsFontSizeToFit: false,
    fontSize: 14,
    children: 'Lorem ipsum dolor sit amet',
  },
  argTypes: {
    numberOfLines: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
        step: 1,
      },
    },
    fontSize: {
      control: {
        type: 'number',
        min: 10,
        max: 50,
        step: 1,
      },
    },
    textColor: colorPicker,
    writingType: writingPicker,
    onTextLayout: disabledControl,
  },
  render: args => <Component {...args} textColor={args.color?.background} />,
};
