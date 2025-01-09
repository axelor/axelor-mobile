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
import {TouchableOpacity} from 'react-native';
import {CircleButton, Icon, lightTheme} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('CircleButton Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    onPress: jest.fn(),
    iconName: 'test-icon',
    disabled: false,
    size: 50,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<CircleButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly when not disabled', () => {
    const wrapper = shallow(<CircleButton {...props} />);

    expect(wrapper.find(Icon)).toHaveLength(1);
    expect(wrapper.find(Icon).prop('name')).toBe(props.iconName);
    expect(wrapper.find(Icon).prop('color')).toBe(
      Colors.primaryColor.foreground,
    );

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(false);
    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      backgroundColor: Colors.primaryColor.background,
      borderRadius: props.size,
      width: props.size,
      height: props.size,
    });
  });

  it('renders correctly when disabled', () => {
    const wrapper = shallow(<CircleButton {...props} disabled={true} />);

    expect(wrapper.find(Icon).prop('color')).toEqual(
      Colors.secondaryColor.foreground,
    );

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      backgroundColor: Colors.secondaryColor.background,
    });
  });
});
