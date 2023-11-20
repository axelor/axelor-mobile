/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Icon} from '../../src/components/atoms';
import {lightTheme} from '../../src/theme';

const stories = storiesOf('ui/atoms/Icon', module);

stories.add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Icon {...args} color={lightTheme.colors[args.color].background} />
      </View>
    );
  },
  {
    argTypes: {
      size: {
        control: {type: 'number', min: 10, max: 50},
        defaultValue: 20,
      },
      name: {
        type: 'string',
        defaultValue: 'heart',
        control: {type: 'text'},
      },
      touchable: {
        type: 'boolean',
      },
      visible: {
        type: 'boolean',
      },
      FontAwesome5: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      color: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'plannedColor',
        control: {
          type: 'select',
        },
      },
      style: {
        control: {
          type: 'object',
        },
      },
      onPress: {
        action: 'onPress',
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
