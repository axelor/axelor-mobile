import React from 'react';
import {shallow} from 'enzyme';
import {SwitchCard, Text} from '@axelor/aos-mobile-ui';

describe('SwitchCard', () => {
  it('should render without crashing', () => {
    const title = 'Test Switch';
    const wrapper = shallow(
      <SwitchCard title={title} defaultValue={false} onToggle={() => {}} />,
    );

    expect(wrapper.exists()).toBe(true);
  });
  it('renders with the correct title', () => {
    const title = 'Test Switch';
    const wrapper = shallow(
      <SwitchCard title={title} defaultValue={false} onToggle={() => {}} />,
    );

    expect(wrapper.find(Text).prop('children')).toBe(title);
  });

  it('passes the default value to the Switch component', () => {
    const defaultValue = true;
    const wrapper = shallow(
      <SwitchCard
        title="Test"
        defaultValue={defaultValue}
        onToggle={() => {}}
      />,
    );

    expect(wrapper.find('Switch').prop('isEnabled')).toBe(defaultValue);
  });

  it('calls onToggle when the switch is toggled', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <SwitchCard title="Test" defaultValue={true} onToggle={onPress} />,
    );

    wrapper.find('Switch').prop('handleToggle')();

    //wrapper.find(Switch).simulate('press');
    expect(onPress).toHaveBeenCalled();
  });
});
