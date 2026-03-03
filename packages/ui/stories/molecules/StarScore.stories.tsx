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
import {StarScore as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/StarScore',
  component: Component,
};

export default meta;

export const StarScore: Story<typeof Component> = {
  args: {
    score: 0,
    showHalfStar: true,
    showMissingStar: true,
    size: 20,
  },
  argTypes: {
    score: {
      control: {type: 'number', min: 0, max: 5, step: 0.5},
      description: 'The score to display',
      defaultValue: 3,
    },
    color: colorPicker,
    editMode: disabledControl,
    onPress: disabledControl,
  },
};
