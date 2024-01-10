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
  const defaultValue = 5;
  const minValue = 0;
  const maxValue = 9;
  const onValueChangeMock = jest.fn();
  const onEndFocusMock = jest.fn();
  const props = {
    defaultValue,
    minValue,
    maxValue,
    onValueChange: onValueChangeMock,
    onEndFocus: onEndFocusMock,
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
    const _onValueChangeMock = jest.fn();

    const _props = {
      ...props,
      defaultValue: 9,
      onValueChange: _onValueChangeMock,
    };

    const wrapper = shallow(<NumberChevronInput {..._props} />);
    const increaseButton = wrapper.find(TouchableOpacity).at(0);

    expect(increaseButton.prop('disabled')).toBe(true);
  });

  it('does not allow value to exceed min limits', () => {
    const _onValueChangeMock = jest.fn();

    const _props = {
      ...props,
      defaultValue: 0,
      onValueChange: _onValueChangeMock,
    };

    const wrapper = shallow(<NumberChevronInput {..._props} />);
    const decreaseButton = wrapper.find(TouchableOpacity).at(1);

    expect(decreaseButton.prop('disabled')).toBe(true);
  });

  it('handles text input changes correctly', () => {
    const wrapper = shallow(<NumberChevronInput {...props} />);

    wrapper.find('Input').simulate('change', '7');
    expect(onValueChangeMock).toHaveBeenCalledWith(
      7,
      INPUT_CHANGE_TYPE.keyboard,
    );

    wrapper.find('Input').simulate('change', 'invalid');
    expect(onValueChangeMock).not.toHaveBeenCalledWith(
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
