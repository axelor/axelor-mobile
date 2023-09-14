import React from 'react';
import {shallow} from 'enzyme';
import {Label} from '../../../lib/components/molecules';

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

describe('Label Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <Label
        message="this is lable message."
        badgeColor={Colors.primaryColor}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
