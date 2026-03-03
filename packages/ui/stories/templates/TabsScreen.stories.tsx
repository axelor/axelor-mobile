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
import {TabsScreen as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const viewContent = <Text>Tab Content</Text>;

const meta: Meta<typeof Component> = {
  title: 'ui/templates/TabsScreen',
  component: Component,
};

export default meta;

export const TabsScreen: Story<typeof Component> = {
  args: {
    position: 'top',
    tabHeight: 60,
    tabWidth: 100,
    tab1_title: 'Tab 1',
    tab1_count: 0,
    tab1_disabled: false,
    tab1_hidden: false,
    tab1_showBadge: false,
    tab2_title: 'Tab 2',
    tab2_count: 0,
    tab2_disabled: false,
    tab2_hidden: false,
    tab2_showBadge: false,
    tab3_title: 'Tab 3',
    tab3_count: 0,
    tab3_disabled: false,
    tab3_hidden: false,
    tab3_showBadge: false,
    tab4_title: 'Tab 4',
    tab4_count: 0,
    tab4_disabled: false,
    tab4_hidden: false,
    tab4_showBadge: false,
    tab5_title: 'Tab 5',
    tab5_count: 0,
    tab5_disabled: false,
    tab5_hidden: false,
    tab5_showBadge: false,
    tab6_title: 'Tab 6',
    tab6_count: 0,
    tab6_disabled: false,
    tab6_hidden: false,
    tab6_showBadge: false,
  },
  argTypes: {
    items: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      items={[
        {
          key: 1,
          title: args.tab1_title,
          view: viewContent,
          count: args.tab1_count,
          disabled: args.tab1_disabled,
          hidden: args.tab1_hidden,
          showBadge: args.tab1_showBadge,
        },
        {
          key: 2,
          title: args.tab2_title,
          view: viewContent,
          count: args.tab2_count,
          disabled: args.tab2_disabled,
          hidden: args.tab2_hidden,
          showBadge: args.tab2_showBadge,
        },
        {
          key: 3,
          title: args.tab3_title,
          view: viewContent,
          count: args.tab3_count,
          disabled: args.tab3_disabled,
          hidden: args.tab3_hidden,
          showBadge: args.tab3_showBadge,
        },
        {
          key: 4,
          title: args.tab4_title,
          view: viewContent,
          count: args.tab4_count,
          disabled: args.tab4_disabled,
          hidden: args.tab4_hidden,
          showBadge: args.tab4_showBadge,
        },
        {
          key: 5,
          title: args.tab5_title,
          view: viewContent,
          count: args.tab5_count,
          disabled: args.tab5_disabled,
          hidden: args.tab5_hidden,
          showBadge: args.tab5_showBadge,
        },
        {
          key: 6,
          title: args.tab6_title,
          view: viewContent,
          count: args.tab6_count,
          disabled: args.tab6_disabled,
          hidden: args.tab6_hidden,
          showBadge: args.tab6_showBadge,
        },
      ]}
    />
  ),
};
