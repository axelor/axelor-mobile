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
import {EditableInput} from '../../src/components/molecules';

storiesOf('ui/molecules/EditableInput', module).add(
  'Default',
  args => {
    return (
      <EditableInput
        placeholder="Enter text here"
        onValidate={console.log}
        defaultValue={args.defaultValue}
        multiline={args.multiline}
        numberOfLines={args.numberOfLines}
        {...args}
      />
    );
  },
  {
    argTypes: {
      defaultValue: {
        control: {
          type: 'text',
        },
        defaultValue: '',
      },
      multiline: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      numberOfLines: {
        control: {
          type: 'range',
          min: 1,
          max: 10,
          step: 1,
        },
        defaultValue: 1,
      },
    },
  },
);
