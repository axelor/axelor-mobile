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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {Image, ImageBubble} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('ImageBubble Component', () => {
  const props = {
    source: {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg',
    },
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<ImageBubble {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render a round Image define with imageSize props', () => {
    const imageSize = 50;
    const customStyle = {
      borderRadius: imageSize,
      width: imageSize,
      height: imageSize,
    };
    const wrapper = shallow(<ImageBubble {...props} imageSize={imageSize} />);

    expect(getGlobalStyles(wrapper.find(Image), 'generalStyle')).toMatchObject(
      customStyle,
    );
  });

  it('should give defaultIconSize props to Image component', () => {
    const defaultIconSize = 50;
    const wrapper = shallow(
      <ImageBubble {...props} defaultIconSize={defaultIconSize} />,
    );

    expect(wrapper.find(Image).prop('defaultIconSize')).toBe(defaultIconSize);
  });

  it('should render the listComponent when provided', () => {
    const listComponent = [
      <View testID="listComponent" />,
      <View testID="listComponent" />,
      <View testID="listComponent" />,
    ];
    const wrapper = shallow(
      <ImageBubble {...props} listComponent={listComponent} />,
    );

    expect(wrapper.find('[testID="listComponent"]')).toHaveLength(
      listComponent.length,
    );
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<ImageBubble {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Image), 'generalStyle')).toMatchObject(
      customStyle,
    );
  });
});
