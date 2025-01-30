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
import {Text} from '../../src/components/atoms';
import {ImageBubble} from '../../src/components/organisms';

storiesOf('ui/organisms/ImageBubble', module).add('Default', () => (
  <ImageBubble
    source={{
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg',
    }}
    listComponent={[
      <Text key="1">Text Component 1</Text>,
      <Text key="2">Text Component 2</Text>,
    ]}
  />
));
