import React from 'react';
import {shallow} from 'enzyme';
import {Badge} from '../../../lib/components/molecules';

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => ({
    primaryColor: {
      background: 'blue',
      background_light: 'white',
    },
  }),
}));

describe('Badge Component', () => {
  it('renders without crashing', () => {
    const props = {
      title: 'Badge Title',
    };
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct title', () => {
    const props = {
      title: 'Badge Title',
    };
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.find('Text').props().children).toBe('Badge Title');
  });

  it('applies custom styles', () => {
    const style = {backgroundColor: 'blue'};
    const txtStyle = {color: 'white'};
    const props = {
      title: 'Badge Title',
      style,
      txtStyle,
    };
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.find('View').prop('style')).toContain(style);
    expect(wrapper.find('Text').prop('style')).toMatchObject(txtStyle);
  });

  it('applies default color if color prop is not provided', () => {
    const props = {
      title: 'Badge Title',
    };
    const wrapper = shallow(<Badge {...props} />);
    const styles = wrapper.find('View').prop('style')[0]; // badgeStyle
    expect(styles.backgroundColor).toBe('white');
    expect(styles.borderColor).toBe('blue');
  });

  it('applies custom color if color prop is provided', () => {
    const color = {
      background_light: 'green',
      background: 'darkgreen',
      foreground: 'white',
    };
    const props = {
      title: 'Badge Title',
      color,
    };
    const wrapper = shallow(<Badge {...props} />);
    const styles = wrapper.find('View').prop('style')[0]; //badgeStyle
    expect(styles.backgroundColor).toBe('green');
    expect(styles.borderColor).toBe('darkgreen');
  });

  it('applies default number of lines if numberOfLines prop is not provided', () => {
    const props = {
      title: 'Badge Title',
    };
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.find('Text').prop('numberOfLines')).toBe(1);
  });

  it('applies custom number of lines if numberOfLines prop is provided', () => {
    const props = {
      title: 'Badge Title',
      numberOfLines: 2,
    };
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.find('Text').prop('numberOfLines')).toBe(2);
  });
});
