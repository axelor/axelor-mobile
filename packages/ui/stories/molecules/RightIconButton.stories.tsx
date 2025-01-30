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
import {Icon} from '../../src/components/atoms';
import {RightIconButton} from '../../src/components/molecules';

storiesOf('ui/molecules/RightIconButton', module).add(
  'Default',
  args => {
    return (
      <RightIconButton
        icon={<Icon name={args.iconName} />}
        onPress={console.log}
        title={'Press me'}
        {...args}
      />
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Press me',
        control: {type: 'text'},
      },
      iconName: {
        type: 'string',
        defaultValue: 'heart',
        control: {type: 'text'},
      },
    },
  },
);
