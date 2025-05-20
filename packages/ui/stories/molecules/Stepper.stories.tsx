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
    step1_titleKey: 'Step 1',
    step1_state: 'completed',
    step2_titleKey: 'Step 2',
    step2_state: 'error',
    step3_titleKey: 'Step 3',
    step3_state: 'inProgress',
    step4_titleKey: 'Step 4',
    step4_state: 'draft',
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
        {titleKey: args.step1_titleKey, state: args.step1_state},
        {titleKey: args.step2_titleKey, state: args.step2_state},
        {titleKey: args.step3_titleKey, state: args.step3_state},
        {titleKey: args.step4_titleKey, state: args.step4_state},
      ]}
    />
  ),
};
