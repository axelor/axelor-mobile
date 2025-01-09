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
import {shallow} from 'enzyme';
import {Icon, IconButton, Text, lightTheme} from '@axelor/aos-mobile-ui';
import {TouchableOpacity} from 'react-native';
import {getGlobalStyles} from '../../tools';

describe('IconButton Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Button Title',
    iconName: 'star',
    onPress: jest.fn(),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<IconButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the provided icon, title, and applies default color', () => {
    const wrapper = shallow(<IconButton {...props} />);

    expect(wrapper.find(Icon).prop('name')).toBe(props.iconName);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);

    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      backgroundColor: Colors.primaryColor.background,
    });
  });

  it('applies custom color when provided', () => {
    const customColor = Colors.secondaryColor;
    const wrapper = shallow(<IconButton {...props} color={customColor} />);

    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      backgroundColor: customColor.background,
    });

    expect(getGlobalStyles(wrapper.find(Text))).toMatchObject({
      color: customColor.foreground,
    });
  });

  it('renders a touchable component', () => {
    const wrapper = shallow(<IconButton {...props} />);
    const touchableComponent = wrapper.find(TouchableOpacity);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).not.toBe(true);
  });

  it('renders a non touchable component when disabled', () => {
    const wrapper = shallow(<IconButton {...props} disabled />);
    const touchableComponent = wrapper.find(TouchableOpacity);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).toBe(true);
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<IconButton {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject(
      customStyle,
    );
  });
});
