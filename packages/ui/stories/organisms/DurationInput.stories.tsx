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
import {DurationInput} from '../../src/components/organisms';

storiesOf('ui/organisms/DurationInput', module).add(
  'Default',
  args => {
    return <DurationInput onChange={action('onChange')} {...args} />;
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Input Title',
        control: {type: 'text'},
      },
      defaultValue: {
        type: 'number',
        defaultValue: 50000,
        control: {type: 'number'},
      },
      required: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      readonly: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
