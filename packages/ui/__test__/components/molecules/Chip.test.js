import React from 'react';
import {shallow} from 'enzyme';
import {Chip} from '../../../lib/components/molecules';

const Colors = {
  backgroundColor: 'white',
  text: 'black',
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

describe('Chip Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <Chip selected={true} title="Selected Chip" onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should render correctly when selected is true', () => {
    const onPressMock = jest.fn();
    const title = 'Selected Chip';
    const selectedColor = {
      background_light: 'selectedBackground',
      background: 'selectedBorderColor',
      foreground: 'selectedTextColor',
    };
    const wrapper = shallow(
      <Chip
        selected={true}
        title="Selected Chip"
        onPress={onPressMock}
        selectedColor={selectedColor}
      />,
    );

    expect(wrapper.find('View').prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: selectedColor.background_light,
          borderLeftWidth: 3,
          borderLeftColor: selectedColor.background,
          borderRightWidth: 3,
          borderRightColor: selectedColor.background,
        }),
      ]),
    );

    expect(wrapper.find('Text').prop('textColor')).toEqual(
      selectedColor.foreground,
    );
    expect(wrapper.find('Text').prop('fontSize')).toEqual(14);
    expect(wrapper.find('Text').prop('children')).toEqual(title);
  });

  it('should render correctly when selected is true and selectedColor is null', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <Chip
        selected={true}
        title="Selected Chip"
        onPress={onPressMock}
        selectedColor={null}
      />,
    );

    expect(wrapper.find('View').prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background_light,
          borderLeftWidth: 3,
          borderLeftColor: Colors.primaryColor.background,
          borderRightWidth: 3,
          borderRightColor: Colors.primaryColor.background,
        }),
      ]),
    );

    expect(wrapper.find('Text').prop('textColor')).toEqual(
      Colors.primaryColor.foreground,
    );
    expect(wrapper.find('Text').prop('fontSize')).toEqual(14);
    expect(wrapper.find('Text').prop('children')).toEqual('Selected Chip');
  });

  it('should render correctly when selected is false', () => {
    const onPressMock = jest.fn();
    const selectedColor = {
      background_light: 'selectedBackground',
      background: 'selectedBorderColor',
      foreground: 'selectedTextColor',
    };
    const wrapper = shallow(
      <Chip
        selected={false}
        title="Not Selected Chip"
        onPress={onPressMock}
        selectedColor={selectedColor}
      />,
    );

    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    expect(wrapper.find('View')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(1);

    expect(wrapper.find('View').prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.backgroundColor,
          borderLeftWidth: 3,
          borderLeftColor: selectedColor.background,
          borderRightWidth: 3,
          borderRightColor: selectedColor.background,
        }),
      ]),
    );

    expect(wrapper.find('Text').prop('textColor')).toEqual(Colors.text);
    expect(wrapper.find('Text').prop('fontSize')).toEqual(14);
    expect(wrapper.find('Text').prop('children')).toEqual('Not Selected Chip');
  });
});
