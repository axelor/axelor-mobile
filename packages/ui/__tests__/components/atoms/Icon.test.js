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
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {Icon, BootstrapIcon} from '@axelor/aos-mobile-ui';

describe('Icon Component', () => {
  const props = {
    name: 'check',
    color: 'red',
    size: 24,
    touchable: true,
    visible: true,
    onPress: jest.fn(),
    disabled: false,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Icon />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BootstrapIcon icon ', () => {
    const wrapper = shallow(<Icon name="star" />);
    const iconComponent = wrapper.find(BootstrapIcon);

    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.prop('name')).toBe('star');
  });

  it('renders FontAwesome5 icon when isFontAwesome5 prop is true', () => {
    const wrapper = shallow(<Icon name="star" isFontAwesome5 />);
    const iconComponent = wrapper.find(Icon5);

    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.prop('name')).toBe('star');
  });

  it('renders FontAwesome icon when isFontAwesome4 prop is true', () => {
    const wrapper = shallow(
      <Icon name="star" isFontAwesome4 FontAwesome5={false} />,
    );
    const iconComponent = wrapper.find(Icon4);

    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.prop('name')).toBe('star');
  });

  it('applies custom style to the component', () => {
    const customStyle = {backgroundColor: 'red'};
    const wrapper = shallow(<Icon name="star" style={customStyle} />);

    const iconStyle = wrapper.find(TouchableOpacity).prop('style');
    expect(iconStyle).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('renders nothing when visible prop is false', () => {
    const wrapper = shallow(<Icon visible={false} />);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('renders a disabled icon', () => {
    const wrapper = shallow(<Icon name="star" touchable={false} />);
    const touchableComponent = wrapper.find(TouchableOpacity);

    expect(touchableComponent.prop('disabled')).toBe(true);
  });

  it('renders a touchable icon', () => {
    const wrapper = shallow(<Icon {...props} />);
    const touchableComponent = wrapper.find(TouchableOpacity);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).toBe(false);
  });
});
