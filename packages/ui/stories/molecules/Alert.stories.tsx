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
import {Alert, Text} from '../../src/components';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/Alert', module).add(
  'Default',
  args => {
    return (
      <Alert
        visible
        {...args}
        cancelButtonConfig={{
          title: args.cancelButtonConfig_title,
          color: lightTheme.colors[args.cancelButtonConfig_color],
          iconName: args.cancelButtonConfig_iconName,
          hide: args.cancelButtonConfig_hide,
          showInHeader: args.cancelButtonConfig_showInHeader,
          width: args.cancelButtonConfig_width,
        }}
        confirmButtonConfig={{
          title: args.confirmButtonConfig_title,
          color: lightTheme.colors[args.confirmButtonConfig_color],
          iconName: args.confirmButtonConfig_iconName,
          hide: args.confirmButtonConfig_hide,
          width: args.confirmButtonConfig_width,
        }}>
        <Text>TEST</Text>
      </Alert>
    );
  },
  {
    argTypes: {
      visible: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      title: {
        type: 'string',
        defaultValue: 'Title',
        control: {type: 'text'},
      },
      cancelButtonConfig_title: {
        type: 'string',
        defaultValue: 'Cancel',
        control: {type: 'text'},
      },
      cancelButtonConfig_color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'errorColor',
        control: {
          type: 'select',
        },
      },
      cancelButtonConfig_iconName: {
        type: 'string',
        defaultValue: 'x',
        control: {type: 'text'},
      },
      cancelButtonConfig_hide: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      cancelButtonConfig_showInHeader: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      cancelButtonConfig_width: {
        type: 'number',
        defaultValue: 115,
        control: {type: 'number'},
      },
      confirmButtonConfig_title: {
        type: 'string',
        defaultValue: 'Ok',
        control: {type: 'text'},
      },
      confirmButtonConfig_color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      confirmButtonConfig_iconName: {
        type: 'string',
        defaultValue: 'check',
        control: {type: 'text'},
      },
      confirmButtonConfig_hide: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      confirmButtonConfig_width: {
        type: 'number',
        defaultValue: 115,
        control: {type: 'number'},
      },
    },
  },
);
