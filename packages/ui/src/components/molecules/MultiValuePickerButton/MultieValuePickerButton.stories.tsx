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
import {default as MultiValuePickerButton} from './MultiValuePickerButton';
import {lightTheme} from '../../../theme/themes';
import {action} from '@storybook/addon-actions';

storiesOf('ui/molecules/MultiValuePickerButton', module).add(
  'custom',
  args => (
    <MultiValuePickerButton
      onPress={() => action('onPress')}
      onPressItem={() => action('onPressItem')}
      listItem={[
        {id: 1, name: 'name1'},
        {id: 2, name: 'name2'},
        {id: 3, name: 'name3'},
      ]}
      labelField={'name'}
      itemColor={lightTheme.colors.primaryColor}
      {...args}
    />
  ),
  {
    argTypes: {
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 20,
        },
      },
      labelField: {
        control: 'select',
        options: ['name', 'id'],
      },
      itemColor: {
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
        control: {
          type: 'select',
        },
      },
    },
  },
);
