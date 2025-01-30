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

storiesOf('ui/atoms/Text', module).add(
  'Default',
  args => {
    return <Text {...args}>Lorem ipsum dolor sit amet</Text>;
  },
  {
    argTypes: {
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {textAlign: 'center'},
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
      adjustsFontSizeToFit: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      textColor: {
        control: {
          type: 'color',
        },
        defaultValue: '#000000',
      },
      fontSize: {
        control: {
          type: 'number',
          min: 10,
          max: 50,
          step: 1,
        },
        defaultValue: 14,
      },
      writingType: {
        options: ['title', 'subtitle', 'important', 'details', undefined],
        control: {
          type: 'select',
        },
        defaultValue: undefined,
      },
    },
  },
);
