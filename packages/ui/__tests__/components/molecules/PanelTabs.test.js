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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {PanelTabs, Text} from '@axelor/aos-mobile-ui';

describe('PanelTabs Component', () => {
  const tabs = [
    {
      key: 1,
      title: 'Page1',
      isActive: false,
      component: <Text>Page1</Text>,
      translator: jest.fn(),
    },
    {
      key: 2,
      title: 'Page2',
      isActive: true,
      component: <Text>Page2</Text>,
      translator: jest.fn(),
    },
    {
      key: 3,
      title: 'Page3',
      isActive: false,
      disabled: true,
      component: <Text>Page3</Text>,
      translator: jest.fn(),
    },
  ];

  it('should render without crashing', () => {
    const wrapper = shallow(<PanelTabs tabs={tabs} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render 3 tabs', () => {
    const wrapper = shallow(<PanelTabs tabs={tabs} />);

    expect(wrapper.find(View).at(1).children()).toHaveLength(3);
  });

  it('should render the component of active tab (tab 2)', () => {
    const wrapper = shallow(<PanelTabs tabs={tabs} />);

    expect(wrapper.contains(tabs[1].component)).toBe(true);
  });

  it('should render disabled tab when disabled prop is true', () => {
    const wrapper = shallow(<PanelTabs tabs={tabs} />);

    expect(wrapper.find(View).at(1).children().at(2).prop('disabled')).toBe(
      true,
    );
  });
});
