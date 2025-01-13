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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {Icon, Text, Breadcrumb} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('Breadcrumb Component', () => {
  const mockOnHomePress = jest.fn();
  const mockOnPress = jest.fn();
  const props = {
    items: [
      {title: 'Home', onPress: mockOnPress},
      {title: 'Products'},
      {title: 'Electronics'},
    ],
    onHomePress: mockOnHomePress,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Breadcrumb {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the home icon with correct props', () => {
    const wrapper = shallow(<Breadcrumb {...props} />);
    const homeIcon = wrapper.find(Icon).first();

    expect(homeIcon.exists()).toBeTruthy();
    expect(homeIcon.prop('name')).toBe('house-door-fill');
    expect(homeIcon.prop('touchable')).toBe(true);
    homeIcon.simulate('press');
    expect(mockOnHomePress).toHaveBeenCalled();
  });

  it('renders the correct number of breadcrumb items', () => {
    const wrapper = shallow(<Breadcrumb {...props} />);
    const breadcrumbItems = wrapper.find(Text);

    expect(breadcrumbItems.length).toBe(props.items.length);
  });

  it('renders the chevron icon between breadcrumb items', () => {
    const wrapper = shallow(<Breadcrumb {...props} />);
    const chevrons = wrapper.findWhere(
      node => node.type() === Icon && node.prop('name') === 'chevron-right',
    );

    expect(chevrons.length).toBe(props.items.length);
  });

  it('renders breadcrumb items with onPress handlers when provided', () => {
    const wrapper = shallow(<Breadcrumb {...props} />);
    const clickableItem = wrapper.findWhere(
      node =>
        node.type() === TouchableOpacity &&
        node.find(Text).prop('children') === 'Home',
    );

    expect(clickableItem.exists()).toBeTruthy();
    clickableItem.simulate('press');
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('does not render onPress for items without handlers', () => {
    const wrapper = shallow(<Breadcrumb {...props} />);
    const nonClickableItem = wrapper.findWhere(
      node => node.type() === Text && node.prop('children') === 'Products',
    );

    expect(nonClickableItem.exists()).toBeTruthy();
    expect(nonClickableItem.prop('onPress')).toBeUndefined();
  });

  it('renders correctly when disabled', () => {
    const wrapper = shallow(<Breadcrumb {...props} disabled />);
    const items = wrapper.find(TouchableOpacity);

    items.forEach(_item => {
      expect(_item.exists()).toBeTruthy();
      expect(_item.prop('disabled')).toBeTruthy();
    });
  });

  it('should apply custom styles to the container when style prop is provided', () => {
    const customStyle = {
      fontSize: 25,
      width: '90%',
      height: 25,
      flexDirection: 'row',
      alignSelf: 'center',
    };

    const wrapper = shallow(<Breadcrumb {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      customStyle,
    );
  });
});
