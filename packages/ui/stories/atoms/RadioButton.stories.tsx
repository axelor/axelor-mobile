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
import {RadioButton} from '../../src/components';

storiesOf('ui/atoms/RadioButton', module).add(
  'Default',
  args => {
    return (
      <RadioButton
        selected={false}
        onPress={() => {}}
        title={'Option title'}
        {...args}
      />
    );
  },
  {
    argTypes: {
      selected: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      size: {
        control: {
          type: 'number',
          min: 5,
          step: 5,
        },
        defaultValue: 20,
      },
    },
  },
);
