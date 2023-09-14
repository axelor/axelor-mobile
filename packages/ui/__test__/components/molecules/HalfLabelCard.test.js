import React from 'react';
import {shallow} from 'enzyme';
import {HalfLabelCard} from '../../../lib/components/molecules';

describe('HalfLabelCard Component', () => {
  it('should render without crashing', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <HalfLabelCard
        title="Card Title"
        iconName="star"
        onPress={onPressMock}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the provided icon, title, and chevron icon', () => {
    const iconName = 'star';
    const title = 'Card Title';
    const onPressMock = jest.fn();

    const wrapper = shallow(
      <HalfLabelCard iconName={iconName} title={title} onPress={onPressMock} />,
    );

    // Check if the provided icon is rendered
    expect(wrapper.find('Icon').at(0).prop('name')).toBe(iconName);

    // Check if the title is rendered
    expect(wrapper.find('Text').prop('children')).toBe(title);

    // Check if the chevron icon is rendered
    expect(wrapper.find('Icon').at(1).prop('name')).toBe('chevron-right');
  });

  it('calls onPress when the card is pressed', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <HalfLabelCard
        iconName="star"
        title="Card Title"
        onPress={onPressMock}
      />,
    );

    // Simulate pressing the card
    wrapper.find('TouchableOpacity').simulate('press');

    // Check if the onPress function was called
    expect(onPressMock).toHaveBeenCalled();
  });

  it('applies custom style when provided', () => {
    const customStyle = {backgroundColor: 'red'};
    const wrapper = shallow(
      <HalfLabelCard
        iconName="star"
        title="Card Title"
        onPress={() => {}}
        style={customStyle}
      />,
    );

    // Check if the custom style is applied
    expect(wrapper.find('Card').prop('style')).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });
});
