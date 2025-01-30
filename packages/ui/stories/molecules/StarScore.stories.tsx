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
import {StarScore} from '../../src/components/molecules';
import {lightTheme} from '../../src/theme';

const stories = storiesOf('ui/molecules/StarScore', module);

stories.add(
  'Default',
  args => {
    return <StarScore {...args} color={lightTheme.colors[args.color]} />;
  },
  {
    argTypes: {
      score: {
        control: {type: 'number', min: 0, max: 5, step: 0.5},
        description: 'The score to display',
        defaultValue: 3,
      },
      showHalfStar: {
        control: 'boolean',
        description: 'Whether to show half stars',
        defaultValue: true,
      },
      showMissingStar: {
        control: 'boolean',
        description: 'Whether to show missing stars',
        defaultValue: true,
      },
      size: {
        control: {type: 'number', min: 10, max: 50},
        description: 'The size of the stars',
        defaultValue: 20,
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
    },
  },
);
