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
import {QuantityCard as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/QuantityCard',
  component: Component,
};

export default meta;

export const QuantityCard: Story<typeof Component> = {
  args: {
    labelQty: 'Label qty',
    defaultValue: 5,
    editable: false,
    isBigButton: false,
    actionQty: true,
    iconName: 'pencil-fill',
    showChildren: false,
    translator: key => {
      const translations = {
        Base_DecimalSpacer: ',',
        Base_ThousandSpacer: '.',
      };

      return translations[key] || key;
    },
  },
  argTypes: {
    style: disabledControl,
    children: disabledControl,
    onValueChange: disabledControl,
    onPressActionQty: disabledControl,
    translator: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      children={args.showChildren ? <Text>Title</Text> : undefined}
    />
  ),
};
