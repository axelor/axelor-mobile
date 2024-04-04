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
import {TextUnit} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/TextUnit', module).add(
  'Default',
  args => {
    return <TextUnit {...args} color={lightTheme.colors[args.color]} />;
  },
  {
    argTypes: {
      value: {
        type: 'string',
        defaultValue: '400',
        control: {type: 'text'},
      },
      unit: {
        type: 'string',
        defaultValue: 'm',
        control: {type: 'text'},
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
      fontSize: {
        type: 'number',
        defaultValue: 22,
        control: {type: 'number'},
      },
    },
  },
);
