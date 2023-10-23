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
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Card, DropdownMenu, Text} from '@axelor/aos-mobile-ui';

describe('DropdownMenu Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <DropdownMenu selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children when visible is true', () => {
    const wrapper = shallow(
      <DropdownMenu>
        <Text testID="MENU-CONTENT">Menu Content</Text>
      </DropdownMenu>,
    );

    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find(Card).exists()).toBe(true);
    expect(wrapper.find('[testID="MENU-CONTENT"]').exists()).toBe(true);
  });

  it('toggles visibility when action button is pressed', () => {
    const wrapper = shallow(
      <DropdownMenu>
        <Text testID="MENU-CONTENT">Menu Content</Text>
      </DropdownMenu>,
    );

    const actionButton = wrapper.find(TouchableOpacity);

    expect(wrapper.find('[testID="MENU-CONTENT"]').exists()).toBe(false);

    actionButton.simulate('press');

    expect(wrapper.find('[testID="MENU-CONTENT"]').exists()).toBe(true);

    actionButton.simulate('press');
    wrapper.update();

    expect(wrapper.find('[testID="MENU-CONTENT"]').exists()).toBe(false);
  });

  // TODO: check why TouchableOpacity not found(try to mock clickoutside)
  it('closes menu when clicked outside', () => {
    const wrapper = shallow(
      <TouchableWithoutFeedback testID="DROPDOWN-MENU-CONTAINER">
        <DropdownMenu>
          <Text testID="MENU-CONTENT">Menu Content</Text>
        </DropdownMenu>
      </TouchableWithoutFeedback>,
    );

    wrapper.find(TouchableOpacity).simulate('press');

    expect(wrapper.find('[testID="MENU-CONTENT"]').exists()).toBe(true);

    wrapper.find('[testID="DROPDOWN-MENU-CONTAINER"]').simulate('press');

    expect(wrapper.find('[testID="MENU-CONTENT"]').exists()).toBe(false);
  });
});
