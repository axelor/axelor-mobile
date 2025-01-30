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
import {Button} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/Button', module).add(
  'Default',
  args => {
    return <Button {...args} color={lightTheme.colors[args.color]} />;
  },
  {
    argTypes: {
      color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      disabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      iconName: {
        type: 'string',
        defaultValue: 'car',
        control: {type: 'text'},
      },
      isNeutralBackground: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      title: {
        type: 'string',
        defaultValue: 'Press me',
        control: {type: 'text'},
      },
      width: {
        type: 'number',
        defaultValue: 300,
        control: {type: 'number'},
      },
    },
  },
);
