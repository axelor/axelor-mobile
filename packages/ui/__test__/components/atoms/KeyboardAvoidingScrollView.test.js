import React from 'react';
import {Platform, View} from 'react-native';
import {shallow} from 'enzyme';
import {KeyboardAvoidingScrollView} from '../../../lib/components/atoms';

describe('KeyboardAvoidingScrollView Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<KeyboardAvoidingScrollView />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children', () => {
    const wrapper = shallow(
      <KeyboardAvoidingScrollView>
        <View testID="child" />
      </KeyboardAvoidingScrollView>,
    );
    expect(wrapper.find('[testID="child"]').exists()).toBe(true);
  });

  it('sets correct behavior for iOS', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(<KeyboardAvoidingScrollView />);
    expect(wrapper.prop('behavior')).toBe('padding');
  });

  it('sets correct behavior for Android', () => {
    Platform.OS = 'android';
    const wrapper = shallow(<KeyboardAvoidingScrollView />);
    expect(wrapper.prop('behavior')).toBe('height');
  });

  it('sets keyboardVerticalOffset for iOS', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(
      <KeyboardAvoidingScrollView keyboardOffset={{ios: 100}} />,
    );
    expect(wrapper.prop('keyboardVerticalOffset')).toBe(100);
  });

  it('sets keyboardVerticalOffset for Android', () => {
    Platform.OS = 'android';
    const wrapper = shallow(
      <KeyboardAvoidingScrollView keyboardOffset={{android: 200}} />,
    );
    expect(wrapper.prop('keyboardVerticalOffset')).toBe(200);
  });
});
