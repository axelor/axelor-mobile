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
import {DoubleIcon} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

const Colors = lightTheme.colors;

storiesOf('ui/molecules/DoubleIcon', module)
  .add(
    'with pre-defined position',
    args => {
      return (
        <DoubleIcon
          style={{
            width: args.configBottomIcon_size,
            height: args.configBottomIcon_size,
            margin: args.configTopIcon_size,
          }}
          topIconConfig={{
            name: args.configTopIcon_name,
            size: args.configTopIcon_size,
            FontAwesome5: false,
            color: Colors[args.configTopIcon_color].background,
          }}
          bottomIconConfig={{
            name: args.configBottomIcon_name,
            size: args.configBottomIcon_size,
            FontAwesome5: false,
            color: Colors[args.configBottomIcon_color].background,
          }}
          {...args}
        />
      );
    },
    {
      argTypes: {
        predefinedPosition: {
          options: [
            'bottom-left',
            'top-right',
            'top-left',
            'bottom-right',
            'bottom',
            'right',
            'top',
            'left',
          ],
          defaultValue: 'top-left',
          control: {
            type: 'select',
          },
        },
        configTopIcon_name: {
          type: 'string',
          defaultValue: 'heart',
          control: {type: 'text'},
        },
        configTopIcon_color: {
          options: Object.entries(Colors)
            .filter(([, _color]) => typeof _color !== 'string')
            .map(([key]) => key),
          defaultValue: 'importantColor',
          control: {
            type: 'select',
          },
        },
        configTopIcon_size: {
          control: {type: 'number', min: 10, max: 50},
          description: 'sizeTop',
          defaultValue: 15,
        },

        configBottomIcon_name: {
          type: 'string',
          defaultValue: 'user',
          control: {type: 'text'},
        },
        configBottomIcon_color: {
          options: Object.entries(Colors)
            .filter(([, _color]) => typeof _color !== 'string')
            .map(([key]) => key),
          defaultValue: 'primaryColor',
          control: {
            type: 'select',
          },
        },
        configBottomIcon_size: {
          control: {type: 'number', min: 10, max: 50},
          description: 'sizeBottom',
          defaultValue: 22,
        },
        touchable: {
          control: {type: 'boolean'},
          defaultValue: false,
        },
      },
    },
  )
  .add(
    'with custom position',
    args => (
      <DoubleIcon
        size={30}
        topIconPosition={{
          top: args.top,
          right: args.right,
          left: args.left,
          bottom: args.bottom,
        }}
        topIconConfig={{
          name: 'heart',
          FontAwesome5: false,
          color: Colors.plannedColor.background,
        }}
        bottomIconConfig={{
          name: 'user',
          FontAwesome5: false,
        }}
      />
    ),
    {
      argTypes: {
        top: {
          control: {
            type: 'range',
            min: -100,
            max: 100,
            step: 1,
          },
          defaultValue: 0,
        },
        right: {
          control: {
            type: 'range',
            min: -100,
            max: 100,
            step: 1,
          },
          defaultValue: 0,
        },
        left: {
          control: {
            type: 'range',
            min: -100,
            max: 100,
            step: 1,
          },
          defaultValue: 0,
        },
        bottom: {
          control: {
            type: 'range',
            min: -100,
            max: 100,
            step: 1,
          },
          defaultValue: 0,
        },
      },
    },
  );
