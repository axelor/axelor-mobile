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
import {TextInput} from 'react-native';
import {shallow} from 'enzyme';
import {Input} from '@axelor/aos-mobile-ui';

describe('Input component', () => {
  const props = {
    value: 'Hello',
    onChange: jest.fn(),
    placeholder: 'Enter text',
    secureTextEntry: true,
    readOnly: false,
    onSelection: jest.fn(),
    multiline: true,
    numberOfLines: 3,
    keyboardType: 'default',
    onEndFocus: jest.fn(),
    isFocus: true,
    writingType: 'title',
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the TextInput component with the correct props', () => {
    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    expect(textInput.prop('value')).toEqual('Hello');

    expect(textInput.prop('placeholder')).toEqual('Enter text');
  });

  it('should call onChange handler with new value when text is changed', () => {
    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    const newValue = 'New value';

    textInput.simulate('changeText', newValue);

    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('should call onSelection handler when TextInput is focused', () => {
    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    textInput.simulate('focus');

    expect(props.onSelection).toHaveBeenCalled();
  });

  it('should call onEndFocus handler when TextInput is blurred', () => {
    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    textInput.simulate('blur');

    expect(props.onEndFocus).toHaveBeenCalled();
  });
});
