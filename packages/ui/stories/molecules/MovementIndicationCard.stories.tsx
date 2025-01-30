/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {action} from '@storybook/addon-actions';
import {MovementIndicationCard} from '../../src/components/molecules';
import {Icon} from '../../src/components/atoms';
import {lightTheme} from '../../src/theme';

storiesOf('ui/molecules/MovementIndicationCard', module).add(
  'custom',
  args => (
    <MovementIndicationCard
      titleTop={'titleTop'}
      iconTop={
        <Icon name="truck" color={lightTheme.colors.primaryColor.background} />
      }
      titleDown={'titleDown'}
      iconDown={<Icon name="geo-alt-fill" />}
      disabledDown={false}
      onPressTitleTop={() => action('onPressTitleTop')}
      onPressTitleDown={() => action('onPressTitleDown')}
      {...args}
    />
  ),
  {
    argTypes: {
      titleTop: {
        control: 'text',
        defaultValue: 'Title top',
      },
      titleDown: {
        control: 'text',
        defaultValue: 'Title down',
      },
      disabledTop: {control: 'boolean', defaultValue: false},
      disabledDown: {control: 'boolean', defaultValue: false},
    },
  },
);
