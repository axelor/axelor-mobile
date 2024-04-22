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
import {TagList} from '../../src/components/organisms';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/TagList', module).add(
  'Default',
  args => {
    return (
      <TagList
        {...args}
        tags={[
          {
            title: args.tag1_title,
            color: lightTheme.colors[args.tag1_color],
            order: args.tag1_order,
            hide: args.tag1_hide,
          },
          {
            title: args.tag2_title,
            color: lightTheme.colors[args.tag2_color],
            order: args.tag2_order,
            hide: args.tag2_hide,
          },
        ]}
      />
    );
  },
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Title',
      },
      tag1_title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Tag 1',
      },
      tag1_color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      tag1_order: {
        type: 'number',
        defaultValue: 1,
        control: {
          type: 'number',
        },
      },
      tag1_hide: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      tag2_title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Tag 2',
      },
      tag2_color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        control: {
          type: 'select',
        },
      },
      tag2_order: {
        type: 'number',
        defaultValue: 2,
        control: {
          type: 'number',
        },
      },
      tag2_hide: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
