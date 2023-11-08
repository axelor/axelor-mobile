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
    const onSwitchProps = {
      ...props,
      onSwitch: jest.fn(),
    };
    const wrapper = shallow(<ToggleSwitch {...onSwitchProps} />);
    const leftButton = wrapper.find(TouchableOpacity).at(0);
    leftButton.simulate('press');
    expect(onSwitchProps.onSwitch).toHaveBeenCalledTimes(1);
  });

  it('calls onSwitch when right side is pressed', () => {
    const onSwitchProps = {
      ...props,
      onSwitch: jest.fn(),
    };
    const wrapper = shallow(<ToggleSwitch {...onSwitchProps} />);
    const rightButton = wrapper.find(TouchableOpacity).at(1);
    rightButton.simulate('press');
    expect(onSwitchProps.onSwitch).toHaveBeenCalledTimes(1);
  });

  it('changes active style on press', () => {
    const onSwitchProps = {
      ...props,
      onSwitch: jest.fn(),
    };
    const wrapper = shallow(<ToggleSwitch {...onSwitchProps} />);

    expect(getGlobalStyles(wrapper.find(TouchableOpacity).at(0))).toMatchObject(
      {
        backgroundColor: Colors.primaryColor.background_light,
      },
    );

    expect(
      getGlobalStyles(wrapper.find(TouchableOpacity).at(1)),
    ).not.toMatchObject({
      backgroundColor: Colors.primaryColor.background_light,
    });

    wrapper.find(TouchableOpacity).at(1).simulate('press');

    expect(getGlobalStyles(wrapper.find(TouchableOpacity).at(1))).toMatchObject(
      {
        backgroundColor: Colors.primaryColor.background_light,
      },
    );

    expect(
      getGlobalStyles(wrapper.find(TouchableOpacity).at(0)),
    ).not.toMatchObject({
      backgroundColor: Colors.primaryColor.background_light,
    });
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <ToggleSwitch {...props} styleContainer={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });
});
