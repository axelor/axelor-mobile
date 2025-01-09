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
import {Image} from '../../src/components/molecules';

const IMAGE_URI =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg';

storiesOf('ui/molecules/Image', module).add(
  'Default',
  args => {
    return (
      <Image
        source={{uri: IMAGE_URI}}
        resizeMode="contain"
        imageSize={{width: 200, height: 200}}
        {...args}
      />
    );
  },
  {
    argTypes: {
      source: {
        control: {
          type: 'select',
          options: [{uri: IMAGE_URI}, 'Invalid source'],
        },
        defaultValue: {uri: IMAGE_URI},
      },
      resizeMode: {
        control: {
          type: 'select',
          options: ['cover', 'contain', 'stretch', 'repeat', 'center'],
        },
        defaultValue: 'contain',
      },
      defaultIconSize: {
        control: {
          type: 'range',
          min: 15,
          max: 150,
          step: 10,
        },
        defaultValue: 30,
      },
    },
  },
);
