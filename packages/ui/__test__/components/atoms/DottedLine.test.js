import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {shallow} from 'enzyme';
import {DottedLine} from '../../../lib/components/atoms';

describe('DottedLine Component', () => {
  it('applies custom style correctly', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<DottedLine style={customStyle} />);

    expect(wrapper.prop('style')).toMatchObject([
      styles.dottedLine,
      customStyle,
    ]);
  });
});

const styles = StyleSheet.create({
  dottedLine: {
    borderStyle: Platform.OS === 'ios' ? 'solid' : 'dotted',
    height: 35,
    borderLeftWidth: 2,
    borderColor: '#424242',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
