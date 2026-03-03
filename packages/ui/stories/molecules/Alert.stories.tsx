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
import {Alert as Component, Text} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/Alert',
  component: Component,
};

export default meta;

export const Alert: Story<typeof Component> = {
  args: {
    visible: true,
    title: 'Title',
    cancelButtonConfig_title: 'Cancel',
    cancelButtonConfig_color: 'errorColor',
    cancelButtonConfig_iconName: 'x',
    cancelButtonConfig_hide: false,
    cancelButtonConfig_showInHeader: false,
    cancelButtonConfig_width: 115,
    confirmButtonConfig_title: 'Ok',
    confirmButtonConfig_color: 'primaryColor',
    confirmButtonConfig_iconName: 'check',
    confirmButtonConfig_hide: false,
    confirmButtonConfig_width: 115,
    noBoldTitle: false,
  },
  argTypes: {
    cancelButtonConfig_color: colorPicker,
    confirmButtonConfig_color: colorPicker,
    cancelButtonConfig: disabledControl,
    confirmButtonConfig: disabledControl,
    translator: disabledControl,
  },
  render: args => {
    return (
      <Component
        visible
        {...args}
        cancelButtonConfig={{
          title: args.cancelButtonConfig_title,
          color: args.cancelButtonConfig_color,
          iconName: args.cancelButtonConfig_iconName,
          hide: args.cancelButtonConfig_hide,
          showInHeader: args.cancelButtonConfig_showInHeader,
          width: args.cancelButtonConfig_width,
        }}
        confirmButtonConfig={{
          title: args.confirmButtonConfig_title,
          color: args.confirmButtonConfig_color,
          iconName: args.confirmButtonConfig_iconName,
          hide: args.confirmButtonConfig_hide,
          width: args.confirmButtonConfig_width,
        }}>
        <Text>TEST</Text>
      </Component>
    );
  },
};
