import React from 'react';
import {Switch as RNSwitch} from 'react-native';
import {shallow} from 'enzyme';
import {Switch} from '../../../lib/components/atoms';

describe('Switch Component', () => {
  it('renders without crashing', () => {
    const props = {
      isEnabled: true,
      handleToggle: jest.fn(),
    };
    const wrapper = shallow(<Switch {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the switch with the correct initial value', () => {
    const props = {
      isEnabled: true,
      handleToggle: jest.fn(),
    };
    const wrapper = shallow(<Switch {...props} />);
    expect(wrapper.prop('value')).toBe(true);
  });

  it('calls handleToggle function on switch toggle', () => {
    const handleToggle = jest.fn();
    const props = {
      isEnabled: true,
      handleToggle,
    };
    const wrapper = shallow(<Switch {...props} />);
    wrapper.find(RNSwitch).simulate('valueChange');
    expect(handleToggle).toHaveBeenCalledWith(false);
  });
});
