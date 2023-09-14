import React from 'react';
import {ActivityIndicator, Button, View} from 'react-native';
import {shallow} from 'enzyme';
import {Screen} from '../../../lib/components/atoms';

describe('Screen Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Screen />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children', () => {
    const wrapper = shallow(
      <Screen>
        <View testID="child" />
      </Screen>,
    );
    expect(wrapper.find('[testID="child"]').exists()).toBe(true);
  });

  it('renders loading indicator when loading prop is true', () => {
    const wrapper = shallow(<Screen loading={true} />);
    expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
  });

  it('does not render loading indicator when loading prop is false', () => {
    const wrapper = shallow(<Screen loading={false} />);
    expect(wrapper.find(ActivityIndicator).exists()).toBe(false);
  });

  it('applies custom styles', () => {
    const style = {backgroundColor: 'red'};
    const wrapper = shallow(<Screen style={style} />);
    expect(wrapper.prop('style')).toContain(style);
  });

  it('renders fixedItems when provided', () => {
    const fixedItems = <Button testID="fixedButton" title="Fixed Button" />;
    const wrapper = shallow(<Screen fixedItems={fixedItems} />);
    expect(wrapper.find('[testID="fixedButton"]').exists()).toBe(true);
  });

  it('does not render fixedItems when not provided', () => {
    const wrapper = shallow(<Screen />);
    expect(wrapper.find('[testID="fixedButton"]').exists()).toBe(false);
  });
});
