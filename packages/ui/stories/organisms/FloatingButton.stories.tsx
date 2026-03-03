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
import {FloatingButton as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/FloatingButton',
  component: Component,
};

export default meta;

export const FloatingButton: Story<typeof Component> = {
  args: {
    iconName: 'pen-fill',
    closeIconName: 'x-lg',
    size: 50,
    useCircleStyle: false,
    showTitles: false,
    action1_title: 'Add',
    action1_icon: 'plus-lg',
    action1_color: 'infoColor',
    action1_hidden: false,
    action1_disabled: false,
    action1_indicator: 0,
    action2_title: 'Edit',
    action2_icon: 'pencil',
    action2_color: 'progressColor',
    action2_hidden: false,
    action2_disabled: true,
    action2_indicator: 0,
    action3_title: 'Delete',
    action3_icon: 'trash-fill',
    action3_color: 'errorColor',
    action3_hidden: false,
    action3_disabled: false,
    action3_indicator: 3,
  },
  argTypes: {
    action1_color: colorPicker,
    action2_color: colorPicker,
    action3_color: colorPicker,
    onGlobalPress: disabledControl,
    actions: disabledControl,
    closeOnOutsideClick: disabledControl,
    translator: disabledControl,
    defaultOpenValue: disabledControl,
  },
  render: args => (
    <Component
      actions={[
        {
          key: 1,
          title: args.showTitles ? args.action1_title : null,
          iconName: args.action1_icon,
          color: args.action1_color,
          hideIf: args.action1_hidden,
          disabled: args.action1_disabled,
          indicator: args.action1_indicator,
          onPress: () => {},
        },
        {
          key: 2,
          title: args.showTitles ? args.action2_title : null,
          iconName: args.action2_icon,
          color: args.action2_color,
          hideIf: args.action2_hidden,
          disabled: args.action2_disabled,
          indicator: args.action2_indicator,
          onPress: () => {},
        },
        {
          key: 3,
          title: args.showTitles ? args.action3_title : null,
          iconName: args.action3_icon,
          color: args.action3_color,
          hideIf: args.action3_hidden,
          disabled: args.action3_disabled,
          indicator: args.action3_indicator,
          onPress: () => {},
        },
      ]}
      translator={key => key}
      {...args}
    />
  ),
};
