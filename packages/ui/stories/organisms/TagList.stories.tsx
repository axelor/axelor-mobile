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
import {TagList as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/TagList',
  component: Component,
};

export default meta;

export const TagList: Story<typeof Component> = {
  args: {
    title: 'Title',
    defaultColor: 'primaryColor',
    hideIfNull: false,
    emptyList: false,
    tag1_title: 'Tag 1',
    tag1_color: 'primaryColor',
    tag1_order: 0,
    tag1_hidden: false,
    tag2_title: 'Tag 2',
    tag2_color: 'infoColor',
    tag2_order: 10,
    tag2_hidden: false,
  },
  argTypes: {
    defaultColor: colorPicker,
    tag1_color: colorPicker,
    tag2_color: colorPicker,
    tags: disabledControl,
    translator: disabledControl,
  },
  render: args => (
    <Component
      translator={(key, values) => {
        const translations = {
          Base_Data: 'data',
          Base_NoDataAvailable: `No ${values?.title} available.`,
        };

        return translations[key] || key;
      }}
      defaultColor={args.defaultColor}
      tags={
        args.emptyList
          ? []
          : [
              {
                title: args.tag1_title,
                color: args.tag1_color,
                order: args.tag1_order,
                hidden: args.tag1_hidden,
              },
              {
                title: args.tag2_title,
                color: args.tag2_color,
                order: args.tag2_order,
                hidden: args.tag2_hidden,
              },
            ]
      }
      {...args}
    />
  ),
};
