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
import {ToggleButton} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/ToggleButton', module).add(
  'Default',
  args => {
    return (
      <ToggleButton
        {...args}
        buttonConfig={{
          title: args.buttonTitle,
          disabled: args.buttonDisabled,
          width: args.buttonWidth,
          iconName: args.buttonIconName,
        }}
        activeColor={lightTheme.colors[args.activeColor]}
        inactiveColor={lightTheme.colors[args.inactiveColor]}
      />
    );
  },
  {
    argTypes: {
      isActive: {
        defaultValue: false,
        control: {
          type: 'boolean',
        },
      },
      isNeutralBackground: {
        defaultValue: true,
        control: {
          type: 'boolean',
        },
      },
      activeColor: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      inactiveColor: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'secondaryColor',
        control: {
          type: 'select',
        },
      },
      buttonDisabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      buttonIconName: {
        type: 'string',
        defaultValue: 'heart',
        control: {type: 'text'},
      },
      buttonTitle: {
        type: 'string',
        defaultValue: 'Press me',
        control: {type: 'text'},
      },
      buttonWidth: {
        type: 'number',
        defaultValue: 300,
        control: {type: 'number'},
      },
    },
  },
);
