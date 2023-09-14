import React from 'react';
import {ScrollView} from 'react-native';
import {shallow} from 'enzyme';
import {HtmlInput, Text} from '../../../lib/components/atoms';
import {RichToolbar} from 'react-native-pell-rich-editor';

describe('HtmlInput Component', () => {
  it('renders without crashing', () => {
    shallow(<HtmlInput />);
  });

  it('renders the title if provided', () => {
    const wrapper = shallow(<HtmlInput title="Test Title" />);
    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).children().text()).toEqual('Test Title');
  });

  it('applies custom styles correctly', () => {
    const customStyle = {width: 200};
    const customToolbarStyle = {backgroundColor: 'red'};
    const customContainerStyle = {flex: 1};
    const wrapper = shallow(
      <HtmlInput
        readonly={false}
        style={customStyle}
        styleToolbar={customToolbarStyle}
        containerStyle={customContainerStyle}
      />,
    );

    wrapper.setState({editorAttached: true});

    expect(
      wrapper.find(ScrollView).at(0).prop('contentContainerStyle'),
    ).toMatchObject(customContainerStyle);
    expect(wrapper.find(ScrollView).at(1).prop('style')).toMatchObject(
      customStyle,
    );

    // Check if RichToolbar is rendered
    expect(wrapper.find('RichToolbar').exists()).toBe(true);
    expect(wrapper.find(RichToolbar).prop('style')).toMatchObject(
      customToolbarStyle,
    );
  });
});
