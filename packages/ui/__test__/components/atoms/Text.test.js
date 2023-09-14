import React from 'react';
import {shallow} from 'enzyme';
import {Text} from '../../../lib/components/atoms';
import {Text as ReactNativeText} from 'react-native';

describe('Text Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Text />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders text correctly', () => {
    const text = 'Hello, World!';
    const wrapper = shallow(<Text>{text}</Text>);

    expect(wrapper.find(ReactNativeText).length).toBe(1);
    expect(wrapper.find(ReactNativeText).children().text()).toBe(text);
  });

  it('applies custom styles correctly', () => {
    const customStyle = {color: 'red', fontSize: 20};
    const wrapper = shallow(<Text style={customStyle}>Custom Text</Text>);

    expect(wrapper.prop('style')).toContain(customStyle);
  });

  it('applies the specified number of lines', () => {
    const numberOfLines = 2;
    const wrapper = shallow(
      <Text numberOfLines={numberOfLines}>Long Text</Text>,
    );

    expect(wrapper.prop('numberOfLines')).toBe(numberOfLines);
  });

  it('adjusts font size to fit when enabled', () => {
    const wrapper = shallow(<Text adjustsFontSizeToFit>Resizable Text</Text>);

    expect(wrapper.prop('adjustsFontSizeToFit')).toBe(true);
  });

  it('invokes onTextLayout callback', () => {
    const onTextLayout = jest.fn();
    const wrapper = shallow(
      <Text onTextLayout={onTextLayout}>Text with Layout</Text>,
    );

    wrapper.simulate('textLayout', {nativeEvent: {layout: {height: 100}}});

    expect(onTextLayout).toHaveBeenCalledTimes(1);
    expect(onTextLayout).toHaveBeenCalledWith({
      nativeEvent: {layout: {height: 100}},
    });
  });
});
