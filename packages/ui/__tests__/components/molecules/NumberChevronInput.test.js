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
import {NumberChevronInput} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

export const INPUT_CHANGE_TYPE = {
  button: 0,
  keyboard: 1,
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
    const increaseButton = wrapper.find(TouchableOpacity).at(0);
    const decreaseButton = wrapper.find(TouchableOpacity).at(1);

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
    const increaseButton = wrapper.find(TouchableOpacity).at(0);

    expect(increaseButton.prop('disabled')).toBe(true);
  });

  it('does not allow value to exceed min limits', () => {
    const _props = {
      ...props,
      defaultValue: 0,
    };

    const wrapper = shallow(<NumberChevronInput {..._props} />);
    const decreaseButton = wrapper.find(TouchableOpacity).at(1);

    expect(decreaseButton.prop('disabled')).toBe(true);
  });

  it('value is correctly re-set when value is out of bound', () => {
    const _onValueChangeMock = jest.fn();

    const _props = {
      ...props,
      maxValue: 5,
      onValueChange: _onValueChangeMock,
    };

    const wrapper = shallow(<NumberChevronInput {..._props} />);

    wrapper.find('Input').simulate('change', '10');
    expect(_onValueChangeMock).toHaveBeenCalledWith(
      0,
      INPUT_CHANGE_TYPE.keyboard,
    );

    wrapper.find('Input').simulate('change', '45');
    expect(_onValueChangeMock).toHaveBeenCalledWith(
      5,
      INPUT_CHANGE_TYPE.keyboard,
    );

    wrapper.find('Input').simulate('change', '8');
    expect(_onValueChangeMock).toHaveBeenCalledWith(
      5,
      INPUT_CHANGE_TYPE.keyboard,
    );
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
