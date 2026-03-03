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

import type {Meta} from '@storybook/react';
import {Slider as Component} from '../../src/components/atoms';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/atoms/Slider',
  component: Component,
};

export default meta;

export const Slider: Story<typeof Component> = {
  args: {
    color: 'primaryColor',
    minValue: 0,
    minLimit: 10,
    maxValue: 100,
    maxLimit: 90,
    displayStepNumber: false,
    defaultValue: 50,
    displaySliderValue: true,
    disabled: false,
  },
  argTypes: {
    style: disabledControl,
    color: colorPicker,
    onChange: disabledControl,
  },
};
