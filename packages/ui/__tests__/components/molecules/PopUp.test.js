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
import {View, Modal} from 'react-native';
import {PopUp} from '@axelor/aos-mobile-ui';
import {shallow} from 'enzyme';

describe('PopUp Component', () => {
  const children = <View testID="popup-children" />;

  const props = {
    title: 'Test Title',
    data: 'Test Data',
    visible: true,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    expect(wrapper.exists()).toBe(true);
  });

  it('should not render when `visible` prop is false', () => {
    const neutralProps = {
      ...props,
      visible: false,
    };
    const wrapper = shallow(<PopUp {...neutralProps}>{children}</PopUp>);

    expect(wrapper.find(Modal).prop('visible')).toBe(false);
  });

  it('should display the title when provided', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    const titleTextComponent = wrapper.find('Text').at(0);

    expect(titleTextComponent.contains(props.title)).toBe(true);
  });

  it('should display the data when provided', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    const dataTextComponent = wrapper.find('Text').at(1);

    expect(dataTextComponent.contains(props.data)).toBe(true);
  });

  it('should render children elements', () => {
    const wrapper = shallow(<PopUp {...props}>{children}</PopUp>);

    expect(wrapper.find({testID: 'popup-children'}).exists()).toBe(true);
  });
});
