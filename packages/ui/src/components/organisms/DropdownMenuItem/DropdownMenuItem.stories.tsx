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
import {action} from '@storybook/addon-actions';
import {default as DropdownMenuItem} from './DropdownMenuItem';

storiesOf('ui/organisms/DropdownMenuItem', module)
  .add('default', () => (
    <DropdownMenuItem
      icon="paperclip"
      placeholder="Placeholder"
      onPress={action('onPress')}
    />
  ))
  .add('with indicator', () => (
    <DropdownMenuItem
      icon="paperclip"
      placeholder="Placeholder"
      indicator={5}
      onPress={action('onPress')}
    />
  ))
  .add('with FontAwesome5 icon', () => (
    <DropdownMenuItem
      icon="file-alt"
      placeholder="Placeholder"
      FontAwesome5
      onPress={action('onPress')}
    />
  ));
