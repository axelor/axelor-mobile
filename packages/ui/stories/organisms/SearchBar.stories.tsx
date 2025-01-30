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
import {SearchBar} from '../../src/components/organisms';

storiesOf('ui/organisms/SearchBar', module).add(
  'Default',
  args => {
    return <SearchBar {...args} />;
  },
  {
    argTypes: {
      valueTxt: {
        type: 'string',
        defaultValue: '',
        control: {type: 'text'},
      },
      placeholder: {
        type: 'string',
        defaultValue: 'Search',
        control: {type: 'text'},
      },
      disableSearchPress: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
