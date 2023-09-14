import React from 'react';
import {shallow} from 'enzyme';
import {DropdownMenu} from '../../../lib/components/molecules';
import {Text} from '../../../lib/components/atoms';

describe('DropdownMenu Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <DropdownMenu selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children when visible is true', () => {
    const wrapper = shallow(
      <DropdownMenu>
        <Text>Menu Content</Text>
      </DropdownMenu>,
    );

    wrapper.find('TouchableOpacity').props().onPress();
    wrapper.update();

    expect(wrapper.find('Card').exists()).toBe(true);
    expect(wrapper.find('Text').prop('children')).toBe('Menu Content');
  });

  it('toggles visibility when action button is pressed', () => {
    const wrapper = shallow(
      <DropdownMenu>
        <Text>Menu Content</Text>
      </DropdownMenu>,
    );

    const actionButton = wrapper.find('TouchableOpacity');

    // Before pressing, the card should not be rendered
    expect(wrapper.find('Card').exists()).toBe(false);

    actionButton.props().onPress();
    wrapper.update();

    // Now, the card should be rendered
    expect(wrapper.find('Card').exists()).toBe(true);

    actionButton.props().onPress();
    wrapper.update();

    // Now, the card should not be rendered again
    expect(wrapper.find('Card').exists()).toBe(false);
  });

  it('closes menu when clicked outside', () => {
    const wrapper = shallow(
      <DropdownMenu>
        <Text>Menu Content</Text>
      </DropdownMenu>,
    );

    wrapper.find('TouchableOpacity').props().onPress();
    wrapper.update();

    wrapper.instance().handleClickOutside();

    expect(wrapper.find('Card').exists()).toBe(false);
  });
});
