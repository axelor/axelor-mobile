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

import type {Meta} from '@storybook/react';
import {FormIncrementInput as Component} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/FormIncrementInput',
  component: Component,
};

export default meta;

export const FormIncrementInput: Story<typeof Component> = {
  args: {
    title: 'Title',
    defaultValue: '2',
    decimalSpacer: ',',
    thousandSpacer: '.',
    defaultFormatting: true,
    stepSize: 1,
    minValue: 0,
    maxValue: null,
    readOnly: false,
    required: false,
    isBigButton: false,
  },
  argTypes: {onChange: disabledControl},
};
