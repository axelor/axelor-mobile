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
import {InfoBubble} from '../../src/components';
import {lightTheme} from '../../src/theme/themes';

storiesOf('ui/organisms/InfoBubble', module).add(
  'default',
  args => {
    return (
      <InfoBubble
        iconName="info"
        indication="This is an indication"
        {...args}
        badgeColor={lightTheme.colors[args.color]}
      />
    );
  },
  {
    argTypes: {
      iconName: {
        control: {
          type: 'text',
        },
        defaultValue: 'info',
      },
      color: {
        control: {
          type: 'select',
        },
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
      },
      indication: {
        control: {
          type: 'text',
        },
        defaultValue: 'This is an indication',
      },
      size: {
        control: {
          type: 'number',
        },
        defaultValue: 25,
      },
      position: {
        control: {
          type: 'select',
        },
        options: ['right', 'left'],
        defaultValue: 'right',
      },
      coloredBubble: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      usePopup: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);
