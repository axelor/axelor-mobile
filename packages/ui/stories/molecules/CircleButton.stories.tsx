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
import {CircleButton} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/CircleButton', module).add(
  'Default',
  args => {
    return (
      <CircleButton
        iconName="pen-fill"
        {...args}
        color={lightTheme.colors[args.color]}
      />
    );
  },
  {
    argTypes: {
      square: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      size: {
        type: 'number',
        defaultValue: 50,
        control: {type: 'number'},
      },
      color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      isNeutralBackground: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      iconName: {
        type: 'string',
        defaultValue: 'pen-fill',
        control: {type: 'text'},
      },
      disabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
