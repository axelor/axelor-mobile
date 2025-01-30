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
import {action} from '@storybook/addon-actions';
import {Picker} from '../../src/components/organisms';

const listItems = [
  {id: '1', label: 'Item 1'},
  {id: '2', label: 'Item 2'},
  {id: '3', label: 'Item 3'},
];
storiesOf('ui/organisms/Picker', module).add(
  'Default',
  args => {
    return (
      <Picker
        title={'Select an item'}
        onValueChange={action('onValueChange')}
        listItems={listItems}
        labelField="label"
        valueField="id"
        {...args}
      />
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Select an item',
        control: {type: 'text'},
      },
      emptyValue: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      isValueItem: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      required: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      readonly: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      disabledValue: {
        type: 'string',
        defaultValue: 'Disabled',
        control: {type: 'text'},
      },
    },
  },
);
