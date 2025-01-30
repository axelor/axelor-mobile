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
import {TagList} from '../../src/components';
import {lightTheme} from '../../src/theme';

const availableColors = [
  'undefined',
  ...Object.entries(lightTheme.colors)
    .filter(([, _color]) => typeof _color !== 'string')
    .map(([key]) => key),
];

const defaultTranslator = (key, values) => {
  const translations = {
    Base_Data: 'data',
    Base_NoDataAvailable: `No ${values?.title} available.`,
  };

  return translations[key] || key;
};

storiesOf('ui/organisms/TagList', module).add(
  'Default',
  args => {
    return (
      <TagList
        {...args}
        defaultColor={lightTheme.colors[args.defaultColor]}
        tags={[
          {
            title: args.tag1_title,
            color: lightTheme.colors[args.tag1_color],
            order: args.tag1_order,
            hidden: args.tag1_hidden,
          },
          {
            title: args.tag2_title,
            color: lightTheme.colors[args.tag2_color],
            order: args.tag2_order,
            hidden: args.tag2_hidden,
          },
        ]}
        translator={defaultTranslator}
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
      defaultColor: {
        options: availableColors,
        control: {
          type: 'select',
        },
      },
      hideIfNull: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      tag1_title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Tag 1',
      },
      tag1_color: {
        options: availableColors,
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      tag1_order: {
        type: 'number',
        defaultValue: 0,
        control: {
          type: 'number',
        },
      },
      tag1_hidden: {
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
        options: availableColors,
        control: {
          type: 'select',
        },
      },
      tag2_order: {
        type: 'number',
        defaultValue: 10,
        control: {
          type: 'number',
        },
      },
      tag2_hidden: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
