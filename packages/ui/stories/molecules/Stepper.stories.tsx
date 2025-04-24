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
import {Stepper as Component} from '../../src/components/molecules';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/Stepper',
  component: Component,
};

export default meta;

export const Stepper: Story<typeof Component> = {
  args: {
    activeStepIndex: 2,
    isCardBackground: false,
    displayDropdown: false,
    translator: key => key,
  },
  argTypes: {steps: disabledControl, translator: disabledControl},
  render: args => (
    <Component
      {...args}
      steps={[
        {title: 'Step 1', state: 'completed'},
        {title: 'Step 2', state: 'error'},
        {title: 'Step 3', state: 'inProgress'},
        {title: 'Step 4', state: 'draft'},
      ]}
    />
  ),
};
