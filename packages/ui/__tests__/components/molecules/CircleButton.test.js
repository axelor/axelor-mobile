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
import {Button, CircleButton} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('CircleButton Component', () => {
  const Colors = getDefaultThemeColors();
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
    const wrapper = shallow(
      <CircleButton {...props} square={false} disabled={false} />,
    );

    const button = wrapper.find(Button);
    expect(button).toHaveLength(1);
    expect(button.prop('iconName')).toBe(props.iconName);
    expect(button.prop('disabled')).toBe(false);
    expect(getGlobalStyles(button)).toMatchObject({
      borderRadius: props.size,
      width: props.size,
      height: props.size,
    });
  });

  it('renders correctly when disabled', () => {
    const wrapper = shallow(<CircleButton {...props} disabled={true} />);

    const button = wrapper.find(Button);
    expect(button).toHaveLength(1);
    expect(button.prop('iconName')).toBe(props.iconName);
    expect(button.prop('disabled')).toBe(true);
  });

  it('renders correctly when square configuration is active', () => {
    const wrapper = shallow(<CircleButton {...props} />);

    const button = wrapper.find(Button);
    expect(button).toHaveLength(1);
    expect(button.prop('iconName')).toBe(props.iconName);
    expect(getGlobalStyles(button)).toMatchObject({
      borderRadius: 7,
      width: props.size,
      height: props.size,
    });
  });

  it('renders correctly with the correct color when provided', () => {
    const _color = Colors.infoColor;
    const wrapper = shallow(<CircleButton {...props} color={_color} />);

    const button = wrapper.find(Button);
    expect(button).toHaveLength(1);
    expect(button.prop('color')).toBe(_color);
  });
});
