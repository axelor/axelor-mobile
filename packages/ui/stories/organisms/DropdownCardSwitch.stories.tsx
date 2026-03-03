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
import {DropdownCardSwitch as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const viewContent = <Text>Dropdown Content</Text>;

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/DropdownCardSwitch',
  component: Component,
};

export default meta;

export const DropdownCardSwitch: Story<typeof Component> = {
  args: {multiSelection: false},
  argTypes: {dropdownItems: disabledControl},
  render: args => {
    return (
      <Component
        dropdownItems={[
          {
            key: 1,
            title: 'Dropdown 1',
            childrenComp: viewContent,
            isDefaultVisible: true,
          },
          {
            key: 2,
            title: 'Dropdown 2',
            childrenComp: viewContent,
            isDefaultVisible: false,
          },
        ]}
        {...args}
      />
    );
  },
};
