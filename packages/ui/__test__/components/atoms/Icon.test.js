import React from 'react';
import {shallow} from 'enzyme';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {Icon} from '../../../lib/components/atoms';

describe('Icon Component', () => {
  it('renders correctly', () => {
    shallow(<Icon name="star" />);
  });

  it('renders FontAwesome5 icon when FontAwesome5 prop is true', () => {
    const wrapper = shallow(<Icon name="star" FontAwesome5 />);
    const iconComponent = wrapper.find(Icon5);

    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.prop('name')).toBe('star');
  });

  it('renders FontAwesome icon when FontAwesome5 prop is false', () => {
    const wrapper = shallow(<Icon name="star" FontAwesome5={false} />);
    const iconComponent = wrapper.find(Icon4);

    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.prop('name')).toBe('star');
  });

  it('applies custom style to the component', () => {
    const customStyle = {backgroundColor: 'red'};
    const wrapper = shallow(<Icon name="star" style={customStyle} />);
    const viewComponent = wrapper.find('View');

    expect(viewComponent.prop('style')).toContain(customStyle);
  });

  it('invokes onPress callback when icon is pressed', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(<Icon name="star" onPress={onPressMock} />);
    const touchableComponent = wrapper.find('TouchableOpacity');

    touchableComponent.simulate('press');
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders nothing when visible prop is false', () => {
    const wrapper = shallow(<Icon visible={false} />);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('renders a touchable icon and calls onPress when clicked', () => {
    const props = {
      name: 'check',
      FontAwesome5: true,
      color: 'red',
      size: 24,
      touchable: true,
      visible: true,
      onPress: jest.fn(),
      disabled: false,
    };

    const wrapper = shallow(<Icon {...props} />);

    expect(wrapper.find('TouchableOpacity').exists()).toBeTruthy();

    wrapper.find('TouchableOpacity').simulate('press');

    expect(props.onPress).toHaveBeenCalled();
  });

  it('renders a disabled icon and does not call onPress when clicked', () => {
    const props = {
      name: 'check',
      FontAwesome5: true,
      color: 'red',
      size: 24,
      touchable: true,
      visible: true,
      onPress: jest.fn(),
      disabled: true,
    };

    const wrapper = shallow(<Icon {...props} />);

    expect(
      wrapper.find('TouchableOpacity[disabled=true]').exists(),
    ).toBeTruthy();

    wrapper.find('TouchableOpacity').simulate('press');

    expect(props.onPress).not.toHaveBeenCalled();
  });
});
