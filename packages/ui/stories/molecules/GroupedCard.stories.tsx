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

import React from 'react';
import type {Meta} from '@storybook/react';
import {GroupedCard as Component, SwitchCard} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/GroupedCard',
  component: Component,
};

export default meta;

export const GroupedCard: Story<typeof Component> = {
  args: {
    empty_list: false,
  },
  argTypes: {
    data: disabledControl,
    renderItem: disabledControl,
    keyExtractor: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      data={
        args.empty_list
          ? []
          : [
              {key: 'filter', title: 'Afficher le filtre', value: true},
              {key: 'colorblind', title: 'Mode daltonien', value: false},
              {key: 'subtitles', title: 'Afficher les sous-titres', value: false},
              {key: 'actions', title: 'Afficher les actions rapides', value: false},
              {key: 'offline', title: 'Activer le mode hors-ligne', value: true},
            ]
      }
      keyExtractor={item => item.key}
      renderItem={item => (
        <SwitchCard
          title={item.title}
          defaultValue={item.value}
          onToggle={() => {}}
        />
      )}
    />
  ),
};
