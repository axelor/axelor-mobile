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
import {ProgressBar} from '../../src/components/organisms';

storiesOf('ui/organisms/ProgressBar', module).add(
  'Default',
  args => {
    return <ProgressBar value={50} total={100} {...args} />;
  },
  {
    argTypes: {
      value: {
        type: 'number',
        defaultValue: 50,
        control: {type: 'range', min: 0, max: 100, step: 1},
      },
      total: {
        type: 'number',
        defaultValue: 100,
        control: {type: 'number'},
      },
      showPercent: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      centredPercent: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      stripe: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      stripeDuration: {
        type: 'number',
        defaultValue: 60000,
        control: {type: 'number'},
      },
      stripeWidth: {
        type: 'number',
        defaultValue: 40,
        control: {type: 'number'},
      },
      colorRepartition: {
        type: 'object',
        defaultValue: {},
        control: {type: 'object'},
      },
      height: {
        type: 'number',
        defaultValue: 30,
        control: {type: 'number'},
      },
    },
  },
);
