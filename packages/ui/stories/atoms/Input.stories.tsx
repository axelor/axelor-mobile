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
import {Input} from '../../src/components/atoms';

const writingTypeOptions = ['title', 'subtitle', 'important', 'details'];

storiesOf('ui/atoms/Input', module).add(
  'Default',
  args => {
    return (
      <Input
        value=""
        onChange={console.log}
        placeholder="Enter text here"
        {...args}
      />
    );
  },
  {
    argTypes: {
      value: {
        control: {
          type: 'text',
        },
        defaultValue: '',
      },
      onChange: {
        action: 'onChange',
      },
      placeholder: {
        control: {
          type: 'text',
        },
        defaultValue: 'Enter text here',
      },
      secureTextEntry: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      readOnly: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      multiline: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      numberOfLines: {
        control: {
          type: 'number',
          min: 1,
          max: 10,
          step: 1,
        },
        defaultValue: 1,
      },
      keyboardType: {
        control: {
          type: 'select',
          options: [
            'default',
            'email-address',
            'numeric',
            'phone-pad',
            'ascii-capable',
            'numbers-and-punctuation',
            'url',
            'number-pad',
            'name-phone-pad',
            'decimal-pad',
            'twitter',
            'web-search',
            'visible-password',
          ],
        },
        defaultValue: 'default',
      },
      writingType: {
        control: {
          type: 'select',
          options: writingTypeOptions,
        },
      },
    },
  },
);
