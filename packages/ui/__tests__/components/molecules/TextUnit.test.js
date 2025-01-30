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
import {shallow} from 'enzyme';
import {Text, TextUnit} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('TextUnit Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    value: '400',
    unit: 'm',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<TextUnit {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render a Text component with value and unit props', () => {
    const wrapper = shallow(<TextUnit {...props} />);

    expect(wrapper.find(Text).prop('children')).toContain(props.value);
    expect(wrapper.find(Text).prop('children')).toContain(props.unit);
  });

  it('should use color and fontSize props for Text component when provided', () => {
    const color = Colors.primaryColor;
    const fontSize = 30;
    const wrapper = shallow(
      <TextUnit {...props} color={color} fontSize={fontSize} />,
    );

    expect(wrapper.find(Text).prop('textColor')).toBe(color.background);
    expect(wrapper.find(Text).prop('fontSize')).toBe(fontSize);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<TextUnit {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Text))).toMatchObject(customStyle);
  });
});
