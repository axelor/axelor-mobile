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
import {Button, ToggleButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors} from '../../tools';

describe('ToggleButton Component', () => {
  const Colors = getDefaultThemeColors();

  const props = {
    activeColor: Colors.errorColor,
    inactiveColor: Colors.warningColor,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<ToggleButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should give the props of buttonConfig to Button component', () => {
    const buttonConfig = {
      title: 'TEST',
      iconName: 'car',
    };
    const wrapper = shallow(
      <ToggleButton {...props} buttonConfig={buttonConfig} />,
    );

    Object.entries(buttonConfig).forEach(([key, value]) =>
      expect(wrapper.find(Button).prop(key)).toBe(value),
    );
  });

  it('should render a Button whose color changes if pressed', () => {
    const onPress = jest.fn();
    const wrapper = shallow(<ToggleButton {...props} onPress={onPress} />);

    expect(wrapper.find(Button).prop('isNeutralBackground')).toBe(true);
    expect(wrapper.find(Button).prop('color')).toBe(props.inactiveColor);

    wrapper.simulate('press');
    expect(onPress).toHaveBeenCalledWith(true);

    expect(wrapper.find(Button).prop('isNeutralBackground')).toBe(false);
    expect(wrapper.find(Button).prop('color')).toBe(props.activeColor);

    wrapper.simulate('press');
    expect(onPress).toHaveBeenCalledWith(false);

    expect(wrapper.find(Button).prop('isNeutralBackground')).toBe(true);
    expect(wrapper.find(Button).prop('color')).toBe(props.inactiveColor);
  });

  it('should render a Button with isNeutralBackground props set to false if provided', () => {
    const wrapper = shallow(
      <ToggleButton {...props} isNeutralBackground={false} />,
    );

    expect(wrapper.find(Button).prop('isNeutralBackground')).toBe(false);
  });

  it('should render a Button with default color set to activeColor if isActive is true', () => {
    const wrapper = shallow(<ToggleButton {...props} isActive />);

    expect(wrapper.find(Button).prop('color')).toBe(props.activeColor);
  });
});
