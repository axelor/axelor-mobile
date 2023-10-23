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
import {CircleButton, Icon, lightTheme} from '@axelor/aos-mobile-ui';

describe('CircleButton Component', () => {
  const Colors = lightTheme.colors;
  const onPressMock = jest.fn();

  it('should render without crashing', () => {
    const wrapper = shallow(
      <CircleButton selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly when not disabled', () => {
    const wrapper = shallow(
      <CircleButton iconName="test-icon" onPress={onPressMock} />,
    );

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Icon)).toHaveLength(1);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(false);

    expect(wrapper.find(Icon).prop('name')).toBe('test-icon');
    expect(wrapper.find(Icon).prop('color')).toBe(
      Colors.primaryColor.foreground,
    );

    expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background,
          borderRadius: 50,
          width: 50,
          height: 50,
        }),
      ]),
    );
  });

  it('renders correctly when disabled', () => {
    const wrapper = shallow(
      <CircleButton iconName="check" onPress={onPressMock} disabled={true} />,
    );

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
    expect(wrapper.find('Icon').prop('color')).toEqual(
      Colors.secondaryColor.foreground,
    );
  });

  it('should not call onPress function when disabled', () => {
    const wrapper = shallow(
      <CircleButton iconName="check" onPress={onPressMock} disabled={true} />,
    );

    wrapper.simulate('press');

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });
});
