import React from 'react';
import {shallow} from 'enzyme';
import {InfoBubble} from '../../../lib/components/molecules';

const Colors = {
  primaryColor: {
    background_light: 'gray',
    background: 'blue',
    foreground: 'white',
  },
  secondaryColor: {
    background_light: 'gray',
    background: 'green',
    foreground: 'gray',
  },
};

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => Colors,
}));

describe('InfoBubble Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <InfoBubble iconName="plus" badgeColor={Colors.primaryColor} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with the correct badge color', () => {
    const wrapper = shallow(
      <InfoBubble
        iconName="info"
        badgeColor={Colors.primaryColor}
        indication="This is an info bubble."
      />,
    );

    // Check if the icon's color matches the badgeColor foreground
    expect(wrapper.find('Icon').prop('color')).toBe(
      Colors.primaryColor.foreground,
    );
  });

  it('displays the indication when clicked', () => {
    const indication = 'This is an info bubble.';
    const wrapper = shallow(
      <InfoBubble
        iconName="plus"
        badgeColor={Colors.primaryColor}
        indication={indication}
      />,
    );

    expect(wrapper.find('Card').exists()).toBe(false);

    wrapper.find('TouchableOpacity').simulate('press');

    expect(wrapper.find('Icon').exists()).toBe(true);
    expect(wrapper.find('Text').prop('children')).toBe(indication);
  });

  it('hides the indication when clicked twice', () => {
    const wrapper = shallow(
      <InfoBubble
        iconName="info"
        badgeColor={Colors.primaryColor}
        indication="This is an info bubble."
      />,
    );

    // Click the icon to show the indication
    wrapper.find('TouchableOpacity').simulate('press');
    expect(wrapper.find('Card').exists()).toBe(true);

    wrapper.find('TouchableOpacity').simulate('press');

    expect(wrapper.find('Card').exists()).toBe(false);
  });
});
