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
import {View} from 'react-native';
import type {Meta} from '@storybook/react';
import {ActionCard as Component, Card, Text} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/ActionCard',
  component: Component,
};

export default meta;

export const ActionCard: Story<typeof Component> = {
  args: {
    horizontal: false,
    forceActionsDisplay: false,
    quickAction_visible: true,
    quickAction_iconName: 'airplane',
    quickAction_iconColor: 'primaryColor',
    quickAction_helper: 'Plane',
    quickAction_isLarge: false,
    quickAction_disabled: false,
    action1_visible: true,
    action1_iconName: 'car-front',
    action1_iconColor: 'infoColor',
    action1_helper: 'Car',
    action1_isLarge: false,
    action1_disabled: false,
    action2_visible: true,
    action2_iconName: 'bus-front',
    action2_iconColor: 'secondaryColor_dark',
    action2_helper: 'Bus',
    action2_isLarge: false,
    action2_disabled: false,
    action3_visible: true,
    action3_iconName: 'truck',
    action3_iconColor: 'plannedColor',
    action3_helper: 'Truck',
    action3_isLarge: false,
    action3_disabled: false,
  },
  argTypes: {
    quickAction_iconColor: colorPicker,
    action1_iconColor: colorPicker,
    action2_iconColor: colorPicker,
    action3_iconColor: colorPicker,
    actionList: disabledControl,
    quickAction: disabledControl,
    translator: disabledControl,
  },
  render: args => (
    <View>
      <Component
        children={
          <Card>
            <Text>TEST</Text>
          </Card>
        }
        translator={key => key}
        {...args}
        quickAction={{
          iconName: args.quickAction_iconName,
          iconColor: args.quickAction_iconColor.background,
          helper: args.quickAction_helper,
          large: args.quickAction_isLarge,
          hidden: !args.quickAction_visible,
          disabled: args.quickAction_disabled,
          onPress: () => {},
        }}
        actionList={[
          {
            iconName: args.action1_iconName,
            iconColor: args.action1_iconColor.background,
            helper: args.action1_helper,
            large: args.action1_isLarge,
            hidden: !args.action1_visible,
            disabled: args.action1_disabled,
            onPress: () => {},
          },
          {
            iconName: args.action2_iconName,
            iconColor: args.action2_iconColor.background,
            helper: args.action2_helper,
            large: args.action2_isLarge,
            hidden: !args.action2_visible,
            disabled: args.action2_disabled,
            onPress: () => {},
          },
          {
            iconName: args.action3_iconName,
            iconColor: args.action3_iconColor.background,
            helper: args.action3_helper,
            large: args.action3_isLarge,
            hidden: !args.action3_visible,
            disabled: args.action3_disabled,
            onPress: () => {},
          },
        ]}
      />
    </View>
  ),
};
