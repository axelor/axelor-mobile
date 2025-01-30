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
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {DottedLine} from '../../src/components/atoms';

storiesOf('ui/atoms/DottedLine', module).add(
  'default',
  args => (
    <View {...args}>
      <DottedLine />
    </View>
  ),
  {
    argTypes: {
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
);
