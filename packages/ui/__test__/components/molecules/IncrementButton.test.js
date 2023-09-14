import React from 'react';
import {shallow} from 'enzyme';
import {IncrementButton} from '../../../lib/components/molecules';

// NOTE: IncrementButton is not imported.
describe('IncrementButton Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <IncrementButton iconName="plus" onPress={() => {}} />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
