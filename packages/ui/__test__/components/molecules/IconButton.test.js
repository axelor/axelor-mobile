import React from 'react';
import {shallow} from 'enzyme';
import {IconButton} from '../../../lib/components/molecules';

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

describe('IconButton Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <IconButton title="Button Title" iconName="star" onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the provided icon, title, and applies default color', () => {
    const iconName = 'star';
    const title = 'Button Title';
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <IconButton iconName={iconName} title={title} onPress={onPressMock} />,
    );

    // Check if the provided icon is rendered
    expect(wrapper.find('Icon').prop('name')).toBe(iconName);

    // Check if the title is rendered
    expect(wrapper.find('Text').prop('children')).toBe(title);

    // Check if the default color is applied to the button background
    expect(wrapper.find('TouchableOpacity').prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background,
        }),
      ]),
    );
  });

  it('applies custom color when provided', () => {
    const customColor = Colors.secondaryColor;
    const wrapper = shallow(
      <IconButton
        iconName="star"
        title="Button Title"
        onPress={() => {}}
        color={customColor}
      />,
    );

    // Check if the custom color is applied to the button background
    expect(wrapper.find('TouchableOpacity').prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: customColor.background,
        }),
      ]),
    );

    // Check if the custom color is applied to the title
    expect(wrapper.find('Text').prop('style')).toEqual(
      expect.objectContaining({
        color: customColor.foreground,
      }),
    );
  });

  it('calls onPress when the button is pressed', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <IconButton iconName="star" title="Button Title" onPress={onPressMock} />,
    );

    // Simulate pressing the button
    wrapper.find('TouchableOpacity').simulate('press');

    // Check if the onPress function was called
    expect(onPressMock).toHaveBeenCalled();
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <IconButton
        iconName="star"
        title="Button Title"
        onPress={() => {}}
        style={customStyle}
      />,
    );

    // Check if the custom style is applied
    expect(wrapper.find('TouchableOpacity').prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
