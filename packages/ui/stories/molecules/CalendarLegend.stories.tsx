/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import type {Meta} from '@storybook/react';
import {CalendarLegend as Component} from '../../src/components';
import {useThemeColor} from '../../src/theme';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/CalendarLegend',
  component: Component,
};

export default meta;

const LABELS: Record<string, string> = {Base_Legend: 'Legend'};

const translator = (key: string) => LABELS[key] ?? key.split('_').pop() ?? key;

export const CalendarLegend: Story<typeof Component> = {
  args: {
    showTodayButton: true,
  },
  argTypes: {
    items: disabledControl,
    onTodayPress: disabledControl,
    onPreviousPress: disabledControl,
    onNextPress: disabledControl,
    translator: disabledControl,
    style: disabledControl,
  },
  render: args => {
    const Colors = useThemeColor();

    // One entry per leave status, plus the two kinds of non-working day: the
    // set a planning screen actually passes.
    const items = useMemo(
      () => [
        {
          key: 'waiting',
          title: 'Waiting validation',
          color: Colors.cautionColor,
        },
        {key: 'validated', title: 'Validated', color: Colors.successColor},
        {key: 'refused', title: 'Refused', color: Colors.errorColor},
        {
          key: 'weekEnd',
          title: 'Non-working day',
          color: Colors.secondaryColor,
        },
        {key: 'holiday', title: 'Public holiday', color: Colors.indigo},
      ],
      [Colors],
    );

    return (
      <Component
        {...args}
        items={items}
        translator={translator}
        onTodayPress={() => {}}
        onPreviousPress={() => {}}
        onNextPress={() => {}}
      />
    );
  },
};
