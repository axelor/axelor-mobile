/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {Image as ReactNativeImage} from 'react-native';
import {shallow} from 'enzyme';
import {Icon, Image} from '@axelor/aos-mobile-ui';

describe('Image Component', () => {
  const props = {
    resizeMode: 'contain',
    source: null,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Image {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders default Icon component when source is invalid', () => {
    const wrapper = shallow(<Image {...props} />);

    expect(wrapper.find(Icon).exists()).toBe(true);
  });

  it('renders default Icon component with custom size', () => {
    const iconSize = 50;
    const wrapper = shallow(<Image {...props} defaultIconSize={iconSize} />);

    expect(wrapper.find(Icon).prop('size')).toBe(iconSize);
  });

  it('renders Image component when source is valid', () => {
    const source = {
      uri: 'https://docs.axelor.com/_/img/logo_axelor.png',
    };
    const wrapper = shallow(<Image {...props} source={source} />);

    expect(wrapper.find(ReactNativeImage).exists()).toBe(true);
  });

  it('renders Image component with custom size', () => {
    const source = {
      uri: 'https://docs.axelor.com/_/img/logo_axelor.png',
    };
    const customStyle = {width: 50, height: 50};
    const wrapper = shallow(
      <Image {...props} source={source} imageSize={customStyle} />,
    );

    expect(wrapper.find(ReactNativeImage).prop('style')).toContainEqual(
      customStyle,
    );
  });

  it('renders default Icon component when Image source fails to load', () => {
    const source = {uri: 'invalid-source.png'};
    const wrapper = shallow(<Image {...props} source={source} />);

    wrapper.find(ReactNativeImage).simulate('error');
    expect(wrapper.find(Icon).exists()).toBe(true);
  });
});
