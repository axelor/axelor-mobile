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
import {Label} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme/themes';

storiesOf('ui/molecules/Label', module).add(
  'default',
  args => {
    return (
      <Label
        message="This is an indication"
        {...args}
        color={
          args.labelColor != null ? lightTheme.colors[args.labelColor] : null
        }
      />
    );
  },
  {
    argTypes: {
      type: {
        control: {
          type: 'radio',
        },
        defaultValue: 'info',
        options: ['info', 'success', 'danger', 'error'],
      },
      iconName: {
        control: {
          type: 'text',
        },
      },
      labelColor: {
        control: {
          type: 'select',
        },
        options: [
          null,
          ...Object.entries(lightTheme.colors)
            .filter(([, _color]) => typeof _color !== 'string')
            .map(([key]) => key),
        ],
        defaultValue: 'primaryColor',
      },
      message: {
        control: {
          type: 'text',
        },
        defaultValue: 'This is an indication',
      },
    },
  },
);
