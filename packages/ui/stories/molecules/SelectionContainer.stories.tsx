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
import {SelectionContainer as Component} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/SelectionContainer',
  component: Component,
};

export default meta;

export const SelectionContainer: Story<typeof Component> = {
  args: {
    emptyValue: false,
    isPicker: false,
    readonly: false,
    display_empty: false,
  },
  argTypes: {
    objectList: disabledControl,
    displayValue: disabledControl,
    handleSelect: disabledControl,
    selectedItem: disabledControl,
    translator: disabledControl,
    keyField: disabledControl,
    title: disabledControl,
  },
  render: args => {
    const objectList = [
      {id: 1, name: 'Option 1'},
      {id: 2, name: 'Option 2'},
      {id: 3, name: 'Option 3'},
      {id: 4, name: 'Option 4'},
      {id: 5, name: 'Option 5'},
    ];
    return (
      <Component
        objectList={args.display_empty ? [] : objectList}
        selectedItem={[objectList[0]]}
        displayValue={item => item.name}
        {...args}
      />
    );
  },
};
