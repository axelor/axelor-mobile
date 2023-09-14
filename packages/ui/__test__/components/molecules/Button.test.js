import React from 'react';
import {TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {Button} from '../../../lib/components/molecules';

const Colors = {
  primaryColor: {
    background: 'blue',
    foreground: 'white',
  },
  secondaryColor: {
    background: 'green',
    foreground: 'gray',
  },
};

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => Colors,
}));

describe('Button Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with default props', () => {
    const title = 'Click Me';
    const wrapper = shallow(<Button title={title} />);

    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);

    expect(wrapper.find('Text').prop('children')).toBe(title);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeFalsy();
  });

  it('renders with custom style and onPress function', () => {
    const title = 'Submit';
    const onPressMock = jest.fn();
    const style = {margin: 10};
    const wrapper = shallow(
      <Button title={title} style={style} onPress={onPressMock} />,
    );

    expect(wrapper.find(TouchableOpacity).prop('style').at(0)).toEqual(
      expect.objectContaining({
        backgroundColor: Colors.primaryColor.background,
      }),
    );
    expect(wrapper.find(TouchableOpacity).prop('style').at(2)).toEqual(
      expect.objectContaining({
        margin: 10,
      }),
    );

    wrapper.find(TouchableOpacity).simulate('press');
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders with disabled state', () => {
    const title = 'Disabled Button';
    const wrapper = shallow(<Button title={title} disabled={true} />);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeTruthy();
  });
});
