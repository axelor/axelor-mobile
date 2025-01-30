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
import {TitledValue, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('TitledValue Component', () => {
  const props = {
    title: 'Test Title',
    value: 'Test Value',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<TitledValue {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the title and value', () => {
    const wrapper = shallow(<TitledValue {...props} />);

    expect(wrapper.find(Text).at(0).prop('children')).toBe(props.title);

    expect(wrapper.find(Text).at(1).prop('children')).toBe(props.value);
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<TitledValue {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });
});
