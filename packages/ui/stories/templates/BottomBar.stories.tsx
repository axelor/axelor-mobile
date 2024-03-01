/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Dimensions, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {BottomBar, Text} from '../../src/components';
import {lightTheme} from '../../src/theme';

const Colors = lightTheme.colors;
const Screen = ({title}) => (
  <View style={{height: Dimensions.get('screen').height * 0.42}}>
    <Text>{title}</Text>
  </View>
);

const EXEMPLE = [
  {
    iconName: 'house',
    viewComponent: <Screen title="House view component" />,
    color: Colors.secondaryColor_dark,
  },
  {
    iconName: 'clock-history',
    viewComponent: <Screen title="Clock history view component" />,
    indicator: 5,
    color: Colors.plannedColor,
  },
  {
    iconName: 'trash',
    viewComponent: <Screen title="Trash view component" />,
    color: Colors.infoColor,
  },
  {
    iconName: 'x-lg',
    viewComponent: <Screen title="X view component" />,
    color: Colors.progressColor,
  },
  {
    iconName: 'person-fill',
    viewComponent: <Screen title="Person view component" />,
  },
];

storiesOf('ui/templates/BottomBar', module).add(
  'Default',
  args => <BottomBar items={EXEMPLE} {...args} />,
  {
    argTypes: {
      itemSize: {
        control: {
          type: 'number',
        },
        defaultValue: 40,
      },
    },
  },
);
