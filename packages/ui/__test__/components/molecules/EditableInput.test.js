import React from 'react';
import {shallow} from 'enzyme';
import {EditableInput} from '../../../lib/components/molecules';

describe('EditableInput Component', () => {
  it('should render without crashing', () => {
    const onValidateMock = jest.fn();
    const wrapper = shallow(
      <EditableInput
        placeholder="Enter text"
        onValidate={onValidateMock}
        defaultValue="Initial value"
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles between editable and non-editable modes when the icon is pressed', () => {
    const onValidateMock = jest.fn();
    const defaultValue = 'Initial Value';
    const placeholder = 'Enter text';
    const wrapper = shallow(
      <EditableInput
        placeholder={placeholder}
        onValidate={onValidateMock}
        defaultValue={defaultValue}
      />,
    );

    expect(wrapper.find('Input').prop('readOnly')).toBe(true);
    expect(wrapper.find('Input').prop('value')).toBe(defaultValue);

    wrapper.find('TouchableOpacity').simulate('press');
    wrapper.update();

    expect(wrapper.find('Input').prop('readOnly')).toBe(false);
  });

  it('updates input value when changed and toggles back to non-editable', () => {
    const onValidateMock = jest.fn();
    const wrapper = shallow(
      <EditableInput
        placeholder="Enter text"
        onValidate={onValidateMock}
        defaultValue=""
      />,
    );

    wrapper.find('TouchableOpacity').simulate('press');
    wrapper.update();

    // Change the input value
    const newValue = 'New Value';
    wrapper.find('Input').simulate('change', newValue);
    expect(wrapper.find('Input').prop('value')).toBe(newValue);

    wrapper.find('TouchableOpacity').simulate('press');
    wrapper.update();

    // Input should be non-editable again
    expect(wrapper.find('Input').prop('readOnly')).toBe(true);

    // onValidate should be called with the changed value
    expect(onValidateMock).toHaveBeenCalledWith(newValue);
  });

  it('displays multiline input when multiline prop is true', () => {
    const wrapper = shallow(
      <EditableInput
        placeholder="Enter text"
        onValidate={() => {}}
        defaultValue=""
        multiline={true}
        numberOfLines={3}
      />,
    );

    // Ensure the multiline prop is passed down correctly
    expect(wrapper.find('Input').prop('multiline')).toBe(true);
    expect(wrapper.find('Input').prop('numberOfLines')).toBe(3);
  });
});
