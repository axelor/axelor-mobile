import React from 'react';
import {shallow} from 'enzyme';
import {Increment} from '../../../lib/components/molecules';

describe('Increment Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Increment value="0" onValueChange={() => {}} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders input field with the initial value', () => {
    const initialValue = '5';
    const wrapper = shallow(
      <Increment value={initialValue} onValueChange={() => {}} />,
    );

    expect(wrapper.find('Input').prop('value')).toBe(initialValue);
  });

  it('increments value when plus button is clicked', () => {
    const initialValue = '5';
    const stepSize = 2;
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment
        value={initialValue}
        onValueChange={onValueChangeMock}
        stepSize={stepSize}
      />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    // Expect the value to be incremented by the step size
    expect(onValueChangeMock).toHaveBeenCalledWith(
      (parseFloat(initialValue) + stepSize).toString(),
    );
  });

  it('decrements value when minus button is clicked', () => {
    const initialValue = '5';
    const stepSize = 2;
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment
        value={initialValue}
        onValueChange={onValueChangeMock}
        stepSize={stepSize}
      />,
    );

    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');

    // Expect the value to be decremented by the step size
    expect(onValueChangeMock).toHaveBeenCalledWith(
      (parseFloat(initialValue) - stepSize).toString(),
    );
  });

  it('increments value using decimalSpacer ","', () => {
    const initialValue = '5,5';
    const stepSize = 0.5;
    const onValueChangeMock = jest.fn();
    const decimalSpacer = ',';
    const wrapper = shallow(
      <Increment
        value={initialValue}
        onValueChange={onValueChangeMock}
        stepSize={stepSize}
        decimalSpacer={decimalSpacer}
      />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    // Expect the value to be incremented by the step size
    const expectedValue = (
      parseFloat(initialValue.replace(',', '.')) + stepSize
    ).toString();
    expect(onValueChangeMock).toHaveBeenCalledWith(expectedValue);

    // Expect the input value to be formatted correctly
    expect(wrapper.find('Input').prop('value')).toBe(
      expectedValue.replace('.', decimalSpacer),
    );
  });

  it('increments value using thousandSpacer ","', () => {
    const initialValue = '5,000';
    const stepSize = 1000;
    const onValueChangeMock = jest.fn();
    const thousandSpacer = ',';
    const wrapper = shallow(
      <Increment
        value={initialValue}
        onValueChange={onValueChangeMock}
        stepSize={stepSize}
        thousandSpacer={thousandSpacer}
      />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    // Expect the value to be incremented by the step size
    const expectedValue = (
      parseFloat(initialValue.replace(',', '')) + stepSize
    ).toString();
    expect(onValueChangeMock).toHaveBeenCalledWith(expectedValue);

    // Expect the input value to be formatted correctly
    const formattedValue = expectedValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSpacer,
    );
    expect(wrapper.find('Input').prop('value')).toBe(formattedValue);
  });

  it('calls onFocus when we select increment input', () => {
    const onFocusMock = jest.fn();
    const wrapper = shallow(
      <Increment value="0" onValueChange={() => {}} onFocus={onFocusMock} />,
    );

    wrapper.find('Input').simulate('focus');
    expect(onFocusMock).toHaveBeenCalled();
  });

  it('does not increment value when the plus button is pressed and in readonly mode', () => {
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment value="0" onValueChange={onValueChangeMock} readonly />,
    );

    expect(wrapper.find('Input').prop('readOnly')).toBe(true);

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    // Value should remain the same
    expect(wrapper.find('Input').prop('value')).toBe('0');
  });

  it('increments value up to the max value when the plus button is pressed', () => {
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment value="9" onValueChange={onValueChangeMock} maxValue={10} />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    // Value should be incremented up to the max value
    expect(wrapper.find('Input').prop('value')).toBe('9');

    // Pressing the plus button again should not change the value
    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');
    expect(wrapper.find('Input').prop('value')).toBe('9');
  });

  it('does not increment value beyond the max value', () => {
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment value="10" onValueChange={onValueChangeMock} maxValue={10} />,
    );

    wrapper.find('IncrementButton[iconName="plus"]').simulate('press');

    // Value should not exceed the max value
    expect(wrapper.find('Input').prop('value')).toBe('10');
  });

  it('decrements value down to the min value when the minus button is pressed', () => {
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment value="5" onValueChange={onValueChangeMock} minValue={4} />,
    );

    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');

    expect(wrapper.find('Input').prop('value')).toBe('4');

    // Pressing the minus button again should not change the value
    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');
    expect(wrapper.find('Input').prop('value')).toBe('4');
  });

  it('does not decrement value below the min value', () => {
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment value="2" onValueChange={onValueChangeMock} minValue={2} />,
    );

    wrapper.find('IncrementButton[iconName="minus"]').simulate('press');

    // Value should not go below the min value
    expect(wrapper.find('Input').prop('value')).toBe('2');
  });

  it('formats the value with the specified scale', () => {
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment
        value="1.234567"
        onValueChange={onValueChangeMock}
        scale={2}
      />,
    );

    expect(wrapper.find('Input').prop('value')).toBe('1.23');
  });

  it('formats the value with the default scale if scale prop is not provided', () => {
    const onValueChangeMock = jest.fn();
    const wrapper = shallow(
      <Increment value="1.234567" onValueChange={onValueChangeMock} />,
    );

    // The value should be formatted to the default scale (which is 1)
    expect(wrapper.find('Input').prop('value')).toBe('1.2');
  });
});
