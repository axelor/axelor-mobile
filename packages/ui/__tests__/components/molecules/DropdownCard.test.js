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
import {TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {DropdownCard, Icon, Text} from '@axelor/aos-mobile-ui';

describe('DropdownCard Component', () => {
  const props = {
    title: 'title',
    children: <Text testID="CHILDREN-CONTENT">Content goes here</Text>,
    dropdownIsOpen: false,
    showIcon: true,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<DropdownCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with title and icon', () => {
    const wrapper = shallow(<DropdownCard {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
    expect(wrapper.find(Icon).prop('name')).toBe('chevron-down');
  });

  it('renders correctly without icon', () => {
    const wrapper = shallow(<DropdownCard {...props} showIcon={false} />);

    expect(wrapper.find(Icon).exists()).toBe(false);
  });

  it('toggles the dropdown on touchable press', () => {
    const wrapper = shallow(<DropdownCard {...props} />);

    expect(wrapper.find(Icon).prop('name')).toBe('chevron-down');

    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('chevron-up');

    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('chevron-down');
  });

  it('renders children content when DropdownIsOpen prop is true', () => {
    const wrapper = shallow(<DropdownCard {...props} dropdownIsOpen={true} />);

    expect(wrapper.find('Text[testID="CHILDREN-CONTENT"]').exists()).toBe(true);
  });
});
