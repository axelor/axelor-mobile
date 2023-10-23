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
import {shallow} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import {DropdownCard, Icon, Text} from '@axelor/aos-mobile-ui';

describe('DropdownCard Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <DropdownCard selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with title and chevron down icon', () => {
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" DropdownIsOpen={false}>
        <Text testID="CHILDREN-CONTENT">Content goes here</Text>
      </DropdownCard>,
    );

    expect(wrapper.find(Text).prop('children')).toBe('Dropdown Title');
    expect(wrapper.find(Icon).prop('name')).toBe('chevron-down');
  });

  it('toggles the dropdown on touchable press', () => {
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" DropdownIsOpen={false}>
        <Text testID="CHILDREN-CONTENT">Content goes here</Text>
      </DropdownCard>,
    );

    const touchable = wrapper.find(TouchableOpacity);

    expect(wrapper.find(Icon).prop('name')).toBe('chevron-down');

    touchable.simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('chevron-up');

    touchable.simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('chevron-down');
  });

  it('renders children content when DropdownIsOpen prop is true', () => {
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" DropdownIsOpen={true}>
        <Text testID="CHILDREN-CONTENT">Content goes here</Text>
      </DropdownCard>,
    );

    expect(wrapper.find('Text[testID="CHILDREN-CONTENT"]').exists()).toBe(true);
  });

  it('calls onPress prop when touchable is pressed', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" onPress={onPressMock}>
        <Text testID="CHILDREN-CONTENT">Content goes here</Text>
      </DropdownCard>,
    );

    const touchable = wrapper.find(TouchableOpacity);
    touchable.simulate('press');

    expect(onPressMock).toHaveBeenCalled();
  });
});
