import React from 'react';
import {shallow} from 'enzyme';
import {Icon} from '../../../lib/components/atoms';
import {CircleButton} from '../../../lib/components/molecules';
import {TouchableOpacity} from 'react-native';

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

describe('CircleButton Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <CircleButton selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly when not disabled', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <CircleButton iconName="test-icon" onPress={onPressMock} />,
    );

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Icon)).toHaveLength(1);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBe(false);

    expect(wrapper.find(Icon).prop('name')).toBe('test-icon');
    expect(wrapper.find(Icon).prop('color')).toBe(
      Colors.primaryColor.foreground,
    );

    expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.primaryColor.background,
          borderRadius: 50,
          width: 50,
          height: 50,
        }),
      ]),
    );
  });

  it('renders correctly when disabled', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <CircleButton iconName="check" onPress={onPressMock} disabled={true} />,
    );

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
    expect(wrapper.find('Icon').prop('color')).toEqual(
      Colors.secondaryColor.foreground,
    );
  });
});
