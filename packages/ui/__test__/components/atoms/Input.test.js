import React from 'react';
import {TextInput} from 'react-native';
import {shallow} from 'enzyme';
import {Input} from '../../../lib/components/atoms';

describe('Input component', () => {
  it('should render the TextInput component with the correct props', () => {
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

    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    expect(textInput.props()).toEqual({
      style: expect.any(Object),
      value: 'Hello',
      onChangeText: expect.any(Function),
      placeholder: 'Enter text',
      secureTextEntry: true,
      autoCapitalize: 'none',
      editable: true,
      onFocus: expect.any(Function),
      placeholderTextColor: expect.any(String),
      keyboardType: 'default',
      multiline: true,
      numberOfLines: 3,
      onBlur: expect.any(Function),
      showSoftInputOnFocus: true,
      autoFocus: true,
    });
  });

  it('should call onChange handler with new value when text is changed', () => {
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

    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    const newValue = 'New value';

    textInput.simulate('changeText', newValue);

    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });

  it('should call onSelection handler when TextInput is focused', () => {
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

    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    textInput.simulate('focus');

    expect(props.onSelection).toHaveBeenCalled();
  });

  it('should call onEndFocus handler when TextInput is blurred', () => {
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

    const wrapper = shallow(<Input {...props} />);

    const textInput = wrapper.find(TextInput);

    textInput.simulate('blur');

    expect(props.onEndFocus).toHaveBeenCalled();
  });
});
