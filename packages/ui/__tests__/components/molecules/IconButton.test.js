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
import {Icon, IconButton, Text, lightTheme} from '@axelor/aos-mobile-ui';
import {TouchableOpacity} from 'react-native';

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

    expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background,
        }),
      ]),
    );
  });

  it('applies custom color when provided', () => {
    const customColor = Colors.secondaryColor;
    const wrapper = shallow(<IconButton {...props} color={customColor} />);

    expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: customColor.background,
        }),
      ]),
    );

    expect(wrapper.find(Text).prop('style')).toEqual(
      expect.objectContaining({
        color: customColor.foreground,
      }),
    );
  });

  it('calls onPress when the button is pressed', () => {
    const wrapper = shallow(<IconButton {...props} />);

    wrapper.find(TouchableOpacity).simulate('press');

    expect(props.onPress).toHaveBeenCalled();
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<IconButton {...props} style={customStyle} />);

    expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
