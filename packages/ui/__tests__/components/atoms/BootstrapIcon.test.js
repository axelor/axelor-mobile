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
import {Svg} from 'react-native-svg';
import {shallow} from 'enzyme';
import {BootstrapIcon, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('BootstrapIcon Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    name: '123',
    size: 25,
    color: Colors.primaryColor.background,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<BootstrapIcon {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should give the right props to Svg component', () => {
    const wrapper = shallow(<BootstrapIcon {...props} />);

    expect(wrapper.find(Svg).prop('width')).toBe(props.size);
    expect(wrapper.find(Svg).prop('height')).toBe(props.size);
    expect(wrapper.find(Svg).prop('fill')).toBe(props.color);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<BootstrapIcon {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Svg))).toMatchObject(customStyle);
  });

  it('should render Text component if the icon does not exist', () => {
    const wrapper = shallow(<BootstrapIcon {...props} name={'Fake icon'} />);

    expect(wrapper.find(Text).exists()).toBe(true);
  });
});
