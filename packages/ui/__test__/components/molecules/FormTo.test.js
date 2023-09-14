import React from 'react';
import {shallow} from 'enzyme';
import {Text} from '../../../lib/components/atoms';
import {FromTo} from '../../../lib/components/molecules';

describe('FromTo Component', () => {
  it('should render without crashing', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(<FromTo onChange={onChangeMock} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the fromComponent, arrow icon, and toComponent', () => {
    const fromComponent = <Text>From</Text>;
    const toComponent = <Text>To</Text>;
    const wrapper = shallow(
      <FromTo fromComponent={fromComponent} toComponent={toComponent} />,
    );

    // Check if fromComponent and toComponent are rendered
    expect(wrapper.contains(fromComponent)).toBe(true);
    expect(wrapper.contains(toComponent)).toBe(true);

    // Check if the arrow icon is rendered
    expect(wrapper.find('Icon').exists()).toBe(true);
  });

  it('applies custom style when provided', () => {
    const fromComponent = <Text>From</Text>;
    const toComponent = <Text>To</Text>;
    const customStyle = {backgroundColor: 'red'};
    const wrapper = shallow(
      <FromTo
        fromComponent={fromComponent}
        toComponent={toComponent}
        style={customStyle}
      />,
    );

    // Check if the custom style is applied
    expect(wrapper.prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
