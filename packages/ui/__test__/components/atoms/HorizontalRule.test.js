import React from 'react';
import {StyleSheet} from 'react-native';
import {shallow} from 'enzyme';
import {HorizontalRule} from '../../../lib/components/atoms';

describe('HorizontalRule Component', () => {
  it('applies custom style correctly', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<HorizontalRule style={customStyle} />);

    expect(wrapper.prop('style')).toMatchObject([styles.line, customStyle]);
  });
});

const styles = StyleSheet.create({
  line: {
    borderBottomColor: '#CECECE',
    borderBottomWidth: 1,
  },
});
