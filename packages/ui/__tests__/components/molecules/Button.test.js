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
import {Button, lightTheme, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('Button Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    title: 'Cick here',
    onPress: jest.fn(),
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with default props', () => {
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeFalsy();
  });

  it('renders with custom style', () => {
    const style = {margin: 10};
    const wrapper = shallow(<Button {...props} style={style} />);

    expect(getGlobalStyles(wrapper.find(TouchableOpacity))).toMatchObject({
      backgroundColor: Colors.primaryColor.background,
      ...style,
    });
  });

  it('renders with disabled state', () => {
    const wrapper = shallow(<Button {...props} disabled={true} />);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
  });
});
