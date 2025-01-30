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
import {Text} from '../../src/components/atoms';
import {PanelTabs} from '../../src/components/molecules';

storiesOf('ui/molecules/PanelTabs', module).add('custom', () => {
  const I18n = value => value;
  return (
    <PanelTabs
      tabs={[
        {
          key: 1,
          title: 'Page1',
          isActive: true,
          translator: I18n,
          component: <Text>Page1</Text>,
        },
        {
          key: 2,
          title: 'Page2',
          isActive: false,
          translator: I18n,
          component: <Text>Page2</Text>,
        },
      ]}
    />
  );
});
