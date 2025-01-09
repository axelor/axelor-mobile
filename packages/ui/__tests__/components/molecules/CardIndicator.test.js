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
import {Card, CardIndicator, Text, Alert} from '@axelor/aos-mobile-ui';

describe('CardIndicator Component', () => {
  const props = {
    indication: 'heart',
    children: <View testID="children" />,
    isVisible: true,
    handleClose: jest.fn(),
    usePopup: false,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<CardIndicator {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the right components when usePopup is false', () => {
    const wrapper = shallow(<CardIndicator {...props} />);

    expect(wrapper.contains(props.children)).toBe(true);
    expect(wrapper.find(Card).exists()).toBe(true);
    expect(wrapper.find(Text).prop('children')).toBe(props.indication);

    wrapper.setProps({isVisible: false});
    expect(wrapper.contains(props.children)).toBe(true);
    expect(wrapper.find(Card).exists()).toBe(false);
  });

  it('renders the right components when usePopup is true', () => {
    const wrapper = shallow(<CardIndicator {...props} usePopup={true} />);

    expect(wrapper.contains(props.children)).toBe(true);
    expect(wrapper.find(Alert).exists()).toBe(true);
    expect(wrapper.find(Text).prop('children')).toBe(props.indication);

    wrapper.setProps({isVisible: false});
    expect(wrapper.contains(props.children)).toBe(true);
    expect(wrapper.find(Alert).exists()).toBe(false);
  });
});
