import React from 'react';
import {shallow} from 'enzyme';
import {FormIncrementInput} from '../../../lib/components/molecules';

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

describe('FormIncrementInput Component', () => {
  it('should render without crashing', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <FormIncrementInput title="Input Title" onChange={onChangeMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with initial props', () => {
    const title = 'Input Title';
    const defaultValue = 10;
    const wrapper = shallow(
      <FormIncrementInput title={title} defaultValue={defaultValue} />,
    );

    // Check if title and default value are rendered correctly
    expect(wrapper.find('Text').prop('children')).toBe(title);
    expect(wrapper.find('Increment').prop('value')).toBe(defaultValue);
  });

  it('updates input value on change', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <FormIncrementInput title="Input Title" onChange={onChangeMock} />,
    );

    const newValue = 15;
    wrapper.find('Increment').simulate('change', newValue);

    // Check if the input value is updated and onChange prop is called
    expect(wrapper.find('Increment').prop('value')).toBe(newValue);
    expect(onChangeMock).toHaveBeenCalledWith(newValue);
  });

  it('handles focus and blur', () => {
    const wrapper = shallow(<FormIncrementInput title="Input Title" />);

    wrapper.find('Increment').simulate('focus');
    const incrementWrapper = wrapper.find('View').at(1).props().style;
    expect(incrementWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.primaryColor.background,
        }),
      ]),
    );

    wrapper.find('Increment').simulate('blur');
    expect(incrementWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.secondaryColor.background,
        }),
      ]),
    );
  });

  it('applies required styling when field is required and no default value', () => {
    const wrapper = shallow(
      <FormIncrementInput title="Input Title" required={true} />,
    );

    // Check if required styling is applied
    const incrementWrapper = wrapper.find('View').at(1).props().style;
    expect(incrementWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.errorColor.background,
        }),
      ]),
    );
  });
});
