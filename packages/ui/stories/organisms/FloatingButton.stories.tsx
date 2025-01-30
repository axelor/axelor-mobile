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
import {FloatingButton} from '../../src/components/organisms';

const actions = [
  {
    key: 1,
    title: 'Add',
    iconName: 'plus',
    disabled: false,
    onPress: action('Add button pressed'),
  },
  {
    key: 2,
    title: 'Edit',
    iconName: 'pencil',
    disabled: false,
    onPress: action('Edit button pressed'),
  },
  {
    key: 3,
    title: 'Delete',
    iconName: 'trash',
    disabled: true,
    onPress: action('Delete button pressed'),
  },
];

storiesOf('ui/organisms/FloatingButton', module).add(
  'Default',
  args => {
    return (
      <FloatingButton actions={actions} translator={key => key} {...args} />
    );
  },
  {
    argTypes: {
      iconName: {
        type: 'string',
        defaultValue: 'car',
        control: {type: 'text'},
      },
      size: {
        control: {
          type: 'range',
          min: 15,
          max: 75,
          step: 5,
        },
        defaultValue: 50,
      },
    },
  },
);
