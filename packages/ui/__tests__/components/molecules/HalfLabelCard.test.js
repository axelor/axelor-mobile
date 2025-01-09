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
import {
  Card,
  HalfLabelCard,
  Icon,
  lightTheme,
  Text,
} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('HalfLabelCard Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Card Title',
    iconName: 'star',
    onPress: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<HalfLabelCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the provided icon, title, and chevron icon', () => {
    const wrapper = shallow(<HalfLabelCard {...props} />);

    expect(wrapper.find(Icon).at(0).prop('name')).toBe(props.iconName);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);

    expect(wrapper.find(Icon).at(1).prop('name')).toBe('chevron-right');
  });

  it('renders a touchable component', () => {
    const wrapper = shallow(<HalfLabelCard {...props} />);
    const touchableComponent = wrapper.find(TouchableOpacity);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).not.toBe(true);
  });

  it('applies custom style when provided', () => {
    const customStyle = {backgroundColor: Colors.primaryColor.background_light};
    const wrapper = shallow(<HalfLabelCard {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });
});
