import React from 'react';
import {shallow} from 'enzyme';
import {FormInput} from '../../../lib/components/molecules';

const Colors = {
  primaryColor: {
    background_light: 'gray',
    background: 'blue',
    foreground: 'white',
  },
  secondaryColor: {
    background_light: 'gray',
    background: 'green',
    foreground: 'gray',
  },
  errorColor: {
    background_light: 'red',
    background: 'red',
    foreground: 'red',
  },
};

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => Colors,
}));

jest.mock('../../../lib/utils/commons-styles', () => ({
  getCommonStyles: () => ({
    inputFocused: {
      borderColor: Colors.primaryColor.background,
    },
  }),
}));

describe('FormInput Component', () => {
  it('should render without crashing', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <FormInput title="Input Title" onChange={onChangeMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with initial props', () => {
    const title = 'Input Title';
    const defaultValue = 'Initial Value';
    const wrapper = shallow(
      <FormInput title={title} defaultValue={defaultValue} />,
    );

    // Check if title and default value are rendered correctly
    expect(wrapper.find('Text').prop('children')).toBe(title);
    expect(wrapper.find('Input').prop('value')).toBe(defaultValue);
  });

  it('updates input value on change', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <FormInput title="Input Title" onChange={onChangeMock} />,
    );

    const newValue = 'New Value';
    wrapper.find('Input').simulate('change', newValue);

    // Check if the input value is updated and onChange prop is called
    expect(wrapper.find('Input').prop('value')).toBe(newValue);
    expect(onChangeMock).toHaveBeenCalledWith(newValue);
  });

  it('handles selection and end focus', () => {
    const onSelectionMock = jest.fn();
    const onEndFocusMock = jest.fn();
    const wrapper = shallow(
      <FormInput
        title="Input Title"
        onSelection={onSelectionMock}
        onEndFocus={onEndFocusMock}
      />,
    );

    // Simulate selection
    wrapper.find('Input').simulate('selection');

    // Check if onSelection is called
    const inputWrapper = wrapper.find('View').at(1).props().style;
    expect(inputWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.primaryColor.background,
        }),
      ]),
    );
    expect(onSelectionMock).toHaveBeenCalled();

    // Simulate end focus
    wrapper.find('Input').simulate('endfocus');

    // Check if onEndFocus is called
    expect(inputWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.secondaryColor.background,
        }),
      ]),
    );
    expect(onEndFocusMock).toHaveBeenCalled();
  });

  it('applies required styling when field is required and no value', () => {
    const wrapper = shallow(<FormInput title="Input Title" required={true} />);

    // Check if required styling is applied
    const inputWrapper = wrapper.find('View').at(1).props().style;
    expect(inputWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.errorColor.background,
        }),
      ]),
    );
  });
});
