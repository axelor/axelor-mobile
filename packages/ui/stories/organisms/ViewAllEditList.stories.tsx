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

import type {Meta} from '@storybook/react';
import {ViewAllEditList as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const DATA = [
  {
    id: 0,
    name: 'Line 1',
    nameDetails: 'Details of line 1',
    qty: 3,
    unitName: 'unit',
  },
  {
    id: 1,
    name: 'Line 2',
    qty: 500,
    unitName: 'g',
  },
  {
    id: 2,
    name: 'Line 3',
    nameDetails: 'Details of line 3',
    qty: 5,
    unitName: 'm',
  },
  {
    id: 3,
    name: 'Line 4',
    nameDetails: 'Details of line 4',
    qty: 3,
    unitName: 'km',
  },
  {
    id: 4,
    name: 'Line 5',
    qty: 10,
    unitName: 'L',
  },
];

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/ViewAllEditList',
  component: Component,
};

export default meta;

export const ViewAllEditList: Story<typeof Component> = {
  args: {
    title: 'Title',
    lines: DATA,
    currentLineId: 1,
    setLines: () => {},
    handleEditLine: () => {},
    translator: key => key,
  },
  argTypes: {
    currentLineId: {
      control: {type: 'number', min: 0, max: DATA.length - 1, step: 1},
    },
    lines: disabledControl,
    setLines: disabledControl,
    handleEditLine: disabledControl,
    translator: disabledControl,
  },
};
