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
import {ImageBubble as Component, InfoBubble} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const IMAGE_URI = 'https://picsum.photos/300/300';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/ImageBubble',
  component: Component,
};

export default meta;

export const ImageBubble: Story<typeof Component> = {
  args: {
    source_uri: IMAGE_URI,
    item1_icon: 'heart',
    item1_color: 'primaryColor',
    item2_icon: 'plus-lg',
    item2_color: 'primaryColor',
    item3_icon: 'pencil',
    item3_color: 'primaryColor',
  },
  argTypes: {
    item1_color: colorPicker,
    item2_color: colorPicker,
    item3_color: colorPicker,
    listComponent: disabledControl,
    source: disabledControl,
    imageSize: disabledControl,
    defaultIconSize: disabledControl,
  },
  render: args => (
    <Component
      source={{uri: args.source_uri}}
      listComponent={[
        <InfoBubble iconName={args.item1_icon} badgeColor={args.item1_color} />,
        null,
        <InfoBubble iconName={args.item2_icon} badgeColor={args.item1_color} />,
        null,
        null,
        <InfoBubble iconName={args.item3_icon} badgeColor={args.item1_color} />,
      ]}
    />
  ),
};
