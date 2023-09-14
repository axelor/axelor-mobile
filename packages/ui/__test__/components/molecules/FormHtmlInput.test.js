import React from 'react';
import {shallow} from 'enzyme';
import {FormHtmlInput} from '../../../lib/components/molecules';

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

describe('FormHtmlInput Component', () => {
  it('should render without crashing', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <FormHtmlInput
        title="Input Title"
        placeholder="Enter text"
        onChange={onChangeMock}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with initial props', () => {
    const title = 'Input Title';
    const placeholder = 'Enter text';
    const defaultValue = 'Initial Value';
    const wrapper = shallow(
      <FormHtmlInput
        title={title}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />,
    );

    expect(wrapper.find('Text').prop('children')).toBe(title);
    expect(wrapper.find('HtmlInput').prop('defaultInput')).toBe(defaultValue);
  });

  it('updates input value on change', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <FormHtmlInput title="Input Title" onChange={onChangeMock} />,
    );

    const newValue = 'New Value';
    wrapper.find('HtmlInput').simulate('change', newValue);

    expect(wrapper.find('HtmlInput').prop('defaultInput')).toBe(newValue);
    expect(onChangeMock).toHaveBeenCalledWith(newValue);
  });

  it('handles focus and blur', () => {
    const wrapper = shallow(<FormHtmlInput title="Input Title" />);

    wrapper.find('HtmlInput').simulate('focus');
    const htmlInputWrapper = wrapper.find('View').at(1).props().style;
    expect(htmlInputWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.primaryColor.background,
        }),
      ]),
    );

    wrapper.find('HtmlInput').simulate('blur');
    expect(htmlInputWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.secondaryColor.background,
        }),
      ]),
    );
  });

  it('applies required styling when field is required and empty', () => {
    const wrapper = shallow(
      <FormHtmlInput title="Input Title" required={true} />,
    );

    const htmlInputWrapper = wrapper.find('View').at(1).props().style;
    expect(htmlInputWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.errorColor.background,
        }),
      ]),
    );
  });
});
