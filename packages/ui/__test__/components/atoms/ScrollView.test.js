import React from 'react';
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {ScrollView} from '../../../lib/components/atoms';

describe('ScrollView Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ScrollView />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders children', () => {
    const wrapper = shallow(
      <ScrollView>
        <View testID="child" />
      </ScrollView>,
    );
    expect(wrapper.find('[testID="child"]').exists()).toBe(true);
  });

  it('applies custom styles', () => {
    const style = {backgroundColor: 'red'};
    const wrapper = shallow(<ScrollView style={style} />);
    expect(wrapper.prop('contentContainerStyle')).toContain(style);
  });
});
