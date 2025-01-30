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
import {TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {RightIconButton, Text, Icon, Card} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('RightIconButton Component', () => {
  const props = {
    onPress: jest.fn(),
    title: 'Click Me',
    icon: <Icon name="right-icon" />,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<RightIconButton {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the title when provided', () => {
    const wrapper = shallow(<RightIconButton {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
  });

  it('displays the icon', () => {
    const wrapper = shallow(<RightIconButton {...props} />);

    expect(wrapper.contains(props.icon)).toBe(true);
  });

  it('touchable is not disabled', () => {
    const wrapper = shallow(<RightIconButton {...props} />);

    expect(wrapper.find(TouchableOpacity).prop('disabled')).toBeFalsy();
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<RightIconButton {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });
});
