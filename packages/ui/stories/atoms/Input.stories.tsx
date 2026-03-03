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
import {Input as Component} from '../../src/components/atoms';
import {
  disabledControl,
  keyboardPicker,
  Story,
  writingPicker,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/atoms/Input',
  component: Component,
};

export default meta;

export const Input: Story<typeof Component> = {
  args: {
    placeholder: 'Enter text here',
    secureTextEntry: false,
    readOnly: false,
    multiline: false,
    value: '',
    numberOfLines: 1,
    keyboardType: 'default',
    isFocus: false,
  },
  argTypes: {
    numberOfLines: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
        step: 1,
      },
    },
    keyboardType: keyboardPicker,
    writingType: writingPicker,
    onChange: disabledControl,
    onContentSizeChange: disabledControl,
    onEndFocus: disabledControl,
    onSelection: disabledControl,
    inputRef: disabledControl,
  },
};
