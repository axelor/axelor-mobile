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
import {LabelText} from '../../src/components/molecules';

storiesOf('ui/molecules/LabelText', module).add(
  'Default',
  args => {
    return <LabelText title="Title" {...args} />;
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Title',
        control: {type: 'text'},
      },
      value: {
        type: 'string',
        defaultValue: 'Value',
        control: {type: 'text'},
      },
      size: {
        control: {
          type: 'range',
          min: 10,
          max: 50,
          step: 5,
        },
        defaultValue: 15,
      },
      color: {
        control: {
          type: 'color',
        },
        defaultValue: '#000000',
      },
      iconName: {
        type: 'string',
        defaultValue: 'car',
        control: {type: 'text'},
      },
      onlyOneLine: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
