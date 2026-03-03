/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import type {Meta} from '@storybook/react';
import {Image as Component} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const IMAGE_URI = 'https://picsum.photos/200/300';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/Image',
  component: Component,
};

export default meta;

export const Image: Story<typeof Component> = {
  args: {
    source_uri: IMAGE_URI,
    resizeMode: 'contain',
    defaultIconSize: 30,
    image_size: 200,
  },
  argTypes: {
    source: disabledControl,
    imageSize: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      source={{uri: args.source_uri}}
      imageSize={{height: args.image_size, width: args.image_size}}
    />
  ),
};
