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
import {storiesOf} from '@storybook/react-native';
import {PriceDetails} from '../../src/components';

storiesOf('ui/molecules/PriceDetails', module).add(
  'Default',
  args => {
    return (
      <PriceDetails
        {...args}
        lineList={[
          {
            title: args.line1_title,
            value: args.line1_value,
            unit: args.line1_unit,
            hideIf: args.line1_hideIf,
          },
          {
            title: args.line2_title,
            value: args.line2_value,
            unit: args.line2_unit,
            size: args.line2_size,
            showLine: args.line2_showLine,
          },
        ]}
      />
    );
  },
  {
    argTypes: {
      line1_title: {
        type: 'string',
        control: {
          type: 'text',
        },
        defaultValue: 'Price',
      },
      line1_value: {
        type: 'number',
        defaultValue: 100,
        control: {
          type: 'number',
        },
      },
      line1_unit: {
        type: 'string',
        control: {
          type: 'text',
        },
        defaultValue: '€',
      },
      line1_hideIf: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      line2_title: {
        type: 'string',
        control: {
          type: 'text',
        },
        defaultValue: 'Total',
      },
      line2_value: {
        type: 'number',
        defaultValue: 100,
        control: {
          type: 'number',
        },
      },
      line2_unit: {
        type: 'string',
        control: {
          type: 'text',
        },
        defaultValue: '€',
      },
      line2_size: {
        type: 'number',
        defaultValue: 18,
        control: {
          type: 'number',
        },
      },
      line2_showLine: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
    },
  },
);
