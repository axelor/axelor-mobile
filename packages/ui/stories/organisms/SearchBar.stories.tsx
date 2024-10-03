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
import type {Meta} from '@storybook/react';
import {SearchBar as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/SearchBar',
  component: Component,
};

export default meta;

export const SearchBar: Story<typeof Component> = {
  args: {
    title: 'Title',
    valueTxt: '',
    placeholder: 'Search',
    readonly: false,
    required: false,
    disableSearchPress: false,
  },
  argTypes: {
    scanIconColor: colorPicker,
    inputRef: disabledControl,
    onChangeTxt: disabledControl,
    onClearPress: disabledControl,
    onEndFocus: disabledControl,
    onScanPress: disabledControl,
    onSearchPress: disabledControl,
    onSelection: disabledControl,
    selected: disabledControl,
  },
  render: args => (
    <Component {...args} scanIconColor={args.scanIconColor?.background} />
  ),
};
