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
import {render, fireEvent} from '@testing-library/react-native';
import {Input} from '@axelor/aos-mobile-ui';

describe('Input component', () => {
  const baseProps = {
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
    isFocus: false,
    writingType: 'title',
  };

  const setup = (override = {}) => {
    const props = {...baseProps, ...override};
    const utils = render(<Input {...props} />);
    const input = utils.getByPlaceholderText(props.placeholder);
    return {input, props, ...utils};
  };

  it('renders without crashing', () => {
    const {input} = setup();
    expect(input).toBeTruthy();
  });

  it('renders the TextInput with correct props', () => {
    const {input} = setup();
    expect(input.props.value).toBe('Hello');
    expect(input.props.placeholder).toBe('Enter text');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('calls onChange handler with new value', () => {
    const {input, props} = setup();
    fireEvent.changeText(input, 'New value');
    expect(props.onChange).toHaveBeenCalledWith('New value');
  });

  it('calls onSelection handler on focus', () => {
    const {input, props} = setup();
    fireEvent(input, 'focus');
    expect(props.onSelection).toHaveBeenCalled();
  });

  it('calls onEndFocus handler on blur', () => {
    const {input, props} = setup();
    fireEvent(input, 'blur');
    expect(props.onEndFocus).toHaveBeenCalled();
  });
});
