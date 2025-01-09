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
import {RadioButton, lightTheme} from '@axelor/aos-mobile-ui';

describe('RadioButton Component', () => {
  const Colors = lightTheme.colors;
  const onPressMock = jest.fn();

  it('should render without crashing', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} selected={false} title="Option 1" />,
    );

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the correct title', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} selected={false} title="Option 2" />,
    );

    expect(wrapper.find('Text').prop('children')).toBe('Option 2');
  });

  it('should call onPress when TouchableOpacity is pressed', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} selected={false} title="Option 3" />,
    );

    wrapper.find(TouchableOpacity).simulate('press');
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should apply selected styles when selected is true', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} title="Option 4" selected />,
    );

    const selectedView = wrapper.find(View).at(1);

    expect(selectedView.prop('style')).toHaveProperty(
      'backgroundColor',
      Colors.primaryColor.background,
    );
  });
});
