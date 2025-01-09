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
import {TabsScreen, Text} from '../../src/components';
import {TabsPosition} from '../../src/components/templates/TabsScreen/tabs.helper';

const EXEMPLE = [
  {
    key: 1,
    title: 'Text 1',
    view: <Text>Tab1</Text>,
  },
  {
    key: 2,
    title: 'Text 2',
    view: <Text>Tab2</Text>,
    count: 15,
    showBadge: true,
  },
  {
    key: 3,
    title: 'Text 3',
    view: <Text>Tab3</Text>,
  },
  {
    key: 4,
    title: 'Text 4',
    view: <Text>Tab4</Text>,
  },
  {
    key: 5,
    title: 'Text 5',
    view: <Text>Tab5</Text>,
  },
  {
    key: 6,
    title: 'Text 6',
    view: <Text>Tab6</Text>,
  },
];

storiesOf('ui/templates/TabsScreen', module).add(
  'Default',
  args => {
    return <TabsScreen {...args} items={EXEMPLE} />;
  },
  {
    argTypes: {
      position: {
        control: {
          type: 'select',
        },
        options: Object.values(TabsPosition),
        defaultValue: TabsPosition.Top,
      },
      tabHeight: {
        control: {
          type: 'number',
        },
        defaultValue: 60,
      },
      tabWidth: {
        control: {
          type: 'number',
        },
        defaultValue: 100,
      },
    },
  },
);
