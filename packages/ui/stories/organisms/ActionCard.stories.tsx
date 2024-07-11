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
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {ActionCard, Card, Text} from '../../src/components';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/ActionCard', module).add(
  'Default',
  args => {
    return (
      <ActionCard
        children={
          <Card style={styles.card}>
            <Text>TEST</Text>
          </Card>
        }
        translator={key => key}
        {...args}
        actionList={[
          {
            iconName: 'car-front',
            helper: 'Car',
            large: args.carLarge,
            onPress: () => {},
          },
          {
            iconName: 'bus-front',
            iconColor: lightTheme.colors[args.busColor].background,
            helper: 'Bus',
            onPress: () => {},
          },
          {
            iconName: 'truck',
            helper: 'Truck',
            onPress: () => {},
            hidden: args.truckHidden,
            disabled: args.truckDisabled,
          },
        ]}
      />
    );
  },
  {
    argTypes: {
      horizontal: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      carLarge: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      busColor: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      truckHidden: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      truckDisabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);

const styles = StyleSheet.create({
  card: {
    height: '100%',
  },
});
