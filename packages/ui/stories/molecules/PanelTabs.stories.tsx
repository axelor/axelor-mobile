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
import {PanelTabs as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/PanelTabs',
  component: Component,
};

export default meta;

export const PanelTabs: Story<typeof Component> = {
  render: () => (
    <Component
      tabs={[
        {
          key: 1,
          title: 'Page1',
          isActive: true,
          translator: value => value,
          component: <Text>Page1</Text>,
        },
        {
          key: 2,
          title: 'Page2',
          isActive: false,
          translator: value => value,
          component: <Text>Page2</Text>,
        },
      ]}
    />
  ),
  argTypes: {
    tabs: disabledControl,
  },
};
