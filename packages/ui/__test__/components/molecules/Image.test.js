import React from 'react';
import {Image as ReactNativeImage} from 'react-native';
import {shallow} from 'enzyme';
import {Image} from '../../../lib/components/molecules';

describe('Image Component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Image resizeMode="contain" source={null} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders default icon when source is invalid', () => {
    const wrapper = shallow(<Image resizeMode="contain" source={null} />);

    expect(wrapper.find('Icon').exists()).toBe(true);
  });

  it('renders Image component when source is valid', () => {
    const source = {
      uri: 'https://docs.axelor.com/_/img/logo_axelor.png',
    };
    const wrapper = shallow(<Image resizeMode="contain" source={source} />);

    expect(wrapper.find(ReactNativeImage).exists()).toBe(true);
  });

  it('renders default icon when Image source fails to load', () => {
    const source = {uri: 'invalid-source.png'};
    const wrapper = shallow(<Image resizeMode="contain" source={source} />);

    wrapper.find(ReactNativeImage).simulate('error');
    expect(wrapper.find('Icon').exists()).toBe(true);
  });
});
