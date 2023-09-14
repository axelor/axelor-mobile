import React from 'react';
import {shallow} from 'enzyme';
import {CardIconButton} from '../../../lib/components/molecules';
import {TouchableOpacity} from 'react-native';

const Colors = {
  backgroundColor: 'white',
};

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => Colors,
}));

describe('CardIconButton Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <CardIconButton iconName="heart" iconColor="red" onPress={() => {}} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should call onPress when button is clicked', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <CardIconButton iconName="heart" iconColor="red" onPress={onPressMock} />,
    );

    wrapper.find(TouchableOpacity).simulate('press');

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should have correct styles based on prop Colors', () => {
    const wrapper = shallow(
      <CardIconButton iconName="heart" iconColor="red" onPress={() => {}} />,
    );

    expect(wrapper.prop('style').at(0)).toEqual(
      expect.objectContaining({
        backgroundColor: Colors.backgroundColor,
      }),
    );
  });
});
