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
import {ToggleSwitch, lightTheme} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('ToggleSwitch Component', () => {
  const Colors = lightTheme.colors;

  const props = {
    leftTitle: 'Left',
    rightTitle: 'rightTitle',
    onSwitch: jest.fn(),
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<ToggleSwitch {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('calls onSwitch when left side is pressed', () => {
    const onSwitch = jest.fn();
    const wrapper = shallow(<ToggleSwitch {...props} onSwitch={onSwitch} />);

    wrapper.find(TouchableOpacity).at(0).simulate('press');
    expect(onSwitch).toHaveBeenCalledTimes(1);
  });

  it('calls onSwitch when right side is pressed', () => {
    const onSwitch = jest.fn();
    const wrapper = shallow(<ToggleSwitch {...props} onSwitch={onSwitch} />);

    wrapper.find(TouchableOpacity).at(1).simulate('press');
    expect(onSwitch).toHaveBeenCalledTimes(1);
  });

  it('changes active style on press', () => {
    const selectedColor = Colors.primaryColor.background_light;
    const onSwitch = jest.fn();
    const wrapper = shallow(<ToggleSwitch {...props} onSwitch={onSwitch} />);

    const getButton = side => {
      return wrapper.find(TouchableOpacity).at(side === 'left' ? 0 : 1);
    };

    expect(getGlobalStyles(getButton('left'))).toMatchObject({
      backgroundColor: selectedColor,
    });

    expect(getGlobalStyles(getButton('right'))).not.toMatchObject({
      backgroundColor: selectedColor,
    });

    getButton('right').simulate('press');

    expect(getGlobalStyles(getButton('left'))).not.toMatchObject({
      backgroundColor: selectedColor,
    });

    expect(getGlobalStyles(getButton('right'))).toMatchObject({
      backgroundColor: selectedColor,
    });
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const toggleStyle = {height: 50};

    const wrapper = shallow(
      <ToggleSwitch
        {...props}
        styleContainer={customStyle}
        styleToogle={toggleStyle}
      />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
    expect(getGlobalStyles(wrapper.find(TouchableOpacity).at(0))).toMatchObject(
      toggleStyle,
    );
    expect(getGlobalStyles(wrapper.find(TouchableOpacity).at(1))).toMatchObject(
      toggleStyle,
    );
  });
});
