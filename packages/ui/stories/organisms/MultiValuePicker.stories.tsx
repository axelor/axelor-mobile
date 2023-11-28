/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {MultiValuePicker} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/MultiValuePicker', module).add(
  'Default',
  args => {
    const listItem = [
      {color: lightTheme.colors.secondaryColor, title: 'TEST 1', key: 1},
      {color: lightTheme.colors.progressColor, title: 'TEST 2', key: 2},
      {color: lightTheme.colors.primaryColor, title: 'TEST 3', key: 3},
    ];

    return (
      <MultiValuePicker
        title="Select options"
        listItems={listItem}
        defaultItems={[listItem[1], listItem[3]]}
        {...args}
      />
    );
  },
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Select options',
      },
      readonly: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      required: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);
