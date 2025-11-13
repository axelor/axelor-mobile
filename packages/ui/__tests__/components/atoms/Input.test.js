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

import {fireEvent} from '@testing-library/react-native';
import {Input} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Input component', () => {
  const setupInput = overrideProps => {
    const {props, ...utils} = setup({
      Component: Input,
      baseProps: {
        value: 'Hello',
        onChange: jest.fn(),
        placeholder: 'Enter text',
      },
      overrideProps,
    });
    return {
      ...utils,
      props,
      input: utils.getByPlaceholderText(props.placeholder),
    };
  };

  it('renders without crashing', () => {
    const {input} = setupInput();
    expect(input).toBeTruthy();
  });

  it('renders the TextInput with correct props', () => {
    const {input, props} = setupInput({
      keyboardType: 'default',
      multiline: true,
      numberOfLines: 3,
      secureTextEntry: true,
    });

    expect(input.props.value).toBe(props.value);
    expect(input.props.placeholder).toBe(props.placeholder);
    expect(input.props.keyboardType).toBe(props.keyboardType);
    expect(input.props.multiline).toBe(props.multiline);
    expect(input.props.numberOfLines).toBe(props.numberOfLines);
    expect(input.props.secureTextEntry).toBe(props.secureTextEntry);
  });

  it('renders a disabled component when `readonly` is true', () => {
    const {input, props} = setupInput({readOnly: true});

    expect(input.props.editable).toBe(!props.readOnly);
  });

  it('calls onChange handler with new value', () => {
    const {input, props} = setupInput({onChange: jest.fn()});
    const _newValue = 'New value';

    fireEvent.changeText(input, _newValue);
    expect(props.onChange).toHaveBeenCalledWith(_newValue);
  });

  it('calls onSelection handler on focus', () => {
    const {input, props} = setupInput({onSelection: jest.fn()});

    fireEvent(input, 'focus');
    expect(props.onSelection).toHaveBeenCalled();
  });

  it('calls onEndFocus handler on blur', () => {
    const {input, props} = setupInput({onEndFocus: jest.fn()});

    fireEvent(input, 'blur');
    expect(props.onEndFocus).toHaveBeenCalled();
  });

  it('calls onContentSizeChange handler on size change', () => {
    const {input, props} = setupInput({onContentSizeChange: jest.fn()});

    fireEvent(input, 'layout', {
      nativeEvent: {layout: {width: 50, height: 200}},
    });

    expect(props.onContentSizeChange).toHaveBeenCalledWith({
      nativeEvent: {contentSize: {width: 50, height: 200}},
    });
  });

  it('applies custom style when provided', () => {
    const {input, props} = setupInput({style: {color: 'red'}});

    expect(input).toHaveStyle(props.style);
  });
});
