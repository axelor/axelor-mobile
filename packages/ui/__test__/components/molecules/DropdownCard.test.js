import React from 'react';
import {shallow} from 'enzyme';
import {DropdownCard} from '../../../lib/components/molecules';

describe('DropdownCard Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <DropdownCard selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with title and chevron down icon', () => {
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" DropdownIsOpen={false}>
        Content goes here
      </DropdownCard>,
    );

    expect(wrapper.find('Text').prop('children')).toBe('Dropdown Title');
    expect(wrapper.find('Icon').prop('name')).toBe('chevron-down');
  });

  it('toggles the dropdown on touchable press', () => {
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" DropdownIsOpen={false}>
        Content goes here
      </DropdownCard>,
    );

    const touchable = wrapper.find('TouchableOpacity');
    touchable.simulate('press');

    expect(wrapper.find('Icon').prop('name')).toBe('chevron-up');

    touchable.simulate('press');

    expect(wrapper.find('Icon').prop('name')).toBe('chevron-down');
  });

  it('renders children content when DropdownIsOpen prop is true', () => {
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" DropdownIsOpen={true}>
        Content goes here
      </DropdownCard>,
    );

    expect(wrapper.find('Card')).toHaveLength(2);
  });

  it('calls onPress prop when touchable is pressed', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <DropdownCard title="Dropdown Title" onPress={onPressMock}>
        Content goes here
      </DropdownCard>,
    );

    const touchable = wrapper.find('TouchableOpacity');
    touchable.simulate('press');

    expect(onPressMock).toHaveBeenCalled();
  });
});
