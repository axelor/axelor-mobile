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
import {storiesOf} from '@storybook/react-native';
import {Text} from '../../src/components/atoms';
import {DropdownCard} from '../../src/components/molecules';

const children = <Text>Some content in the dropdown</Text>;

storiesOf('ui/molecules/DropdownCard', module).add(
  'default',
  args => (
    <DropdownCard title="DropdownCard title" {...args}>
      {children}
    </DropdownCard>
  ),
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'DropdownCard title',
      },
      dropdownIsOpen: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);
