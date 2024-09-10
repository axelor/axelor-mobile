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

import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {ChipSelect} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

const items = [
  {
    title: 'Option 1',
    color: lightTheme.colors.primaryColor,
    key: 'option1',
  },
  {
    title: 'Option 2',
    color: lightTheme.colors.cautionColor,
    key: 'option2',
    isActive: true,
  },
  {
    title: 'Option 3',
    color: lightTheme.colors.infoColor,
    key: 'option3',
  },
];

storiesOf('ui/organisms/ChipSelect', module)
  .add('multi-select', () => (
    <ChipSelect
      selectionItems={items}
      mode="multi"
      onChangeValue={action('onChangeValue')}
      width={100}
    />
  ))
  .add('switch-select', () => (
    <ChipSelect
      selectionItems={items}
      mode="switch"
      onChangeValue={action('onChangeValue')}
      width={100}
    />
  ))
  .add(
    'custom',
    args => (
      <ChipSelect
        selectionItems={items}
        mode="switch"
        onChangeValue={action('onChangeValue')}
        {...args}
      />
    ),
    {
      argTypes: {
        width: {
          control: {
            type: 'range',
            min: 100,
            max: 500,
            step: 10,
          },
          defaultValue: 200,
        },
        readonly: {
          control: {
            type: 'boolean',
          },
          defaultValue: false,
        },
        marginHorizontal: {
          control: {
            type: 'range',
            min: 0,
            max: 50,
            step: 2,
          },
          defaultValue: 12,
        },
        mode: {
          options: ['multi', 'switch'],
          control: {type: 'radio'},
        },
      },
    },
  );
