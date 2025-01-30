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
import {CardIconButton, Icon} from '@axelor/aos-mobile-ui';

describe('CardIconButton Component', () => {
  const props = {iconName: 'heart', iconColor: 'red', onPress: jest.fn()};

  it('should render without crashing', () => {
    const wrapper = shallow(<CardIconButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the right informations', () => {
    const wrapper = shallow(<CardIconButton {...props} />);

    expect(wrapper.find(Icon).prop('name')).toBe(props.iconName);
    expect(wrapper.find(Icon).prop('color')).toBe(props.iconColor);
  });

  it('renders a touchable component', () => {
    const wrapper = shallow(<CardIconButton {...props} />);
    const touchableComponent = wrapper.find(TouchableOpacity);

    expect(touchableComponent.exists()).toBeTruthy();
    expect(touchableComponent.prop('disabled')).not.toBe(true);
  });
});
