import React from 'react';
import {PopUp} from '@axelor/aos-mobile-ui';
import {View, Modal} from 'react-native';
import {shallow} from 'enzyme';

describe('PopUp Component', () => {
  const children = <View testID="popup-children" />;

  const props = {
    title: 'Test Title',
    data: 'Test Data',
    visible: true,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    expect(wrapper.exists()).toBe(true);
  });

  it('should not render when `visible` prop is false', () => {
    const neutralProps = {
      ...props,
      visible: false,
    };
    const wrapper = shallow(<PopUp {...neutralProps}>{children}</PopUp>);

    expect(wrapper.find(Modal).prop('visible')).toBe(false);
  });

  it('should display the title when provided', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    const titleTextComponent = wrapper.find('Text').at(0);

    console.log(titleTextComponent);

    expect(titleTextComponent.contains(props.title)).toBe(true);
  });

  it('should display the data when provided', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    const dataTextComponent = wrapper.find('Text').at(1);

    console.log(dataTextComponent);

    expect(dataTextComponent.contains(props.data)).toBe(true);
  });

  it('should render children elements', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    expect(wrapper.find({testID: 'popup-children'}).exists()).toBe(true);
  });
});
