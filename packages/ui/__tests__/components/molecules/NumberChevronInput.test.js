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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {Icon, Input, NumberChevronInput} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

export const INPUT_CHANGE_TYPE = {
  button: 0,
  keyboard: 1,
  limit: 2,
};

describe('NumberChevronInput Component', () => {
  const props = {
    defaultValue: 5,
    minValue: 0,
    maxValue: 9,
    onValueChange: jest.fn(),
    onEndFocus: jest.fn(),
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<NumberChevronInput {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('increments and decrements value correctly', () => {
    const _onValueChangeMock = jest.fn();

    const _props = {
      ...props,
      onValueChange: _onValueChangeMock,
    };

    const wrapper = shallow(<NumberChevronInput {..._props} />);
    const increaseButton = wrapper
      .find('ChevronButton')
      .at(0)
      .dive()
      .find(Icon);
    const decreaseButton = wrapper
      .find('ChevronButton')
      .at(1)
      .dive()
      .find(Icon);

    increaseButton.simulate('press');
    expect(_onValueChangeMock).toHaveBeenCalledWith(
      6,
      INPUT_CHANGE_TYPE.button,
    );

    decreaseButton.simulate('press');
    expect(_onValueChangeMock).toHaveBeenCalledWith(
      5,
      INPUT_CHANGE_TYPE.button,
    );
  });

  it('does not allow value to exceed max limits', () => {
    const _props = {
      ...props,
      defaultValue: 9,
    };

    const wrapper = shallow(<NumberChevronInput {..._props} />);
    const increaseButton = wrapper
      .find('ChevronButton')
      .at(0)
      .dive()
      .find(Icon);

    expect(increaseButton.prop('touchable')).toBe(false);
  });

  it('does not allow value to exceed min limits', () => {
    const _props = {
      ...props,
      defaultValue: 0,
    };

    const wrapper = shallow(<NumberChevronInput {..._props} />);
    const decreaseButton = wrapper
      .find('ChevronButton')
      .at(1)
      .dive()
      .find(Icon);

    expect(decreaseButton.prop('touchable')).toBe(false);
  });

  it('value is correctly re-set when value is out of bound', () => {
    const _onValueChangeMock = jest.fn();

    const wrapper = shallow(
      <NumberChevronInput
        {...props}
        maxValue={5}
        onValueChange={_onValueChangeMock}
      />,
    );

    wrapper.find(Input).simulate('change', '8');
    expect(_onValueChangeMock).toHaveBeenCalledWith(5, INPUT_CHANGE_TYPE.limit);
  });

  it('handles text input changes correctly', () => {
    const _onValueChangeMock = jest.fn();

    const _props = {
      ...props,
      onValueChange: _onValueChangeMock,
    };
    const wrapper = shallow(<NumberChevronInput {..._props} />);

    wrapper.find('Input').simulate('change', '7');
    expect(_onValueChangeMock).toHaveBeenCalledWith(
      7,
      INPUT_CHANGE_TYPE.keyboard,
    );

    wrapper.find('Input').simulate('change', 'invalid');
    expect(_onValueChangeMock).not.toHaveBeenCalledWith(
      NaN,
      INPUT_CHANGE_TYPE.keyboard,
    );
  });

  it('applies custom style when provided', () => {
    const customStyle = {height: 200};
    const wrapper = shallow(
      <NumberChevronInput {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      customStyle,
    );
  });
});
