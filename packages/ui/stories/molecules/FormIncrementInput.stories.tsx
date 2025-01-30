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
import {FormIncrementInput} from '../../src/components/molecules';

storiesOf('ui/molecules/FormIncrementInput', module).add(
  'Default',
  args => {
    return (
      <FormIncrementInput
        title="Increment Input"
        defaultValue="0"
        decimalSpacer=","
        thousandSpacer="."
        onChange={console.log}
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
        defaultValue: 'Increment Input',
      },
      readOnly: {
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
      defaultValue: {
        control: {
          type: 'text',
        },
        defaultValue: '0',
      },
      decimalSpacer: {
        control: {
          type: 'text',
        },
        defaultValue: ',',
      },
      thousandSpacer: {
        control: {
          type: 'text',
        },
        defaultValue: '.',
      },
      defaultFormatting: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      stepSize: {
        control: {
          type: 'number',
        },
        defaultValue: 1,
      },
      minValue: {
        control: {
          type: 'number',
        },
        defaultValue: 0,
      },
      maxValue: {
        control: {
          type: 'number',
        },
        defaultValue: null,
      },
      isBigButton: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      scale: {
        control: {
          type: 'number',
        },
        defaultValue: null,
      },
    },
  },
);
