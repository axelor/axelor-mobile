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
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Badge} from './Badge';
import {lightTheme} from '../../../theme/themes';

storiesOf('ui/molecules/Badge', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Badge title={''} {...args} />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Badge',
      },
      color: {
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
        control: {
          type: 'select',
          labels: {
            primary: 'Primary',
            caution: 'Caution',
          },
        },
      },
      numberOfLines: {
        control: {
          type: 'range',
          min: 1,
          max: 5,
          step: 1,
        },
        defaultValue: 1,
      },
    },
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
