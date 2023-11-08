/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {SwitchCard, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('SwitchCard', () => {
  const props = {
    title: 'Test Switch',
    defaultValue: false,
  };
  it('should render without crashing', () => {
    const wrapper = shallow(<SwitchCard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });
  it('renders with the correct title', () => {
    const wrapper = shallow(<SwitchCard {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
  });

  it('passes the default value to the Switch component', () => {
    const propsDefaultValue = {
      ...props,
      defaultValue: true,
    };
    const wrapper = shallow(<SwitchCard {...propsDefaultValue} />);

    expect(wrapper.find('Switch').prop('isEnabled')).toBe(
      propsDefaultValue.defaultValue,
    );
  });

  it('passes the right to the Switch component', () => {
    const propsOnPress = {...props, onToggle: jest.fn()};
    const wrapper = shallow(<SwitchCard {...propsOnPress} />);

    expect(wrapper.find('Switch').prop('handleToggle')).toBe(
      propsOnPress.onToggle,
    );
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<SwitchCard {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });
});
