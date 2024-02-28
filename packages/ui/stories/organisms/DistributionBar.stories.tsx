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
import {DistributionBar} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/DistributionBar', module).add(
  'Default',
  args => {
    return (
      <DistributionBar
        {...args}
        distribution={[
          {
            value: args.group1_value,
            color: lightTheme.colors[args.group1_color],
          },
          {
            value: args.group2_value,
            color: lightTheme.colors[args.group2_color],
          },
          {
            value: args.group3_value,
            color: lightTheme.colors[args.group3_color],
          },
        ]}
      />
    );
  },
  {
    argTypes: {
      total: {
        type: 'number',
        defaultValue: 10,
        control: {type: 'number'},
      },
      height: {
        type: 'number',
        defaultValue: 30,
        control: {type: 'number'},
      },
      group1_value: {
        type: 'number',
        defaultValue: 3,
        control: {type: 'number'},
      },
      group1_color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'errorColor',
        control: {
          type: 'select',
        },
      },
      group2_value: {
        type: 'number',
        defaultValue: 2,
        control: {type: 'number'},
      },
      group2_color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'cautionColor',
        control: {
          type: 'select',
        },
      },
      group3_value: {
        type: 'number',
        defaultValue: 5,
        control: {type: 'number'},
      },
      group3_color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'successColor',
        control: {
          type: 'select',
        },
      },
    },
  },
);
