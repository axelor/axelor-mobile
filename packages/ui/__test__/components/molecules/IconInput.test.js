import React from 'react';
import {shallow} from 'enzyme';
import {Icon} from '../../../lib/components/atoms';
import {IconInput} from '../../../lib/components/molecules';

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

describe('IconInput Component', () => {
  const onChangeMock = jest.fn();
  it('should render without crashing', () => {
    const wrapper = shallow(
      <IconInput
        placeholder="Enter text"
        value="Initial value"
        onChange={onChangeMock}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('check if the input value is rendered', () => {
    const value = 'Input Value';
    const wrapper = shallow(
      <IconInput value={value} onChange={() => {}} placeholder="Placeholder" />,
    );

    expect(wrapper.find('Input').prop('value')).toBe(value);
  });

  it('renders input value and left/right icons', () => {
    const leftIconsList = [<Icon name="leftIcon" />, <Icon name="leftIcon2" />];
    const rightIconsList = [<Icon name="rightIcon" />];
    const wrapper = shallow(
      <IconInput
        value="Input Value"
        onChange={() => {}}
        placeholder="Placeholder"
        leftIconsList={leftIconsList}
        rightIconsList={rightIconsList}
      />,
    );

    // Check if the left icons are rendered
    leftIconsList.forEach((iconComponent, index) => {
      expect(
        wrapper.findWhere(
          node => node.equals(iconComponent) && node.key() === index.toString(),
        ),
      ).toHaveLength(1);
    });

    // Check if the right icons are rendered
    rightIconsList.forEach((iconComponent, index) => {
      expect(
        wrapper.findWhere(
          node => node.equals(iconComponent) && node.key() === index.toString(),
        ),
      ).toHaveLength(1);
    });
  });

  it('applies focused style when focused', () => {
    const wrapper = shallow(
      <IconInput
        value="Input Value"
        onChange={() => {}}
        placeholder="Placeholder"
      />,
    );

    // Simulate focusing the input (NOTE: isFocused state didn't change)
    wrapper.find('Input').simulate('focus');

    // Check if the focused style is applied
    const inputWrapper = wrapper.find('View').prop('style');
    expect(inputWrapper).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: Colors.primaryColor.background,
        }),
      ]),
    );
  });

  it('calls onChange when input value changes', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <IconInput
        value="Input Value"
        onChange={onChangeMock}
        placeholder="Placeholder"
      />,
    );

    // Simulate changing the input value
    const newValue = 'New Value';
    wrapper.find('Input').simulate('change', newValue);

    expect(onChangeMock).toHaveBeenCalledWith(newValue);
  });
});
