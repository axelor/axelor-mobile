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
import {action} from '@storybook/addon-actions';
import {DropdownMenuItem} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/DropdownMenuItem', module).add(
  'default',
  args => {
    return (
      <DropdownMenuItem
        placeholder="Placeholder"
        onPress={action('onPress')}
        {...args}
        color={lightTheme.colors[args.color].background}
      />
    );
  },
  {
    argTypes: {
      icon: {
        type: 'string',
        defaultValue: 'truck',
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
      placeholder: {
        type: 'string',
        defaultValue: 'Placeholder',
        control: {type: 'text'},
      },
      indicator: {
        control: {
          type: 'range',
          min: 0,
          max: 10,
          step: 1,
        },
        defaultValue: 0,
      },
      hideIf: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      disableIf: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
