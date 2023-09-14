import React from 'react';
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {Card} from '../../../lib/components/atoms';

describe('Card Component', () => {
  it('renders children correctly', () => {
    const children = <View testID="children" />;
    const wrapper = shallow(<Card>{children}</Card>);

    expect(wrapper.find('[testID="children"]').length).toBe(1);
  });

  it('applies custom style correctly', () => {
    const customStyle = {marginBottom: 10};
    const children = <View testID="children" />;
    const wrapper = shallow(<Card style={customStyle}>{children}</Card>);

    expect(wrapper.prop('style')).toContain(customStyle);
  });
});
