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

import type {Meta} from '@storybook/react';
import {Breadcrumb as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/Breadcrumb',
  component: Component,
};

export default meta;

export const Breadcrumb: Story<typeof Component> = {
  argTypes: {
    onHomePress: disabledControl,
  },
  render: args => (
    <Component
      items={[
        {
          title: 'Title 1',
          onPress: () => {},
        },
        {
          title: 'Title 2',
          onPress: () => {},
        },
        {
          title: 'Title 3',
          onPress: () => {},
        },
        {
          title: 'Title 4',
          onPress: () => {},
        },
        {
          title: 'Title 5',
          onPress: () => {},
        },
      ]}
      {...args}
    />
  ),
};
