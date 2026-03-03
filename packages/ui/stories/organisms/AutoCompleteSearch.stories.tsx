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
import {AutoCompleteSearch as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/AutoCompleteSearch',
  component: Component,
};

export default meta;

export const AutoCompleteSearch: Story<typeof Component> = {
  args: {
    title: 'Title',
    value: '',
    placeholder: 'Search',
    readonly: false,
    required: false,
    oneFilter: false,
    selectLastItem: true,
    showDetailsPopup: true,
  },
  argTypes: {
    scanIconColor: colorPicker,
    objectList: disabledControl,
    onChangeValue: disabledControl,
    onScanPress: disabledControl,
    onSelection: disabledControl,
    fetchData: disabledControl,
    displayValue: disabledControl,
    changeScreenAfter: disabledControl,
    navigate: disabledControl,
    loadingList: disabledControl,
    moreLoading: disabledControl,
    isListEnd: disabledControl,
    translator: disabledControl,
    isScrollViewContainer: disabledControl,
  },
  render: args => (
    <Component
      objectList={[
        {id: 1, name: 'John'},
        {id: 2, name: 'Jane'},
        {id: 3, name: 'Mark'},
        {id: 4, name: 'Lucy'},
        {id: 5, name: 'Mike'},
        {id: 6, name: 'Joe'},
      ]}
      displayValue={item => item.name}
      {...args}
      scanIconColor={args.scanIconColor?.background}
    />
  ),
};
