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
import {Button, lightTheme, Text} from '@axelor/aos-mobile-ui';

describe('Button Component', () => {
  const Colors = lightTheme.colors;

  it('renders without crashing', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with default props', () => {
    const title = 'Click here';
    const wrapper = shallow(<Button title={title} />);

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);

    expect(wrapper.find(Text).prop('children')).toBe(title);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeFalsy();
  });

  it('renders with custom style and onPress function', () => {
    const title = 'Submit';
    const onPressMock = jest.fn();
    const style = {margin: 10};
    const wrapper = shallow(
      <Button title={title} style={style} onPress={onPressMock} />,
    );

    const buttonStyle = wrapper.find(TouchableOpacity).prop('style');

    expect(buttonStyle).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background,
        }),
        expect.objectContaining(style),
      ]),
    );

    wrapper.find(TouchableOpacity).simulate('press');
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders with disabled state', () => {
    const title = 'Disabled Button';
    const wrapper = shallow(<Button title={title} disabled={true} />);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
  });
});
